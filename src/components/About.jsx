import React, { useState } from 'react';
import { publicAsset } from '../utils/publicAsset';
import { MapPin } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const traits = [
  { label: 'Philosophy', value: 'User-first always' },
  { label: 'Approach', value: 'Research → Design → Code' },
  { label: 'Style', value: 'Minimal with depth' },
  { label: 'Status', value: 'Available to hire' },
];

export default function About() {
  const [imageError, setImageError] = useState(false);
  const { personal, summary, stats } = portfolioData;

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-bgLight dark:bg-bgDark transition-colors duration-300">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <div className="mb-16 flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-widest uppercase font-semibold">05 / About</span>
          <div className="h-px flex-1 max-w-[80px] bg-borderLight dark:bg-borderDark" />
        </div>

        {/* Two-column magazine spread */}
        <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-20 items-start">

          {/* ─── LEFT COLUMN ─── */}
          <div className="flex flex-col gap-10 animate-fade-in">

            {/* Pull quote / manifesto */}
            <blockquote className="text-3xl sm:text-4xl font-heading font-bold leading-tight text-textLight dark:text-textDark">
              Half engineer, half designer —{' '}
              <span className="text-gradient">
                I believe the best digital products live at the intersection of logic and beauty.
              </span>
            </blockquote>

            {/* Summary paragraph */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
              {summary}
            </p>

            {/* Location / ambition paragraph */}
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
              Based in{' '}
              <span className="text-primary font-semibold">Nabeul, Tunisia</span>, I work with clients and teams worldwide — bringing craft, clarity, and conviction to every pixel and every line of code. My ambition is simple: to build things people feel, not just use.
            </p>

            {/* Trait row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 border-t border-borderLight dark:border-borderDark">
              {traits.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-semibold">{label}</span>
                  <span className="text-sm font-medium text-textLight dark:text-textDark leading-snug">{value}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-borderLight dark:border-borderDark">
              {stats.map(({ label, value, suffix }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-4xl sm:text-5xl font-heading font-bold text-gradient leading-none">{value}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400 mt-1">{suffix}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="flex flex-col items-center lg:items-end gap-5 animate-fade-in">
            <div className="relative w-full max-w-sm lg:max-w-none">

              {/* Amber glow behind image */}
              <div className="absolute inset-0 translate-y-4 translate-x-2 bg-primary/10 rounded-2xl blur-3xl pointer-events-none" />

              {/* Portrait container */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-xl border border-borderLight dark:border-primary/20 bg-surface-100 dark:bg-surface-900"
                style={{ aspectRatio: '3/4', transform: 'rotate(1deg)' }}
              >
                {imageError ? (
                  /* Fallback with initials */
                  <div className="w-full h-full bg-surface-200 dark:bg-surface-800 flex items-center justify-center">
                    <span className="text-7xl font-heading font-bold text-primary select-none">HJ</span>
                  </div>
                ) : (
                  <img
                    src={publicAsset(personal.avatar || '/images/about/profile_picture.png')}
                    alt={personal.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                )}

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Caption */}
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wide flex items-center gap-1.5">
              <MapPin size={12} className="text-primary" />
              Nabeul, Tunisia — Available Globally
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
