import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0E0E11] border-t border-[#16161B] text-[#B5B5C0]">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo and Social */}
          <div>
            <img src="/TC_logo.png" alt="The Colonist" className="h-12 mb-4" />
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Industry-focused game art training designed to prepare artists for professional
              studio environments through disciplined workflows and production-ready skills.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#16161B] flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#0E0E11] transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/learngamedesigning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#16161B] flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#0E0E11] transition-all duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://in.linkedin.com/company/thecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#16161B] flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#0E0E11] transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.youtube.com/@threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#16161B] flex items-center justify-center hover:bg-[#F2C94C] hover:text-[#0E0E11] transition-all duration-200"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#F5F5F7] font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-[#F2C94C] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-sm hover:text-[#F2C94C] transition-colors duration-200">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm hover:text-[#F2C94C] transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#F2C94C] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-[#F5F5F7] font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://threecolonist.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#F2C94C] transition-colors duration-200"
                >
                  Studio Website
                </a>
              </li>
              <li>
                <Link to="/agreement" className="text-sm hover:text-[#F2C94C] transition-colors duration-200">
                  Universal Agreement
                </Link>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/x1qWbUFnkBXJIkz3N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#F2C94C] transition-colors duration-200"
                >
                  Google Maps Location
                </a>
              </li>
              <li>
                <a
                  href="mailto:edu@threecolonist.com"
                  className="text-sm hover:text-[#F2C94C] transition-colors duration-200"
                >
                  edu@threecolonist.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919717243479"
                  className="text-sm hover:text-[#F2C94C] transition-colors duration-200"
                >
                  +91 9717243479
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#16161B]">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 The Colonist – School of Game Design</p>
          <p className="text-sm">Discipline. Precision. Production-Ready Artists.</p>
        </div>
      </div>
    </footer>
  );
};
