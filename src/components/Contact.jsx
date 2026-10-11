import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, BehanceIcon, InstagramIcon } from './SocialIcons';
import portfolioData from '../data/portfolio.json';

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  /* ── Validation ── */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ── Formspree Submission ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xvgzgeyw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setErrorMessage(
          data?.errors ? data.errors.map((err) => err.message).join(', ') : 'Failed to send message. Please try emailing directly.'
        );
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error occurred. Please contact via direct email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Shared field class builder ── */
  const fieldCls = (field) =>
    `w-full bg-transparent border-b pb-3 pt-1 text-textLight dark:text-textDark placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors duration-200 text-sm ${
      errors[field]
        ? 'border-rose-500'
        : 'border-borderLight dark:border-borderDark focus:border-primary dark:focus:border-primary'
    }`;

  const socialLinks = [
    { href: personal.social.linkedin,  Icon: LinkedinIcon,  label: 'LinkedIn'  },
    { href: personal.social.behance,   Icon: BehanceIcon,   label: 'Behance'   },
    { href: personal.social.github,    Icon: GithubIcon,    label: 'GitHub'    },
    { href: personal.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-bgLight dark:bg-surface-900 transition-colors duration-300">
      {/* Ambient amber orb — left-side accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(232,160,69,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase mb-4 block">
            06 / Contact
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-textLight dark:text-textDark leading-tight tracking-tight">
            Let's make something<br />
            <span className="text-gradient">remarkable.</span>
          </h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT — Info + Socials ── */}
          <div className="space-y-10">
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm">
              Whether it's a product from scratch, a design overhaul, or a collaboration idea you want to explore — I'm all ears. Let's turn it into something exceptional.
            </p>

            {/* Contact rows */}
            <div className="space-y-6">
              {[
                { Icon: Mail,    label: personal.email,    href: `mailto:${personal.email}` },
                { Icon: Phone,   label: personal.phone,    href: `tel:${personal.phone.replace(/\s+/g, '')}` },
                { Icon: MapPin,  label: personal.location, href: null },
              ].map(({ Icon, label, href }) => {
                const inner = (
                  <span className="flex items-center gap-3.5 group/row">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-textLight dark:text-textDark border-b border-transparent group-hover/row:border-primary transition-colors duration-200">
                      {label}
                    </span>
                  </span>
                );
                return href ? (
                  <a key={label} href={href} className="block">{inner}</a>
                ) : (
                  <div key={label} className="block">{inner}</div>
                );
              })}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-borderLight dark:border-borderDark bg-white/70 dark:bg-surface-800/70 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Closing note */}
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-2">
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
              I typically respond within 24 hours
            </p>
          </div>

          {/* ── RIGHT — Contact Form ── */}
          <div className="p-8 sm:p-10 rounded-2xl border border-borderLight ">
            {/* Success */}
            {submitStatus === 'success' && (
              <div className="mb-8 flex items-start gap-3 p-4 border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Message sent!</p>
                  <p className="text-xs mt-0.5 opacity-80">I'll review your note and get back to you soon.</p>
                </div>
              </div>
            )}

            {/* Error */}
            {submitStatus === 'error' && (
              <div className="mb-8 flex items-start gap-3 p-4 border border-rose-500/30 bg-rose-50 dark:bg-rose-950/30 rounded-xl text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Something went wrong.</p>
                  <p className="text-xs mt-0.5 opacity-80">{errorMessage || 'Please try again or email me directly.'}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text" id="name" name="name" autoComplete="name"
                    value={formData.name} onChange={handleChange}
                    placeholder="Jordan Lee"
                    className={fieldCls('name')}
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email" id="email" name="email" autoComplete="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className={fieldCls('email')}
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1.5">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  placeholder="Project inquiry / Full-time opportunity"
                  className={fieldCls('subject')}
                />
                {errors.subject && <p className="text-xs text-rose-500 mt-1.5">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message" name="message" rows="4"
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project, goals, timeline..."
                  className={`${fieldCls('message')} resize-y`}
                />
                {errors.message && <p className="text-xs text-rose-500 mt-1.5">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending…</span></>
                ) : (
                  <><Send className="w-4 h-4" /><span>Send Message</span></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
