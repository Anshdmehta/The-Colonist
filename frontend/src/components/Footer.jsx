import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#121217] text-[#A9A9B4]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-4 text-[#F3F3F6]">
              <img src="/TC_logo.png" alt="The Colonist" className="h-11 w-auto" />
              <span className="font-['Sora'] text-[1.05rem] font-semibold tracking-[0.24em]">
                THE COLONIST
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#9696A3]">
              Industry-focused game art training designed to prepare artists for professional
              studio environments through disciplined workflows and production-ready skills.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[#C4C4CE] transition-all duration-200 hover:border-white/14 hover:bg-white/[0.06] hover:text-[#F3F3F6]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/learngamedesigning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[#C4C4CE] transition-all duration-200 hover:border-white/14 hover:bg-white/[0.06] hover:text-[#F3F3F6]"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://in.linkedin.com/company/thecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[#C4C4CE] transition-all duration-200 hover:border-white/14 hover:bg-white/[0.06] hover:text-[#F3F3F6]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.youtube.com/@threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[#C4C4CE] transition-all duration-200 hover:border-white/14 hover:bg-white/[0.06] hover:text-[#F3F3F6]"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#F1F1F4]">
                Navigation
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/" className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#F1F1F4]">
                Resources
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="https://threecolonist.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]"
                  >
                    Studio Website
                  </a>
                </li>
                <li>
                  <Link to="/agreement" className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]">
                    Universal Agreement
                  </Link>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/x1qWbUFnkBXJIkz3N"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]"
                  >
                    Google Maps Location
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:edu@threecolonist.com"
                    className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]"
                  >
                    edu@threecolonist.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919717243479"
                    className="text-sm text-[#C9C9D2] transition-colors duration-200 hover:text-[#F3F3F6]"
                  >
                    +91 9717243479
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-px max-w-[1400px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-[1400px] mx-auto flex flex-col gap-3 px-6 py-6 text-sm text-[#7E7E8C] md:flex-row md:items-center md:justify-between">
        <p>© 2026 The Colonist. School of Game Design.</p>
        <p>Discipline. Precision. Production-ready artists.</p>
      </div>
    </footer>
  );
};
