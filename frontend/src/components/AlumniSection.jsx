import React from 'react';

const studioLogosLayer1 = [
  '/Logos/Ubisoft.png',
  '/Logos/rstar.png',
];

const studioLogosLayer2 = [
  '/Logos/Amazon.png',
  '/Logos/Sumo.png',
  '/Logos/Mandali.png',
  '/Logos/Reebot.png',
  '/Logos/Lakshay.png',
];

const studioLogosLayer3 = [
  '/Logos/Ubisoft.png',
  '/Logos/rstar.png',
  '/Logos/Sumo.png',
  '/Logos/Mandali.png',
  '/Logos/Amazon.png',
];

const AlumniSection = () => {
  return (
    <section className="alumni-premium-section">
      <div className="alumni-top-blend"></div>
      <div className="alumni-bottom-blend"></div>
      <div className="alumni-gold-line"></div>
      <div className="alumni-tech-bg"></div>
      <div className="alumni-grain-overlay"></div>
      <div className="alumni-vignette"></div>
      <div className="alumni-light-falloff"></div>

      <div className="alumni-content-container">
        <div className="alumni-header">
          <span className="alumni-label">TRUSTED BY INDUSTRY LEADERS</span>
          <h2 className="alumni-heading">OUR ARTISTS WORK AT</h2>
        </div>

        <div className="alumni-parallax-container">
          {/* Layer 3: Background (Top - Atmospheric, Blurry) */}
          <div className="alumni-marquee-row layer-bg">
            <div className="alumni-marquee-inner">
              {[...studioLogosLayer3, ...studioLogosLayer3, ...studioLogosLayer3, ...studioLogosLayer3, ...studioLogosLayer3, ...studioLogosLayer3].map((logo, index) => (
                <div key={`bg-${index}`} className="alumni-logo-wrapper">
                  <img src={logo} alt="" className="alumni-logo" />
                </div>
              ))}
            </div>
          </div>

          {/* Layer 2: Main (Center - High Density) */}
          <div className="alumni-marquee-row layer-main">
            <div className="alumni-marquee-inner">
              {[...studioLogosLayer2, ...studioLogosLayer2, ...studioLogosLayer2, ...studioLogosLayer2, ...studioLogosLayer2, ...studioLogosLayer2].map((logo, index) => {
                // Introduce a focal point logo in the middle of the sequence
                const isFocal = index === Math.floor((studioLogosLayer2.length * 6) / 2);
                return (
                  <div key={`main-${index}`} className={`alumni-logo-wrapper ${isFocal ? 'focal-logo-wrapper' : ''}`}>
                    <img src={logo} alt="" className={`alumni-logo ${isFocal ? 'focal-logo' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Layer 1: Foreground (Bottom - Sparse, Framing) */}
          <div className="alumni-marquee-row layer-fg">
            <div className="alumni-marquee-inner">
              {[null, studioLogosLayer1[0], null, null, null, studioLogosLayer1[1], null, null].map((logo, index) => (
                <div key={`fg-${index}`} className="alumni-logo-wrapper">
                  {logo && <img src={logo} alt="" className="alumni-logo" />}
                </div>
              ))}
            </div>
          </div>

          <div className="alumni-edge-fade-left"></div>
          <div className="alumni-edge-fade-right"></div>
        </div>
      </div>
    </section>
  );
};


export default AlumniSection;
