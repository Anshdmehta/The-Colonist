import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Portfolio = () => {
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

  return (
    <div className="bg-gradient-to-b from-[#0b0b0b] to-[#060606] text-[#F5F5F7] min-h-screen relative">
      <Header />


      <div className="pt-32 pb-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-['Sora'] text-[48px] font-bold mb-6">Portfolio</h1>
          <p className="text-[#B5B5C0] text-lg mb-16 max-w-3xl leading-[1.6]">
            Excellence in game art through production-ready workflows. Explore our selected projects and professional specializations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border border-neutral-800 relative group transition-all duration-500 hover:border-yellow-400/30 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
              >
                {/* Image */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.category}
                  </p>
                </div>

                {/* Lighting Effect (Subtle Glow on Hover) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(242,201,76,0.05)_100%)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
