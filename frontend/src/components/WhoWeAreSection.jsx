import React, { useEffect, useMemo, useRef, useState } from 'react';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeEditorial = (t) => 1 - Math.pow(1 - t, 3);

const STATEMENTS = [
  'We train artists for production.',
  'Built around real pipelines, not guesses.',
  'Mentorship that sharpens taste and craft.',
  'At The Colonist, identity becomes output.',
];

function buildWordList(statements) {
  const list = [];

  statements.forEach((statement, lineIdx) => {
    const words = statement.trim().split(/\s+/);

    words.forEach((word, wordIdx) => {
      list.push({ word, lineIdx, wordIdx });
    });
  });

  return list;
}

const WhoWeAreSection = () => {
  const wordList = useMemo(() => buildWordList(STATEMENTS), []);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const computeProgress = () => {
      const element = sectionRef.current;

      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const stickyTop = viewportHeight * 0.25;
      const stickyHeight = stickyRef.current?.offsetHeight || 0;
      const scrollableDistance = Math.max(rect.height - stickyHeight - stickyTop, 1);

      return clamp01((stickyTop - rect.top) / scrollableDistance);
    };

    const updateProgress = () => {
      setRevealProgress(computeProgress());
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const totalWords = wordList.length;
  const step = 1 / totalWords;

  const activeLineIdx = useMemo(() => {
    for (let i = wordList.length - 1; i >= 0; i -= 1) {
      if (revealProgress >= i * step) {
        return wordList[i].lineIdx;
      }
    }

    return 0;
  }, [revealProgress, step, wordList]);

  const grainShiftX = lerp(0, -8, revealProgress);
  const grainShiftY = lerp(0, 10, revealProgress);
  const dividerT = easeOutCubic(clamp01((revealProgress - 0.82) / 0.18));
  const dividerOpacity = lerp(0, 0.28, dividerT);
  const exitFadeT = easeOutCubic(clamp01((revealProgress - 0.88) / 0.12));
  const contentOpacity = lerp(1, 0.95, exitFadeT);

  return (
    <section ref={sectionRef} className="who-we-are-section">
      <div className="who-we-are-background" aria-hidden="true">
        <div
          className="who-we-are-grain"
          style={{ transform: `translate3d(${grainShiftX}px, ${grainShiftY}px, 0)` }}
        />
        <div className="who-we-are-vignette" />
      </div>

      <div ref={stickyRef} className="who-we-are-sticky">
        <div
          className="who-we-are-inner"
          style={{ opacity: contentOpacity }}
        >
          <p className="who-we-are-eyebrow">WHO WE ARE</p>

          <div className="wwa-statements" aria-label={STATEMENTS.join(' ')}>
            {STATEMENTS.map((statement, lineIdx) => {
              const lineWords = statement.trim().split(/\s+/);
              const globalOffset = wordList.findIndex((word) => word.lineIdx === lineIdx);
              const isPast = lineIdx < activeLineIdx;
              const isActive = lineIdx === activeLineIdx;

              return (
                <p
                  key={statement}
                  className={`wwa-statement wwa-statement--line-${lineIdx + 1}${isActive ? ' wwa-statement--active' : ''}${isPast ? ' wwa-statement--past' : ''}`}
                >
                  {lineWords.map((word, wordIdx) => {
                    const globalIdx = globalOffset + wordIdx;
                    const startAt = globalIdx * step;
                    const localT = clamp01((revealProgress - startAt) / step);
                    const wordT = easeEditorial(localT);

                    return (
                      <span
                        key={`${lineIdx}-${wordIdx}`}
                        className="who-we-are-word"
                        style={{
                          opacity: lerp(0.3, 1, wordT),
                          filter: `blur(${lerp(2, 0, wordT)}px)`,
                        }}
                      >
                        {word}
                        {wordIdx < lineWords.length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>

          <div className="who-we-are-dividerRow" aria-hidden="true">
            <div
              className="who-we-are-divider"
              style={{
                opacity: dividerOpacity,
                transform: `scaleX(${dividerT})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
