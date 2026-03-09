import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Contact = () => {
  return (
    <div className="bg-[#0E0E11] text-[#F5F5F7] min-h-screen">
      <Header />
      
      <div className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="font-['Sora'] text-[48px] font-bold mb-6">Contact</h1>
          <p className="text-[#B5B5C0] text-lg mb-8">
            Content coming soon. This page will contain contact form and information.
          </p>
          
          <div className="space-y-4 text-[#B5B5C0]">
            <p>
              <strong className="text-[#F5F5F7]">Email:</strong> edu@threecolonist.com
            </p>
            <p>
              <strong className="text-[#F5F5F7]">Phone:</strong> +91 9717243479
            </p>
            <p>
              <strong className="text-[#F5F5F7]">Location:</strong>{' '}
              <a
                href="https://maps.app.goo.gl/x1qWbUFnkBXJIkz3N"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F2C94C] hover:underline"
              >
                View on Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
