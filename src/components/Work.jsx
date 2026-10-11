import React, { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import projectsData from '../data/projects.json';
import ProjectCard from './ProjectCard';

const CATEGORIES = ['All', 'UI/UX Design', 'Frontend Development', 'Mobile Development'];

export default function Work({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
      className="py-24 md:py-32 relative bg-surface-50 dark:bg-surface-950 transition-colors duration-300"
    >
      {/* Subtle top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-borderLight dark:via-borderDark to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            01 / Work
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-textLight dark:text-textDark tracking-tight leading-none">
              Selected{' '}
              <span className="text-gradient">Projects</span>
            </h2>

            {/* Filter tabs — desktop inline with heading row */}
            <nav
              aria-label="Project filter"
              className="hidden sm:flex items-end gap-1 pb-1"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={[
                    'relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200',
                    activeFilter === cat
                      ? 'text-textLight dark:text-textDark font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-textLight dark:hover:text-textDark',
                  ].join(' ')}
                >
                  {cat}
                  {activeFilter === cat && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Thin rule */}
          <div className="mt-6 h-px bg-borderLight dark:bg-borderDark" />

          {/* Filter tabs — mobile stacked below rule */}
          <nav
            aria-label="Project filter"
            className="flex sm:hidden flex-wrap items-center gap-1 mt-4"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={[
                  'relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200',
                  activeFilter === cat
                    ? 'text-textLight dark:text-textDark font-semibold'
                    : 'text-slate-500 dark:text-slate-400',
                ].join(' ')}
              >
                {cat}
                {activeFilter === cat && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Project Grid ── */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-slate-500 dark:text-slate-400 text-sm tracking-widest uppercase">
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={idx === 0 ? 'md:col-span-2' : 'col-span-1'}
              >
                <ProjectCard
                  project={project}
                  onOpenModal={onSelectProject}
                  featured={idx === 0}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
