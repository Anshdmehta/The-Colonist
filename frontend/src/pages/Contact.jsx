import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
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

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const initialErrors = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const leftColumnRef = useRef(null);
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const node = leftColumnRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateScroll = () => {
      frameId = 0;
      setScrollY(window.scrollY);
    };

    const onScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateScroll);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const parallaxShift = useMemo(() => {
    const top = sectionRef.current?.offsetTop ?? 0;
    const distance = Math.max(0, scrollY - top + 180);
    return Math.min(distance * 0.035, 20);
  }, [scrollY]);

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: '' }));
    if (submitMessage.type) {
      setSubmitMessage({ type: '', text: '' });
    }
  };

  const handleFieldPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    event.currentTarget.style.setProperty('--mx', `${x}px`);
    event.currentTarget.style.setProperty('--my', `${y}px`);
  };

  const validateForm = () => {
    const nextErrors = { ...initialErrors };

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = 'Please tell us your program interest.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please share a short message.';
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const formPayload = new FormData(event.currentTarget);
      formPayload.set('name', formData.name.trim());
      formPayload.set('email', formData.email.trim());
      formPayload.set('program_interest', formData.subject.trim());
      formPayload.set('message', formData.message.trim());
      formPayload.set('replyto', formData.email.trim());

      const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formPayload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong while sending your inquiry.');
      }

      setFormData(initialForm);
      setErrors(initialErrors);
      setIsSubmitted(true);
      setSubmitMessage({
        type: 'success',
        text: 'Inquiry sent successfully. We will get back to you soon.',
      });

      window.setTimeout(() => {
        setIsSubmitted(false);
      }, 2200);
    } catch (error) {
      setIsSubmitted(false);
      setSubmitMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'We could not send your inquiry. Please try again in a moment.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5F7]">
      <Header />

      <main
        ref={sectionRef}
        className="contact-studio relative overflow-hidden pt-28 pb-18 md:pt-32 md:pb-22"
      >
        <div className="contact-studio__glow" />
        <div className="contact-studio__noise" />

        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
            <section
              ref={leftColumnRef}
              className="pt-0"
              style={{ transform: `translateY(${parallaxShift}px)` }}
            >
              <p className={`contact-reveal ${revealed ? 'is-visible' : ''} contact-reveal--delay-1 text-[11px] uppercase tracking-[0.28em] text-white/42`}>
                Contact
              </p>
              <h1
                className={`contact-reveal ${revealed ? 'is-visible' : ''} contact-reveal--delay-2 mt-2 max-w-[420px] font-['Sora'] text-[42px] font-semibold leading-[0.99] text-[#F7F7F9] sm:text-[54px]`}
              >
                Get in touch
              </h1>
              <p
                className={`contact-reveal ${revealed ? 'is-visible' : ''} contact-reveal--delay-3 mt-3 max-w-[500px] text-[15px] leading-7 text-[#9999A3] sm:text-base`}
              >
                Tell us where you are in your journey and what kind of production-focused training
                you are aiming for. We will point you toward the right next step.
              </p>

              <div className="mt-8 max-w-[430px] space-y-4">
                {contactItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={`contact-reveal ${revealed ? 'is-visible' : ''} grid grid-cols-[88px_minmax(0,1fr)] items-start gap-6 border-b border-white/[0.05] pb-4`}
                    style={{ transitionDelay: `${220 + index * 70}ms` }}
                  >
                    <span className="text-[12px] uppercase tracking-[0.18em] text-[#6F6F79]">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="contact-detail-link text-[15px] leading-6 text-[#F1F1F4]"
                    >
                      <span>{item.value}</span>
                    </a>
                  </div>
                ))}
              </div>

              <div
                className={`contact-reveal ${revealed ? 'is-visible' : ''} contact-reveal--delay-4 mt-5 flex items-center gap-3`}
              >
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="contact-social-link text-white/40"
                    >
                      <Icon size={17} strokeWidth={1.9} />
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="contact-form-shell w-full max-w-[640px] rounded-[24px] border border-[#f5c542]/[0.08] bg-white/[0.03] p-6 sm:p-8 lg:mt-[22px] lg:p-9">
              <form
                className="space-y-4"
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="access_key"
                  value="607695e7-1d6c-4a4f-a58f-7aec75ececb6"
                />
                <input type="hidden" name="subject" value="New Inquiry — The Colonist" />
                <input type="hidden" name="from_name" value="The Colonist" />
                <input type="hidden" name="replyto" value={formData.email} />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-[#B7B7C2]" htmlFor="name">
                      Name
                    </label>
                    <div className="contact-field-shell" onMouseMove={handleFieldPointer}>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFieldChange}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        className="contact-form-input h-[50px] rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79]"
                      />
                    </div>
                    {errors.name ? <p className="text-sm text-[#d9a6a6]">{errors.name}</p> : null}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#B7B7C2]" htmlFor="email">
                      Email
                    </label>
                    <div className="contact-field-shell" onMouseMove={handleFieldPointer}>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFieldChange}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="contact-form-input h-[50px] rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79]"
                      />
                    </div>
                    {errors.email ? <p className="text-sm text-[#d9a6a6]">{errors.email}</p> : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#B7B7C2]" htmlFor="subject">
                    Program Interest
                  </label>
                  <div className="contact-field-shell" onMouseMove={handleFieldPointer}>
                    <Input
                      id="subject"
                      type="text"
                      name="program_interest"
                      value={formData.subject}
                      onChange={handleFieldChange}
                      placeholder="Tell us what you're exploring"
                    aria-invalid={Boolean(errors.subject)}
                    className="contact-form-input h-[50px] rounded-[12px] border-white/[0.08] bg-[#0D0D10] px-4 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79]"
                  />
                  </div>
                  {errors.subject ? <p className="text-sm text-[#d9a6a6]">{errors.subject}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#B7B7C2]" htmlFor="message">
                    Message
                  </label>
                  <div className="contact-field-shell" onMouseMove={handleFieldPointer}>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFieldChange}
                      placeholder="Share your goals, current skill level, or questions."
                      aria-invalid={Boolean(errors.message)}
                      className="contact-form-input min-h-[152px] rounded-[16px] border-white/[0.08] bg-[#0D0D10] px-4 py-3 text-[#F5F5F7] shadow-none placeholder:text-[#6E6E79]"
                    />
                  </div>
                  {errors.message ? <p className="text-sm text-[#d9a6a6]">{errors.message}</p> : null}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`contact-submit-button mt-1 h-12 rounded-[12px] px-7 text-[14px] font-medium text-[#0E0E11] shadow-none transition-all duration-200 ${
                    isSubmitted ? 'bg-[#d8f0ae]' : 'bg-[#F2C94C]'
                  }`}
                >
                  <span className="contact-submit-button__label">
                    {isSubmitted ? (
                      <>
                        <Check size={15} strokeWidth={2.2} />
                        Inquiry Sent
                      </>
                    ) : isSubmitting ? (
                      'Sending...'
                    ) : (
                      'Send Inquiry'
                    )}
                  </span>
                </Button>

                {submitMessage.text ? (
                  <p
                    className={`text-sm ${
                      submitMessage.type === 'error' ? 'text-[#d9a6a6]' : 'text-[#b8d99e]'
                    }`}
                  >
                    {submitMessage.text}
                  </p>
                ) : null}
              </form>
            </section>
          </div>
        </div>
      </main>

      <div className="pt-8 md:pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
