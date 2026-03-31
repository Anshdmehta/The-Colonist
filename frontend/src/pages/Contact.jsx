import React from 'react';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const contactItems = [
  {
    label: 'Office',
    value: 'Noida, India',
    href: 'https://maps.app.goo.gl/x1qWbUFnkBXJIkz3N',
    external: true,
  },
  {
    label: 'Email',
    value: 'edu@threecolonist.com',
    href: 'mailto:edu@threecolonist.com',
  },
  {
    label: 'Telephone',
    value: '+91 9717243479',
    href: 'tel:+919717243479',
  },
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/threecolonist',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/learngamedesigning',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://in.linkedin.com/company/thecolonist',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.youtube.com/@threecolonist',
    label: 'YouTube',
    icon: Youtube,
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F7]">
      <Header />

      <main className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,201,76,0.06),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.025),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.6px,transparent_0.6px)] [background-size:14px_14px]" />

        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
            <section className="pt-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Contact</p>
              <h1 className="mt-4 max-w-[420px] font-['Sora'] text-[42px] font-semibold leading-[1.02] text-[#F7F7F9] sm:text-[54px]">
                Get in touch
              </h1>
              <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-[#9999A3] sm:text-base">
                Tell us where you are in your journey and what kind of production-focused training
                you are aiming for. We will point you toward the right next step.
              </p>

              <div className="mt-10 max-w-[430px] space-y-5">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[88px_minmax(0,1fr)] items-start gap-6 border-b border-white/[0.05] pb-4"
                  >
                    <span className="text-[12px] uppercase tracking-[0.18em] text-[#6F6F79]">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-[15px] leading-6 text-[#F1F1F4] transition-colors duration-200 hover:text-[#f5c542]"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="text-white/40 transition-all duration-200 hover:text-white/70 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]"
                    >
                      <Icon size={17} strokeWidth={1.9} />
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-[2px] sm:p-8 lg:p-9">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-[#B7B7C2]" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="h-12 rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79] transition-all duration-200 focus-visible:border-[#f5c542]/45 focus-visible:ring-1 focus-visible:ring-[#f5c542]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#B7B7C2]" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79] transition-all duration-200 focus-visible:border-[#f5c542]/45 focus-visible:ring-1 focus-visible:ring-[#f5c542]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#B7B7C2]" htmlFor="subject">
                    Program Interest
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Tell us what you're exploring"
                    className="h-12 rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79] transition-all duration-200 focus-visible:border-[#f5c542]/45 focus-visible:ring-1 focus-visible:ring-[#f5c542]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#B7B7C2]" htmlFor="message">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Share your goals, current skill level, or questions."
                    className="min-h-[160px] rounded-[16px] border-white/[0.08] bg-[#0D0D10] px-4 py-3 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79] transition-all duration-200 focus-visible:border-[#f5c542]/45 focus-visible:ring-1 focus-visible:ring-[#f5c542]/20"
                  />
                </div>

                <Button className="h-12 rounded-[12px] bg-[#F2C94C] px-7 text-[14px] font-medium text-[#0E0E11] shadow-none transition-all duration-200 hover:bg-[#F2C94C] hover:translate-y-[-1px] hover:shadow-[0_0_24px_rgba(242,201,76,0.16)]">
                  Book Consultation
                </Button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
