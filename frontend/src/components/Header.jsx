import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled ? 'bg-[rgba(14,14,17,0.9)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/TC_logo.png" alt="The Colonist" className="h-8" />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            to="/"
            className={`text-[14px] transition-all duration-200 hover:text-[#F5F5F7] ${
              isActive('/') ? 'text-[#F5F5F7] font-medium' : 'text-[#B5B5C0]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/programs"
            className={`text-[14px] transition-all duration-200 hover:text-[#F5F5F7] ${
              isActive('/programs') ? 'text-[#F5F5F7] font-medium' : 'text-[#B5B5C0]'
            }`}
          >
            Programs
          </Link>
          <Link
            to="/portfolio"
            className={`text-[14px] transition-all duration-200 hover:text-[#F5F5F7] ${
              isActive('/portfolio') ? 'text-[#F5F5F7] font-medium' : 'text-[#B5B5C0]'
            }`}
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            className={`text-[14px] transition-all duration-200 hover:text-[#F5F5F7] ${
              isActive('/contact') ? 'text-[#F5F5F7] font-medium' : 'text-[#B5B5C0]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Side Button */}
        <Link to="/contact">
          <Button
            className="bg-[#F2C94C] text-[#0E0E11] hover:bg-[#F2C94C]/90 font-medium px-[18px] h-11 text-[14px] rounded-md transition-all duration-200"
          >
            Book Consultation
          </Button>
        </Link>
      </div>
    </header>
  );
};
