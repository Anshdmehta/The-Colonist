import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Portfolio = () => {
  return (
    <div className="bg-[#0E0E11] text-[#F5F5F7] min-h-screen">
      <Header />
      
      <div className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-['Sora'] text-[48px] font-bold mb-6">Portfolio</h1>
          <p className="text-[#B5B5C0] text-lg">
            Content coming soon. This page will showcase our complete portfolio gallery.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
