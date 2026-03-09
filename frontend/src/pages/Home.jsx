import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      title: '6 Month Program',
      defaultImage: '/assets/programs/piston.png',
      hoverImage: '/assets/programs/lamp.png',
    },
    {
      title: '1 Year Diploma',
      defaultImage: '/assets/programs/armor.png',
      hoverImage: '/assets/programs/pistol.png',
    },
    {
      title: '2 Year Advanced Diploma',
      defaultImage: '/assets/programs/aston.png',
      hoverImage: '/assets/programs/pagani.png',
    },
    {
      title: '3 Year Professional Program',
      defaultImage: '/assets/programs/female_mech.png',
      hoverImage: '/assets/programs/yellow_robot.png',
    },
  ];

  const portfolioImages = [
    '/crossbow.png',
    '/rifle.png',
    '/aston_martin.png',
    '/i20.png',
    '/bren.png',
    '/Ogmech.png',
  ];

  const careerPaths = [
    'Character Artist',
    'Hard Surface Artist',
    'Environment Artist',
    'Game Asset Artist',
    'Freelance Game Artist',
  ];

  const studioLogos = [
    '/rockstar_games.png',
    '/ubisoft_games.png',
    '/lakshay_digital.png',
    '/amazon.png',
    '/reeboot_games.png',
    '/sumo_digital.png',
    '/mandali_games.png',
  ];

  return (
    <div className="bg-[#0E0E11] text-[#F5F5F7]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-[#0E0E11]">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(242,201,76,0.08)_0%,_transparent_60%)]"></div>
            <img
              src="/hero/white-mech.png"
              alt="Game Art"
              className="relative h-[80vh] object-contain opacity-90"
            />
          </div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-[900px]">
            <h1 className="font-['Sora'] text-[64px] leading-[1.1] font-semibold mb-5 text-[#F5F5F7]">
              Industry-Focused Game Art Training
            </h1>
            <p className="text-[#B5B5C0] text-lg leading-[1.6] mb-8 max-w-[640px]">
              Build production-ready skills and professional portfolios for real-time game development.
            </p>
            <div className="flex gap-4">
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
          </div>
        </div>
      </section>

      {/* Programs Interactive Section */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#0E0E11] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-[35%_65%] gap-12 items-center">
            {/* Left Side - Program Titles */}
            <div className="space-y-8">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 cursor-pointer group"
                  onMouseEnter={() => setActiveProgram(index)}
                >
                  <div
                    className={`w-[3px] h-10 transition-all duration-300 ${
                      activeProgram === index ? 'bg-[#F2C94C] opacity-100' : 'bg-transparent opacity-0'
                    }`}
                  ></div>
                  <h3
                    className={`font-['Sora'] text-[28px] font-normal transition-all duration-300 ${
                      activeProgram === index
                        ? 'text-[#F2C94C]'
                        : 'text-[#B5B5C0]'
                    }`}
                  >
                    {program.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Right Side - Artwork Display */}
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(77,163,255,0.06)_0%,_transparent_70%)]"></div>
              {programs.map((program, index) => (
                <img
                  key={index}
                  src={activeProgram === index ? program.hoverImage : program.defaultImage}
                  alt={program.title}
                  className={`absolute max-w-full max-h-full object-contain transition-opacity duration-400 ease-in-out ${
                    activeProgram === index
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#16161B]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-['Sora'] text-[36px] font-semibold text-center mb-4 text-[#F5F5F7]">Portfolio</h2>
          <p className="text-[#B5B5C0] text-center mb-16 max-w-3xl mx-auto leading-[1.6]">
            Selected work created within The Colonist training environment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src={image}
                  alt={`Portfolio work ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
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
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#0E0E11]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-['Sora'] text-[36px] font-semibold text-center mb-6 text-[#F5F5F7]">Training Approach</h2>
          <p className="text-[#B5B5C0] text-center mb-16 max-w-4xl mx-auto leading-[1.6]">
            Training at The Colonist focuses on practical workflows used in modern game production.
            Students develop skills through structured projects, continuous critique sessions, and
            production-focused pipelines used in professional studios.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Industry Workflow Training',
              'Focused Specialization',
              'Portfolio Development',
              'Mentorship and Critique',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#16161B] border border-[#2A2A33] rounded-[10px] p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-['Sora'] text-lg font-semibold text-[#F5F5F7]">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Opportunities */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#16161B] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Studio1.png"
            alt="Studio"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#16161B] via-[#16161B]/80 to-[#16161B]"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <h2 className="font-['Sora'] text-[36px] font-semibold mb-6 text-[#F5F5F7]">Studio Opportunities</h2>
          <p className="text-[#B5B5C0] mb-12 max-w-3xl leading-[1.6]">
            Students demonstrating strong discipline and production-quality work may be considered
            for studio-related opportunities during or after training.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Internships', 'Production collaboration projects', 'Studio support roles'].map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-[#16161B] border border-[#2A2A33] rounded-[10px] p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-[#F5F5F7] font-medium">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Career Pathways */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#0E0E11]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-['Sora'] text-[36px] font-semibold text-center mb-16 text-[#F5F5F7]">Career Pathways</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((career, index) => (
              <div
                key={index}
                className="bg-[#16161B] border border-[#2A2A33] rounded-[10px] p-8 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-['Sora'] text-xl font-semibold text-[#F5F5F7]">
                  {career}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Connections Strip */}
      <section className="py-16 bg-[#16161B]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h3 className="text-center text-[#B5B5C0] text-base mb-10 leading-[1.6]">
            Our alumni work with leading game studios
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {studioLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Studio ${index + 1}`}
                className="h-8 opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#0E0E11]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Sora'] text-[36px] font-semibold mb-6 text-[#F5F5F7]">Who We Are</h2>
              <div className="text-[#B5B5C0] space-y-4 leading-[1.6] max-w-[680px]">
                <p>
                  The Colonist is a focused training environment designed around production pipelines
                  used in professional game development.
                </p>
                <p>
                  Our programs emphasize disciplined workflows, specialization in core game art, and
                  portfolio development aligned with industry expectations.
                </p>
                <p>
                  Students learn through structured mentorship, project-based training, and continuous
                  feedback designed to prepare them for studio environments.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/studio/studio3.webp"
                alt="Our Studio"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[120px] md:py-[120px] sm:py-[80px] bg-[#16161B] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/devil.png"
            alt="Start Your Journey"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16161B] via-[#16161B]/70 to-[#16161B]/50"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-['Sora'] text-[48px] font-semibold mb-6 text-[#F5F5F7]">
            Start Your Game Art Journey
          </h2>
          <p className="text-[#B5B5C0] text-lg mb-12 max-w-2xl mx-auto leading-[1.6]">
            Speak with our admissions team to explore training paths, specialization options, and
            portfolio preparation.
          </p>
          <Link to="/contact" className="inline-block">
            <Button className="bg-[#F2C94C] text-[#0E0E11] hover:bg-[#F2C94C]/90 font-medium px-10 h-14 text-lg rounded-md max-w-[240px] mx-auto">
              Book Consultation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
