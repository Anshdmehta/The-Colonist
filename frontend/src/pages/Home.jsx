import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AlumniSection from '../components/AlumniSection';
import { Button } from '../components/ui/button';
import { Settings, Target, Grid, MessageSquare } from 'lucide-react';
import WhoWeAreSection from '../components/WhoWeAreSection';

const Home = () => {
  const [activeProgram, setActiveProgram] = useState('sixMonth');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardStyle, setCardStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);

  const themes = {
    sixMonth: {
      primary: '#F2C94C', // Amber
      secondary: 'rgba(242, 201, 76, 0.4)',
      glow: 'rgba(242, 201, 76, 0.15)',
      border: 'rgba(242, 201, 76, 0.35)',
      spotlight: 'rgba(242, 201, 76, 0.12)',
      ambient: 'rgba(242, 201, 76, 0.1)',
    },
    oneYear: {
      primary: '#3FAF8E', // Emerald Steel
      secondary: 'rgba(63, 175, 142, 0.4)',
      glow: 'rgba(63, 175, 142, 0.25)',
      border: 'rgba(63, 175, 142, 0.35)',
      spotlight: 'rgba(63, 175, 142, 0.25)',
      ambient: 'rgba(63, 175, 142, 0.25)',
    },
    twoYear: {
      primary: '#D97706', // Copper Orange
      secondary: 'rgba(217, 119, 6, 0.4)',
      glow: 'rgba(217, 119, 6, 0.15)',
      border: 'rgba(217, 119, 6, 0.35)',
      spotlight: 'rgba(217, 119, 6, 0.12)',
      ambient: 'rgba(217, 119, 6, 0.1)',
    },
    threeYear: {
      primary: '#A855F7', // Purple
      secondary: 'rgba(168, 85, 247, 0.4)',
      glow: 'rgba(168, 85, 247, 0.15)',
      border: 'rgba(168, 85, 247, 0.35)',
      spotlight: 'rgba(168, 85, 247, 0.12)',
      ambient: 'rgba(168, 85, 247, 0.1)',
    },
  };

  const currentTheme = themes[activeProgram];

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;

    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;

    setMousePosition({ x, y });
  };

  const handleCardMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setCardStyle({ rotateX, rotateY });

    // Update spotlight position variables
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    setSpotlightPos({ x: xPct, y: yPct });
  };

  const handleCardLeave = () => {
    setCardStyle({ rotateX: 0, rotateY: 0 });
  };

  const programs = [
    {
      id: 'sixMonth',
      title: '6 Month Program',
      description: 'For artists seeking to upgrade their portfolio quality.',
      image: '/assets/programs/lamp.png',
    },
    {
      id: 'oneYear',
      title: '1 Year Diploma',
      description: 'Comprehensive foundation in game art pipelines and creation.',
      image: '/assets/programs/armor.png',
    },
    {
      id: 'twoYear',
      title: '2 Year Advanced Diploma',
      description: 'Advanced techniques for production-ready character and environment art.',
      image: '/assets/programs/piston.png',
    },
    {
      id: 'threeYear',
      title: '3 Year Professional Program',
      description: 'Masterclass in game art, preparing you for lead roles in AAA studios.',
      image: '/assets/programs/pistol_cu.png',
    },
  ];

  const portfolioItems = [
    {
      title: "ASTON MARTIN",
      category: "Vehicles",
      image: "/portfolio/car-main.webp"
    },
    {
      title: "BREN",
      category: "Weapon",
      image: "/portfolio/bren.webp"
    },
    {
      title: "MP-155 ULTIMA",
      category: "Weapon",
      image: "/portfolio/shotgun.webp"
    },
    {
      title: "HYUNDAI I20 RALLY",
      category: "Vehicle",
      image: "/portfolio/I20.webp"
    },
    {
      title: "AR-15 Rifle",
      category: "Weapon",
      image: "/portfolio/rifle.webp"
    },
    {
      title: "CROSSBOW",
      category: "Hard-Surface",
      image: "/portfolio/crossbow.webp"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0E0E11] text-[#F5F5F7]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 hidden sm:block hero-bg">
          <video
            className="absolute inset-0 h-full w-full object-cover object-right"
            muted
            playsInline
            preload="auto"
            autoPlay
            loop
            style={{
              opacity: isHeroVideoReady ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onCanPlay={() => setIsHeroVideoReady(true)}
          >
            <source src="/videos/robo.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 hero-bg"
            style={{
              backgroundImage: "url('/hero/white-mech.webp')",
              backgroundPosition: 'right center',
              filter: 'brightness(0.9) contrast(1.05) blur(0.5px)',
              willChange: 'transform',
              opacity: isHeroVideoReady ? 0 : 1,
              transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>

        {/* Layer 2 — Dark Overlay + Vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(10,10,10,0.55) 0%,
                rgba(10,10,10,0.35) 35%,
                rgba(0,0,0,0) 70%
              ),
              radial-gradient(
                circle at 25% 50%,
                rgba(0,0,0,0.35),
                transparent 45%
              )
            `,
          }}
        />

        {/* Layer 3 — Text Protection Gradient */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.2) 40%,
                transparent 60%
              )
            `,
            filter: 'blur(6px)',
          }}
        />

        {/* Layer 4 — Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full pt-20">
          <div className="max-w-[700px]">
            <h1 className="font-['Sora'] text-[64px] leading-[1.1] font-semibold mb-5 text-[#F5F5F7] hero-text-shadow">
              Industry-Focused Game Art Training
            </h1>
            <p className="text-[#B5B5C0] text-lg leading-[1.6] mb-8 max-w-[640px]">
              Build production-ready skills and professional portfolios for real-time game development.
            </p>
            <div className="flex gap-4 mb-8">
              <Link to="/programs">
                <Button className="bg-[#F2C94C] text-[#0E0E11] hover:bg-[#F2C94C]/90 font-medium px-8 h-12 text-base rounded-md">
                  View Programs
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button className="bg-transparent border border-[#2A2A33] text-[#F5F5F7] hover:bg-[#F5F5F7]/5 font-medium px-8 h-12 text-base rounded-md">
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Mobile Robot Image - Shows Below Text on Small Screens */}
            <div className="sm:hidden mt-8">
              <img
                src="/hero/white-mech.png"
                alt="Futuristic robotic face representing game art training"
                className="w-full max-h-[40vh] object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Mobile Fallback Image */}
          <div className="sm:hidden mt-10">
            <img
              src="/hero/white-mech.webp"
              alt="Futuristic robotic face representing game art training"
              loading="lazy"
              className="w-full max-h-[40vh] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Programs Interactive Section */}
      <section
        className="relative flex items-center justify-center py-[80px] md:py-[120px] overflow-hidden px-4 sm:px-6"
        onMouseMove={handleMouseMove}
      >

        {/* Background Motion Layer */}
        <div
          className="absolute inset-0 overflow-hidden z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px) scale(1.1)`,
            willChange: 'transform'
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/ambient-background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.60), rgba(5,5,5,0.70))' }}
        ></div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: "url('/textures/noise.png')",
            transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`,
            willChange: 'transform'
          }}
        ></div>

        {/* Ambient Light Behind Card */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div
            className="w-[900px] h-[600px] blur-3xl transition-all duration-[800ms] ease-out"
            style={{
              background: `radial-gradient(circle, ${currentTheme.glow}, transparent 60%)`,
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px)`,
              willChange: 'transform'
            }}
          />
        </div>

        {/* Main Card Container */}
        <div
          className="relative z-10 w-full max-w-[1200px] mx-auto rounded-2xl shadow-2xl px-6 py-12 md:px-12 md:py-16 h-auto md:h-[650px] grid grid-cols-1 md:grid-cols-2 items-center gap-12 backdrop-blur-md transition-all duration-[800ms] ease-out hover:-translate-y-2 hover:scale-[1.02] group/card"
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          style={{
            border: `1px solid ${currentTheme.border}`,
            boxShadow: `0 0 40px ${currentTheme.glow}`,
            background: `
              linear-gradient(145deg, #0c0c0c, #070707) padding-box,
              linear-gradient(135deg, ${currentTheme.secondary}, rgba(60,60,60,0.35)) border-box
            `,
            transform: `perspective(1200px) rotateX(${cardStyle.rotateX}deg) rotateY(${cardStyle.rotateY}deg)`,
            willChange: 'transform'
          }}
        >
          {/* Cursor Spotlight Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-all duration-[800ms] rounded-2xl"
            style={{
              background: `radial-gradient(
                circle at ${spotlightPos.x}% ${spotlightPos.y}%,
                ${currentTheme.glow},
                transparent 60%
              )`
            }}
          />

          {/* Left Side — Program List */}
          <div className="flex flex-col space-y-8 md:space-y-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex items-start gap-4 cursor-pointer transition-all duration-300 group"
                onMouseEnter={() => setActiveProgram(program.id)}
                onClick={() => setActiveProgram(program.id)}
              >
                <div
                  className={`w-[3px] transition-all duration-[800ms] mt-1.5 rounded-full ${activeProgram === program.id ? 'h-6 opacity-100' : 'h-0 opacity-0'
                    }`}
                  style={{ backgroundColor: activeProgram === program.id ? themes[program.id].primary : 'transparent' }}
                ></div>
                <div className="flex flex-col">
                  <h3
                    className={`font-['Sora'] text-2xl md:text-[28px] font-normal transition-all duration-[800ms] group-hover:translate-x-1 ${activeProgram === program.id ? 'translate-x-1' : 'text-neutral-400'
                      }`}
                    style={{ color: activeProgram === program.id ? themes[program.id].primary : undefined }}
                  >
                    {program.title}
                  </h3>
                  {/* Description under active program */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeProgram === program.id ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                      }`}
                  >
                    <p className="text-neutral-400 text-lg leading-[1.6]">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side — Image Panel */}
          <div className="relative w-full max-w-[420px] aspect-square md:h-[420px] mx-auto md:ml-auto flex justify-center items-center">
            {/* Image Glow */}
            <div
              className="absolute w-[420px] h-[420px] blur-3xl rounded-full z-0 pointer-events-none transition-all duration-[800ms] ease-out"
              style={{ backgroundColor: currentTheme.glow }}
            ></div>

            <div className="w-full h-full rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative z-10 transition-transform duration-700 ease-out hover:scale-[1.05]">
              {programs.map((program) => (
                <img
                  key={program.id}
                  src={program.image}
                  alt={program.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeProgram === program.id ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-gradient-to-b from-[#0b0b0b] to-[#060606] relative">
        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
          <img src="/textures/noise.png" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <h2 className="font-['Sora'] text-[36px] font-semibold text-center mb-4 text-[#F5F5F7]">Portfolio</h2>
          <p className="text-[#B5B5C0] text-center mb-16 max-w-3xl mx-auto leading-[1.6]">
            Selected work created within The Colonist training environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border border-neutral-800 relative group transition-all duration-500 hover:border-yellow-400/30 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/portfolio">
              <Button className="bg-[#F2C94C] text-[#0E0E11] hover:bg-[#F2C94C]/90 font-medium px-8 h-12 rounded-md">
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Training Approach */}
      <section className="section-premium-dark training-approach-section">
        {/* Background Elements Shared with Alumni */}
        <div className="alumni-grain-overlay"></div>
        <div className="alumni-vignette"></div>
        <div className="alumni-light-falloff"></div>

        {/* Subtle Depth Lift */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
          <div className="w-[80%] h-[60%] bg-white/[0.015] blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h2 className="heading-editorial mb-6 reveal-on-scroll">
            Training <span className="highlight-gold">Approach</span>
          </h2>
          <p className="text-impact mb-16 reveal-on-scroll">
            Built on real production workflows.<br />
            Focused on skills studios actually use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Industry Workflow Training', icon: Settings },
              { title: 'Focused Specialization', icon: Target },
              { title: 'Portfolio Development', icon: Grid },
              { title: 'Mentorship and Critique', icon: MessageSquare },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="card-premium reveal-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="card-icon" size={24} />
                  <h3 className="card-title">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studio Opportunities */}
      <section className="section-premium-dark studio-opp-section -mt-px">
        {/* Background Elements Shared with Alumni */}
        <div className="alumni-grain-overlay"></div>
        <div className="alumni-vignette"></div>

        {/* Subtle Depth Lift */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
          <div className="w-[80%] h-[60%] bg-white/[0.015] blur-[120px] rounded-full"></div>
        </div>

        <div className="absolute inset-0 z-0">
          <img
            src="/Studio1.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.05] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="heading-editorial mb-6 reveal-on-scroll">
            Studio <span className="highlight-gold">Opportunities</span>
          </h2>
          <p className="text-impact mb-16 reveal-on-scroll">
            Pathways to the professional world.<br />
            Bridging the gap between training and studio production.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {['Internships', 'Production collaboration projects', 'Studio support roles'].map(
              (item, index) => (
                <div
                  key={index}
                  className="card-premium reveal-on-scroll md:w-[350px] w-full items-center justify-center text-center"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="card-title">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* Alumni / Trusted By Section */}
      <AlumniSection />

      {/* Who We Are */}
      <WhoWeAreSection />

      {/* Final CTA */}
      <section className="cta-section bg-[#0b0b0d] relative">
        <div className="cta-section__inner relative z-10 max-w-[1180px] mx-auto px-6 text-center">
          <p className="cta-section__label">READY TO START</p>
          <h2 className="cta-section__headline">
            <span className="cta-section__headline-primary">Train for production,</span>
            <span className="cta-section__headline-emphasis">not practice.</span>
          </h2>
          <p className="cta-section__subtext">
            Built for artists ready to work like studios.
          </p>
          <Link to="/contact" className="inline-block cta-section__buttonWrap">
            <Button className="cta-section__button bg-[#F2C94C] text-[#0E0E11] hover:brightness-95 font-medium px-12 h-14 text-base rounded-[6px] max-w-[260px] mx-auto transition-[filter] duration-200">
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
