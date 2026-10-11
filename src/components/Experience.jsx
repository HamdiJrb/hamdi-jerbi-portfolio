import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-bgLight dark:bg-bgDark transition-colors duration-300">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="mb-20 animate-fade-in">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={12} className="text-primary/70" />
            04 / Experience
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tight text-textLight dark:text-textDark">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
        </div>

        {/* ── Timeline Container ── */}
        <div className="relative">

          {/* Vertical guide line — far left */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-borderLight dark:via-borderDark to-transparent" />

          {/* ── Experience Items ── */}
          <div className="flex flex-col gap-0">
            {experience.map((job, index) => {
              const isCurrent = index === 0;

              return (
                <div
                  key={job.id}
                  className={[
                    'group relative pl-8 md:pl-12 py-10',
                    'border-l-2 transition-all duration-300 ease-out',
                    isCurrent
                      ? 'border-primary bg-primary/[0.02] dark:bg-primary/[0.03]'
                      : 'border-borderLight dark:border-borderDark hover:border-primary/50 dark:hover:border-primary/50',
                    'rounded-r-2xl hover:bg-primary/[0.04] dark:hover:bg-primary/[0.1]',
                  ].join(' ')}
                >
                  {/* Dot indicator */}
                  <div
                    className={[
                      'absolute -left-[5px] top-11 w-2.5 h-2.5 rounded-full border transition-all duration-300',
                      isCurrent
                        ? 'bg-primary border-primary shadow-[0_0_8px_rgba(232,160,69,0.6)]'
                        : 'bg-bgLight dark:bg-bgDark border-borderLight dark:border-borderDark group-hover:bg-primary/40 group-hover:border-primary',
                    ].join(' ')}
                  />

                  {/* ── Two-column layout ── */}
                  <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 gap-6">

                    {/* LEFT: Company + Role + Meta */}
                    <div className="flex flex-col gap-2 lg:pt-1">

                      {/* Current badge */}
                      {isCurrent && (
                        <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] tracking-widest uppercase mb-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Current
                        </span>
                      )}

                      {/* Company name */}
                      <div className="flex items-center gap-2 group/company cursor-default">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-textLight dark:text-textDark leading-tight transition-colors duration-200 group-hover/company:text-primary">
                          {job.company}
                        </h3>
                        <ArrowRight
                          size={16}
                          className="text-primary opacity-0 -translate-x-2 transition-all duration-200 group-hover/company:opacity-100 group-hover/company:translate-x-0 flex-shrink-0"
                        />
                      </div>

                      {/* Role */}
                      <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                        {job.role}
                      </p>

                      {/* Duration + Location */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <Calendar size={11} className="text-primary/60" />
                          {job.duration}
                        </span>
                        <span className="w-px h-3 bg-borderLight dark:bg-borderDark" />
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <MapPin size={11} className="text-primary/60" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT: Description + Responsibilities + Tech chips */}
                    <div className="flex flex-col gap-5">

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {job.description}
                      </p>

                      {/* Responsibilities */}
                      <ul className="flex flex-col gap-2.5">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <ChevronRight
                              size={14}
                              className="text-primary/70 flex-shrink-0 mt-0.5"
                            />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-1 rounded-md font-mono text-[10px] tracking-wide uppercase border border-borderLight dark:border-primary/20 bg-white/70 dark:bg-primary/5 text-slate-700 dark:text-primary/80 transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline end dot */}
          <div className="absolute -left-[3px] bottom-0 w-1.5 h-1.5 rounded-full bg-borderLight dark:bg-borderDark" />
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 pl-8 md:pl-12">
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-primary-hover transition-colors duration-200 group font-semibold"
          >
            <Briefcase size={13} />
            Open to new opportunities
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
