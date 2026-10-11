import React from 'react';
import { publicAsset } from '../utils/publicAsset';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, BehanceIcon, InstagramIcon } from './SocialIcons';
import portfolioData from '../data/portfolio.json';

export default function Home() {
  const { personal, stats } = portfolioData;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socials = [
    { href: personal.social.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
    { href: personal.social.github,   icon: GithubIcon,   label: 'GitHub'   },
    { href: personal.social.behance,  icon: BehanceIcon,  label: 'Behance'  },
    { href: personal.social.instagram,icon: InstagramIcon, label: 'Instagram'},
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-16 py-28 overflow-hidden bg-bgLight dark:bg-bgDark transition-colors duration-300"
    >
      {/* Grain texture overlay */}
      <div className="grain" />

      {/* Single ambient blob — very low opacity */}
      <div
        className="pointer-events-none absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(232,160,69,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-8 items-center">

          {/* ── LEFT COLUMN (60%) ─────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col items-start animate-fade-in">

            {/* Label + line */}
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-8 h-[2px] bg-primary flex-shrink-0" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Software Engineer &amp; UI/UX Specialist
              </span>
            </div>

            {/* Name - Big, prominent & unmistakable */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold leading-[0.95] text-gradient tracking-tight mb-4">
              Hamdi Jerbi
            </h1>

            {/* Tagline / title - Decreased in size */}
            <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-textLight dark:text-textDark leading-tight tracking-tight max-w-xl mb-6">
              Crafting digital experiences that bridge{' '}
              <span className="italic text-slate-500 dark:text-slate-400 font-normal">logic &amp;</span> emotion.
            </p>

            {/* Bio */}
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mb-10">
              A hybrid thinker — half engineer, half designer. With 2+ years of
              professional experience delivering purposeful digital products that
              blend technical precision with emotional resonance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, 'work')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-slate-900 font-semibold text-sm tracking-wide hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md shadow-primary/20"
              >
                View Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-textLight dark:text-slate-300 dark:hover:text-white transition-colors group"
              >
                Contact Me
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-borderLight dark:border-borderDark bg-white/70 dark:bg-surface-800/70 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (40%) ────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col items-center gap-5">

            {/* Profile card */}
            <div className="relative w-full max-w-[320px] rotate-1">

              {/* Card */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-borderLight dark:border-primary/30 bg-surface-100 dark:bg-surface-900 shadow-xl shadow-black/10 dark:shadow-black/40">
                <img
                  src={publicAsset('/images/about/profile_picture.png')}
                  alt="Hamdi Jerbi"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Floating metadata chip */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3 py-2 rounded-xl bg-black/60 dark:bg-surface-900/80 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="font-mono text-[10px] tracking-wide truncate text-white/90">
                      {personal.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 tracking-wide font-medium">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Amber accent glow behind card */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-2xl opacity-30 dark:opacity-20"
                style={{ background: 'radial-gradient(circle at 60% 80%, rgba(232,160,69,0.5), transparent 70%)' }}
              />
            </div>

            {/* Stats 2×2 micro-grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[320px]">
              {stats.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-borderLight dark:border-borderDark bg-white/80 dark:bg-surface-800/60 backdrop-blur-sm shadow-sm"
                >
                  <span className="font-heading font-bold text-xl text-textLight dark:text-textDark leading-none">
                    {value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 leading-tight">
                    {suffix}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
