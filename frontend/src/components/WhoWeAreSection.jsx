import React, { useEffect, useMemo, useRef, useState } from 'react';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─── Content ──────────────────────────────────────────────────────────────────
const STATEMENTS = [
  'We train artists for production.',
  'Built around real pipelines, not guesses.',
  'Mentorship that sharpens taste and craft.',
  'At The Colonist, identity becomes output.',
];

// Pre-split each statement into words, tagged with (lineIndex, wordIndexInLine)
function buildWordList(statements) {
  const list = [];
  statements.forEach((stmt, lineIdx) => {
    const words = stmt.trim().split(/\s+/);
    words.forEach((word, wi) => {
      list.push({ word, lineIdx, wordIdx: wi, isLast: wi === words.length - 1 });
    });
  });
  return list;
}

// ─── Particle cluster generator ───────────────────────────────────────────────
// Returns a seeded-random list of particle descriptors so layout is stable.
function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildCluster(count, seed) {
  const rand = seedRandom(seed);
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Polar coordinates → organic blob distribution
    const angle = rand() * Math.PI * 2;
    // Use sqrt for uniform disc distribution, then exaggerate slightly for organic look
    const r = Math.pow(rand(), 0.65) * 100; // 0–100 % of cluster radius
    const x = 50 + Math.cos(angle) * r * 0.5; // %-based
    const y = 50 + Math.sin(angle) * r * 0.5;
    const size = lerp(1.4, 4.2, rand()); // px
    const opacity = lerp(0.05, 0.12, rand());
    // Fade out particles toward the edge of the cluster
    const edgeFade = 1 - Math.pow(r / 100, 1.6);
    particles.push({ x, y, size, opacity: opacity * edgeFade });
  }
  return particles;
}

const CLUSTER_A = buildCluster(38, 1337); // top-left
const CLUSTER_B = buildCluster(32, 4219); // bottom-right

// ─── Component ────────────────────────────────────────────────────────────────
const WhoWeAreSection = () => {
  const wordList = useMemo(() => buildWordList(STATEMENTS), []);

  const sectionRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const computeProgress = () => {
      const el = sectionRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const denom = Math.max(rect.height - viewportH, 1);
      return clamp01((0 - rect.top) / denom);
    };

    const update = () => setRevealProgress(computeProgress());

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Reveal math ─────────────────────────────────────────────────────────────
  const totalWords = wordList.length;
  const step = 1 / totalWords;

  // Which line index is currently "active" (the line being revealed right now)
  const activeLineIdx = useMemo(() => {
    for (let i = wordList.length - 1; i >= 0; i--) {
      const startAt = i * step;
      if (revealProgress >= startAt) return wordList[i].lineIdx;
    }
    return 0;
  }, [revealProgress, wordList, step]);

  // ── Parallax values ─────────────────────────────────────────────────────────
  const p = revealProgress;

  // Existing blobs
  const blob1X = lerp(-6, 6, p);
  const blob1Y = lerp(-10, 10, p);
  const blob2X = lerp(8, -8, p);
  const blob2Y = lerp(12, -12, p);
  const blob3X = lerp(4, -4, p);
  const blob3Y = lerp(-8, 8, p);
  const glowX = lerp(-4, 4, p);
  const glowY = lerp(-6, 6, p);
  const grainX = lerp(3, -3, p);
  const grainY = lerp(4, -4, p);

  // ── Particle cluster parallax (0.75x speed of scroll — slower than content) ──
  // Cluster A: top-left, drifts gently down-right
  const clusterAX = lerp(-8, 10, p);   // slightly rightward
  const clusterAY = lerp(-12, 6, p);   // downward (slower → 0.75x)
  const clusterAScale = lerp(0.985, 1.02, p);

  // Cluster B: bottom-right, drifts gently up-left (opposite direction)
  const clusterBX = lerp(10, -8, p);
  const clusterBY = lerp(10, -12, p);
  const clusterBScale = lerp(1.015, 0.985, p);

  // Grain overlay — counter-drift
  const noiseX = lerp(4, -4, p);
  const noiseY = lerp(5, -5, p);

  // ── Divider (end frame) ──────────────────────────────────────────────────────
  const dividerT = easeOutCubic(clamp01((p - 0.82) / 0.18));
  const dividerOpacity = lerp(0, 0.1, dividerT);

  return (
    <section ref={sectionRef} className="who-we-are-section">
      <div className="who-we-are-pinned">

        {/* ── Background layer ── */}
        <div className="who-we-are-background" aria-hidden="true">

          {/* Blob 1 — top-left fringe */}
          <div
            className="wwa-blob wwa-blob--1"
            style={{ transform: `translate3d(${blob1X}px, ${blob1Y}px, 0)` }}
          />

          {/* Blob 2 — bottom-right fringe */}
          <div
            className="wwa-blob wwa-blob--2"
            style={{ transform: `translate3d(${blob2X}px, ${blob2Y}px, 0)` }}
          />

          {/* Blob 3 — top-right accent */}
          <div
            className="wwa-blob wwa-blob--3"
            style={{ transform: `translate3d(${blob3X}px, ${blob3Y}px, 0)` }}
          />

          {/* Radial glow centred behind text — very soft */}
          <div
            className="wwa-radial-glow"
            style={{ transform: `translate3d(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px), 0)` }}
          />

          {/* ── Particle cluster A — top-left corner ── */}
          <div
            className="wwa-particle-cluster wwa-particle-cluster--a"
            style={{
              opacity: lerp(0.84, 0.96, p),
              transform: `translate3d(${clusterAX}px, ${clusterAY}px, 0) scale(${clusterAScale})`,
            }}
          >
            {CLUSTER_A.map((pt, i) => (
              <span
                key={i}
                className="wwa-particle"
                style={{
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                  width: `${pt.size}px`,
                  height: `${pt.size}px`,
                  opacity: pt.opacity,
                }}
              />
            ))}
          </div>

          {/* ── Particle cluster B — bottom-right corner ── */}
          <div
            className="wwa-particle-cluster wwa-particle-cluster--b"
            style={{
              opacity: lerp(0.8, 0.92, p),
              transform: `translate3d(${clusterBX}px, ${clusterBY}px, 0) scale(${clusterBScale})`,
            }}
          >
            {CLUSTER_B.map((pt, i) => (
              <span
                key={i}
                className="wwa-particle"
                style={{
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                  width: `${pt.size}px`,
                  height: `${pt.size}px`,
                  opacity: pt.opacity,
                }}
              />
            ))}
          </div>

          {/* Grain overlay */}
          <div
            className="wwa-grain"
            style={{ transform: `translate3d(${grainX}px, ${grainY}px, 0)` }}
          />

          {/* Fine noise overlay across entire section */}
          <div
            className="wwa-noise-overlay"
            style={{ transform: `translate3d(${noiseX}px, ${noiseY}px, 0)` }}
          />

          {/* Structural thin line */}
          <div className="who-we-are-structureLine who-we-are-structureLine--top" />
        </div>

        {/* ── Content layer ── */}
        <div className="who-we-are-inner">
          <div className="who-we-are-eyebrow">WHO WE ARE</div>

          <div className="wwa-statements" aria-label={STATEMENTS.join(' ')}>
            {STATEMENTS.map((stmt, lineIdx) => {
              const lineWords = stmt.trim().split(/\s+/);
              // globalWordOffset = index of this line's first word in the flat list
              const globalOffset = wordList.findIndex((w) => w.lineIdx === lineIdx);

              // Line-level brightness state
              const isPast = lineIdx < activeLineIdx;
              const isActive = lineIdx === activeLineIdx;

              return (
                <p
                  key={lineIdx}
                  className={`wwa-statement${isActive ? ' wwa-statement--active' : ''}${isPast ? ' wwa-statement--past' : ''}`}
                >
                  {lineWords.map((word, wi) => {
                    const globalIdx = globalOffset + wi;
                    const startAt = globalIdx * step;
                    const localT = clamp01((revealProgress - startAt) / step);
                    const wordT = easeInOutCubic(localT);

                    const opacity = lerp(0.18, 1, wordT);
                    const blurPx = lerp(4, 0, wordT);

                    return (
                      <span
                        key={`${lineIdx}-${wi}`}
                        className="who-we-are-word"
                        style={{
                          opacity,
                          filter: `blur(${blurPx}px)`,
                        }}
                      >
                        {word}
                        {wi < lineWords.length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>

          {/* Thin divider — fades in at end */}
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
