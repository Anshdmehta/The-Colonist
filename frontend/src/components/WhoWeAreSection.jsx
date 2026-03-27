import React, { useEffect, useMemo, useRef, useState } from 'react';

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeOutCubic = (value) => 1 - Math.pow(1 - clamp01(value), 3);

const PROGRESS_LERP = 0.08;
const WHEEL_PROGRESS_STEP = 0.0006;
const KEYBOARD_PROGRESS_STEP = 0.065;
const TOUCH_PROGRESS_STEP = 0.0022;
const IMAGE_SWITCH_DELAY = 0.08;

const STATEMENTS = [
  'We train artists for production.',
  'Built around real pipelines, not guesses.',
  'Mentorship that sharpens taste and craft.',
  'At The Colonist, identity becomes output.',
];

const STORY_IMAGES = [
  {
    src: '/portfolio/mech.webp',
    alt: 'Robotic character artwork representing production-focused training',
  },
  {
    src: '/portfolio/car-main.webp',
    alt: 'Vehicle artwork representing real pipeline discipline',
  },
  {
    src: '/portfolio/shotgun.webp',
    alt: 'Weapon artwork representing craft and detail',
  },
  {
    src: '/portfolio/crossbow.webp',
    alt: 'Hard-surface artwork representing identity through output',
  },
];

function buildStatementWords(statements) {
  let wordIndex = 0;

  const lines = statements.map((statement, lineIdx) => ({
    lineIdx,
    words: statement.trim().split(/\s+/).map((word) => {
      const metadata = {
        key: `${lineIdx}-${wordIndex}-${word}`,
        value: word,
        index: wordIndex,
        isHighlighted: false,
      };

      wordIndex += 1;
      return metadata;
    }),
  }));

  const totalWords = wordIndex;
  const highlightStartIndex = Math.max(totalWords - 3, 0);

  lines.forEach((line) => {
    line.words.forEach((word) => {
      if (word.index >= highlightStartIndex) {
        word.isHighlighted = true;
      }
    });
  });

  return {
    lines,
    totalWords,
  };
}

const WhoWeAreSection = ({ onCompletionChange }) => {
  const story = useMemo(() => buildStatementWords(STATEMENTS), []);
  const sectionRef = useRef(null);
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const lastTouchYRef = useRef(null);
  const allowScrollRef = useRef(false);
  const completionTimerRef = useRef(null);

  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const animate = () => {
      const nextProgress = lerp(
        smoothedProgressRef.current,
        targetProgressRef.current,
        PROGRESS_LERP
      );

      smoothedProgressRef.current = Math.abs(targetProgressRef.current - nextProgress) < 0.0008
        ? targetProgressRef.current
        : nextProgress;

      setSmoothedProgress(smoothedProgressRef.current);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const getInternalRangeState = () => {
      const element = sectionRef.current;

      if (!element || typeof window === 'undefined') {
        return {
          isVisible: false,
          isWithinRange: false,
        };
      }

      const start = element.offsetTop;
      const end = start + ((window.innerHeight || 1) * 1.2);
      const scrollY = window.scrollY;
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < (window.innerHeight || 1) && rect.bottom > 0;

      return {
        isVisible,
        isWithinRange: scrollY >= start && scrollY <= end,
      };
    };

    const updateLockState = () => {
      const { isVisible, isWithinRange } = getInternalRangeState();
      setIsLocked(isVisible && isWithinRange && (!allowScrollRef.current || targetProgressRef.current > 0));
    };

    const updateTargetProgress = (delta) => {
      targetProgressRef.current = clamp01(targetProgressRef.current + delta);
      updateLockState();
    };

    const shouldCapture = (direction) => {
      const { isVisible, isWithinRange } = getInternalRangeState();

      if (!isVisible || !isWithinRange) {
        return false;
      }

      if (direction > 0) {
        return !allowScrollRef.current;
      }

      if (direction < 0) {
        return targetProgressRef.current > 0;
      }

      return false;
    };

    const handleWheel = (event) => {
      const direction = Math.sign(event.deltaY);

      if (!shouldCapture(direction)) {
        return;
      }

      event.preventDefault();
      updateTargetProgress(event.deltaY * WHEEL_PROGRESS_STEP);
    };

    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowDown: 1,
        ArrowUp: -1,
        PageDown: 1,
        PageUp: -1,
        ' ': event.shiftKey ? -1 : 1,
      };

      const direction = keyMap[event.key];

      if (!direction || !shouldCapture(direction)) {
        return;
      }

      event.preventDefault();
      updateTargetProgress(direction * KEYBOARD_PROGRESS_STEP);
    };

    const handleTouchStart = (event) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY;

      if (typeof currentY !== 'number' || typeof lastTouchYRef.current !== 'number') {
        return;
      }

      const deltaY = lastTouchYRef.current - currentY;
      const direction = Math.sign(deltaY);

      if (!shouldCapture(direction)) {
        lastTouchYRef.current = currentY;
        return;
      }

      event.preventDefault();
      updateTargetProgress(deltaY * TOUCH_PROGRESS_STEP);
      lastTouchYRef.current = currentY;
    };

    const resetTouch = () => {
      lastTouchYRef.current = null;
    };

    updateLockState();
    window.addEventListener('scroll', updateLockState, { passive: true });
    window.addEventListener('resize', updateLockState);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', resetTouch, { passive: true });
    window.addEventListener('touchcancel', resetTouch, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateLockState);
      window.removeEventListener('resize', updateLockState);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', resetTouch);
      window.removeEventListener('touchcancel', resetTouch);
    };
  }, []);

  const progress = easeOutCubic(smoothedProgress);
  let visibleWords = Math.floor(progress * story.totalWords);

  if (progress >= 0.99) {
    visibleWords = story.totalWords;
  }

  const isComplete = visibleWords === story.totalWords;

  useEffect(() => {
    if (completionTimerRef.current) {
      window.clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }

    if (isComplete) {
      completionTimerRef.current = window.setTimeout(() => {
        allowScrollRef.current = true;
        setAllowScroll(true);
        setIsLocked(false);
        onCompletionChange?.(true);
      }, 300);

      return () => {
        if (completionTimerRef.current) {
          window.clearTimeout(completionTimerRef.current);
          completionTimerRef.current = null;
        }
      };
    }

    allowScrollRef.current = false;
    setAllowScroll(false);
    onCompletionChange?.(false);

    return undefined;
  }, [isComplete, onCompletionChange]);

  const imageTimeline = clamp01((progress - IMAGE_SWITCH_DELAY) / (1 - IMAGE_SWITCH_DELAY))
    * (STORY_IMAGES.length - 1);
  const activeImageIndex = Math.min(
    Math.floor(progress * STORY_IMAGES.length),
    STORY_IMAGES.length - 1
  );

  return (
    <section
      ref={sectionRef}
        className={`who-we-are-section${isLocked && !allowScroll ? ' who-we-are-section--locked' : ''}`}
    >
      <div className="who-we-are-background" aria-hidden="true">
        <div className="who-we-are-grain" />
        <div className="who-we-are-vignette" />
      </div>

      <div className="who-we-are-sticky">
        <div className="who-we-are-inner">
          <div className="who-we-are-copy section-text">
            <p className="who-we-are-eyebrow">WHO WE ARE</p>

            <div className="wwa-statements" aria-label={STATEMENTS.join(' ')}>
              {story.lines.map((line) => (
                <p
                  key={`line-${line.lineIdx + 1}`}
                  className={`wwa-statement wwa-statement--line-${line.lineIdx + 1}`}
                >
                  {line.words.map((word, wordIdx) => {
                    const isVisible = word.index <= visibleWords;

                    return (
                      <React.Fragment key={word.key}>
                      <span
                        className={`wwa-word${word.isHighlighted ? ' highlight final-phrase' : ''}${word.isHighlighted && isVisible ? ' highlight--active' : ''}`}
                        style={{
                          opacity: isVisible ? 1 : 0.2,
                        }}
                        >
                          {word.value}
                        </span>
                        {wordIdx < line.words.length - 1 ? ' ' : null}
                      </React.Fragment>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>

        <div className="who-we-are-visual" aria-hidden="true">
          {STORY_IMAGES.map((image, index) => {
            const imageDistance = Math.abs(imageTimeline - index);
            const imageProgress = clamp01(1 - imageDistance);
            let imageState = 'is-rest';

            if (index === activeImageIndex) {
              imageState = 'is-active';
            } else if (index === activeImageIndex + 1) {
              imageState = 'is-incoming';
            } else if (index === activeImageIndex - 1) {
              imageState = 'is-previous';
            }

            return (
              <img
                key={image.src}
                className={`who-we-are-image image-card ${imageState}`}
                src={image.src}
                alt={image.alt}
                style={{
                  opacity: imageState === 'is-rest' ? 0 : undefined,
                  filter: `grayscale(0.55) saturate(0.72) brightness(${lerp(0.82, 0.92, imageProgress)}) contrast(0.94)`,
                }}
              />
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
