import React from 'react';
import { Palette, PenTool, Code2, Server, GitBranch, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const CATEGORY_META = {
  uxUiDesign: { icon: Palette, label: '01' },
  designTools: { icon: PenTool, label: '02' },
  frontendDev: { icon: Code2, label: '03' },
  backendDev: { icon: Server, label: '04' },
  toolsPractices: { icon: GitBranch, label: '05' },
};

const METRICS = [
  { value: '5', label: 'Disciplines' },
  { value: '30+', label: 'Tools Mastered' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '2+', label: 'Years Active' },
];

function CategoryRow({ categoryKey, categoryData }) {
  const meta = CATEGORY_META[categoryKey] ?? { icon: Sparkles, label: '—' };
  const Icon = meta.icon;

  return (
    <div className="group px-6 py-7 rounded-2xl transition-all duration-300 bg-white/70 dark:bg-surface-900/50 border border-borderLight dark:border-borderDark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md dark:hover:bg-surface-850/60">
      {/* Row header */}
      <div className="flex items-center gap-4 mb-5">
        <span className="text-[11px] font-mono text-primary font-semibold tracking-widest select-none">
          {meta.label}
        </span>
        <Icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} />
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-textLight dark:text-textDark tracking-tight leading-none">
          {categoryData.category}
        </h3>
        {/* Rule */}
        <div className="flex-1 h-px bg-borderLight dark:bg-borderDark ml-2" />
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-x-6 gap-y-2.5 pl-8 sm:pl-10">
        {categoryData.items.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-textLight dark:hover:text-white transition-colors duration-200"
          >
            <span className="text-primary text-base leading-none select-none font-bold">·</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;

  const entries = Object.entries(skills);
  const gridEntries = entries.slice(0, 4);    // first 4 → 2-col grid
  const fullEntry = entries.slice(4);        // 5th → full width

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Subtle top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-borderLight dark:via-borderDark to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-primary font-semibold mb-4">
            03 / Skills
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-textLight dark:text-textDark tracking-tight leading-[0.95] mb-5">
            The Craft
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Where engineering rigour meets design intuition — a hybrid skill-set built for products that are
            both technically sound and visually unforgettable.
          </p>
        </div>

        {/* ── 2-col grid for first 4 categories ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {gridEntries.map(([key, data]) => (
            <CategoryRow key={key} categoryKey={key} categoryData={data} />
          ))}
        </div>

        {/* ── Full-width 5th category ── */}
        {fullEntry.map(([key, data]) => (
          <CategoryRow key={key} categoryKey={key} categoryData={data} />
        ))}

        {/* ── Metrics bar ── */}
        <div className="mt-14 pt-8 border-t border-borderLight dark:border-borderDark">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0">
            {METRICS.map((m, i) => (
              <React.Fragment key={m.label}>
                <div className="flex flex-col items-center px-12 py-2">
                  <span className="font-heading text-3xl font-bold text-textLight dark:text-textDark">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
                    {m.label}
                  </span>
                </div>
                {i < METRICS.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-borderLight dark:bg-borderDark self-center" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* Subtle bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-borderLight dark:via-borderDark to-transparent" />
    </section>
  );
}
