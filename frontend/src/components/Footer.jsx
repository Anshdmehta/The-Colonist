import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0b0b0d] text-[#F5F5F7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(245,197,66,0.055),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.02),transparent_24%)]" />

      <div className="relative mx-auto mt-3 max-w-[1400px] px-6 pb-14 pt-[72px] md:pb-14 md:pt-[72px]">
        <div className="grid grid-cols-1 gap-11 md:grid-cols-[minmax(0,1fr)_240px] md:gap-16">
          <div className="max-w-[620px] text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5 text-[#F7F7F9]">
              <img
                src="/TC_logo.png"
                alt="The Colonist"
                className="h-[22px] w-auto translate-y-[1px] opacity-[0.88]"
              />
              <span className="font-['Inter','Sora',sans-serif] text-[1.12rem] font-semibold leading-none tracking-[0.28em]">
                THE COLONIST
              </span>
            </Link>

            <p className="mt-2.5 text-[15px] text-[#BFC0CA] sm:text-base">School of Game Design</p>
            <p className="mt-3 max-w-[320px] text-base leading-7 text-[#93939E]">
              Industry-focused training for artists entering real production pipelines.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
              <a
                href="https://www.instagram.com/threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 transition-colors duration-200 hover:text-[#f5c542]"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.9} />
              </a>
              <a
                href="https://www.facebook.com/learngamedesigning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 transition-colors duration-200 hover:text-[#f5c542]"
                aria-label="Facebook"
              >
                <Facebook size={16} strokeWidth={1.9} />
              </a>
              <a
                href="https://in.linkedin.com/company/thecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 transition-colors duration-200 hover:text-[#f5c542]"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} strokeWidth={1.9} />
              </a>
              <a
                href="https://www.youtube.com/@threecolonist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 transition-colors duration-200 hover:text-[#f5c542]"
                aria-label="YouTube"
              >
                <Youtube size={16} strokeWidth={1.9} />
              </a>
            </div>
            <div className="mx-auto mt-4 h-px w-14 bg-[#f5c542]/55 md:mx-0" />
          </div>

          <nav className="flex flex-col items-center gap-4 text-center md:items-end md:pt-1 md:text-right">
            <Link
              to="/programs"
              className="translate-x-0 text-base text-white/72 transition-all duration-200 hover:-translate-y-[1px] hover:text-[#F5F5F7]"
            >
              Programs
            </Link>
            <Link
              to="/portfolio"
              className="translate-x-0 text-base text-white/72 transition-all duration-200 hover:-translate-y-[1px] hover:text-[#F5F5F7]"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="translate-x-0 text-base text-white/72 transition-all duration-200 hover:-translate-y-[1px] hover:text-[#F5F5F7]"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-9 h-px bg-white/[0.08]" />

        <div className="mt-5 flex flex-col gap-3 text-center text-sm text-[#767680] md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 The Colonist</p>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p className="text-white/60">Discipline. Precision. Production-ready artists.</p>
            <Link
              to="/agreement"
              className="text-[12px] text-white/42 transition-colors duration-200 hover:text-white/68"
            >
              Universal Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
