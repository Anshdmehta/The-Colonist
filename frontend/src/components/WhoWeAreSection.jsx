import React, { useEffect, useMemo, useRef, useState } from 'react';

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeOutCubic = (value) => 1 - Math.pow(1 - clamp01(value), 3);

const PROGRESS_LERP = 0.07;
const IMAGE_FOLLOW_DELAY = 0.1;
const ANIMATION_START_PROGRESS = 0.12;
const ANIMATION_END_PROGRESS = 0.88;
const MOBILE_BREAKPOINT = 768;

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

  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth <= MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const updateIsMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateIsMobile);

      return () => {
        mediaQuery.removeEventListener('change', updateIsMobile);
      };
    }

    mediaQuery.addListener(updateIsMobile);

    return () => {
      mediaQuery.removeListener(updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      smoothedProgressRef.current = 1;
      targetProgressRef.current = 1;
      setSmoothedProgress(1);
      setIsLocked(false);
      onCompletionChange?.(true);
      return undefined;
    }

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
  }, [isMobile, onCompletionChange]);

  useEffect(() => {
    if (isMobile) {
      setIsLocked(false);
      return undefined;
    }

    const getSectionProgress = () => {
      const element = sectionRef.current;

      if (!element || typeof window === 'undefined') {
        return 0;
      }

      const viewportHeight = window.innerHeight || 1;
      const start = element.offsetTop;
      const scrollRange = Math.max(element.offsetHeight - viewportHeight, 1);
      const rawProgress = (window.scrollY - start) / scrollRange;

      return clamp01(rawProgress);
    };

    const updateFromScroll = () => {
      const nextProgress = getSectionProgress();
      targetProgressRef.current = nextProgress;
      setIsLocked(nextProgress > 0.001 && nextProgress < 0.999);
    };

    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);

    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, [isMobile]);

  const progress = easeOutCubic(smoothedProgress);
  const stagedProgress = clamp01(
    (progress - ANIMATION_START_PROGRESS)
    / (ANIMATION_END_PROGRESS - ANIMATION_START_PROGRESS)
  );
  let visibleWords = isMobile ? story.totalWords : Math.floor(stagedProgress * story.totalWords);

  if (stagedProgress >= 0.99) {
    visibleWords = story.totalWords;
  }

  const isComplete = visibleWords === story.totalWords;

  useEffect(() => {
    onCompletionChange?.(isMobile || isComplete);
  }, [isComplete, isMobile, onCompletionChange]);

  const activeLineIndex = Math.min(
    Math.floor(clamp01(stagedProgress) * story.lines.length),
    story.lines.length - 1
  );
  const imageProgress = clamp01(stagedProgress - IMAGE_FOLLOW_DELAY);
  const imageTimeline = imageProgress * (STORY_IMAGES.length - 1);
  const activeImageIndex = isMobile
    ? 0
    : Math.min(
      Math.floor(imageProgress * STORY_IMAGES.length),
      STORY_IMAGES.length - 1
    );

  return (
    <section
      ref={sectionRef}
      className={`who-we-are-section${isLocked ? ' who-we-are-section--locked' : ''}`}
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
                  className={`wwa-statement wwa-statement--line-${line.lineIdx + 1}${line.lineIdx <= activeLineIndex ? ' is-active' : ''}`}
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
            {STORY_IMAGES
              .filter((_, index) => !isMobile || index === 0)
              .map((image, index) => {
                const imageDistance = Math.abs(imageTimeline - index);
                const imageProgress = isMobile ? 1 : clamp01(1 - imageDistance);
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
                    className={`who-we-are-image image-card${isMobile ? ' is-mobile' : ''} ${imageState}`}
                    src={image.src}
                    alt={image.alt}
                    style={{
                      opacity: isMobile ? 1 : imageState === 'is-rest' ? 0 : undefined,
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
