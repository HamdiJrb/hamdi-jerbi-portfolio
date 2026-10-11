import React, { useState } from 'react';
import { ArrowUpRight, Calendar, User, Eye, Layers } from 'lucide-react';
import { publicAsset } from '../utils/publicAsset';

/* ─── Image Fallback ─────────────────────────────────────────── */
function ImageFallback({ category, featured }) {
  return (
    <div
      className="w-full h-full flex flex-col items-start justify-end p-6 md:p-8 relative overflow-hidden bg-surface-100 dark:bg-surface-950"
      style={{
        backgroundImage: [
          'repeating-linear-gradient(0deg, rgba(232,160,69,0.06) 0px, rgba(232,160,69,0.06) 1px, transparent 1px, transparent 36px)',
          'repeating-linear-gradient(90deg, rgba(232,160,69,0.06) 0px, rgba(232,160,69,0.06) 1px, transparent 1px, transparent 36px)',
        ].join(', '),
      }}
    >
      {/* Large background category label */}
      <span
        className={[
          'absolute inset-0 flex items-center justify-center font-mono font-bold text-slate-900/[0.04] dark:text-white/[0.04] select-none leading-none text-center pointer-events-none',
          featured ? 'text-[10vw]' : 'text-[4.5rem]',
        ].join(' ')}
        aria-hidden="true"
      >
        {category}
      </span>

      {/* Amber accent blob */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Icon */}
      <div className="relative z-10 w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center mb-3 shadow-sm">
        <Layers className="w-5 h-5 text-primary" />
      </div>
      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
        {category}
      </span>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ProjectCard({ project, onOpenModal, featured = false }) {
  const [imgError, setImgError] = useState(false);

  /* ── FEATURED card (index 0 — full width, landscape, tall) ── */
  if (featured) {
    return (
      <article
        onClick={() => onOpenModal(project)}
        className="group cursor-pointer relative w-full rounded-2xl overflow-hidden border border-borderLight dark:border-borderDark hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-2xl"
        style={{ minHeight: '480px' }}
      >
        {/* Amber top accent line */}
        <div className="absolute top-0 inset-x-0 z-20 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Image layer */}
        <div className="absolute inset-0 project-card-img">
          {!imgError ? (
            <img
              src={publicAsset(project.images.thumbnail)}
              alt={project.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <ImageFallback category={project.category} featured />
          )}
        </div>

        {/* Bottom gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Top-left badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[10px] uppercase tracking-[0.15em] text-white font-medium">
            {project.category}
          </span>
        </div>

        {/* Top-right eye */}
        <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Eye className="w-4 h-4 text-slate-950" />
          </span>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-3.5 h-3.5 text-primary" />
            <span className="font-sans text-xs text-white/80 font-medium">{project.role}</span>
          </div>

          <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-wide bg-white/10 backdrop-blur-md text-white/90 border border-white/15"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 rounded-md font-mono text-[10px] bg-primary/20 text-primary border border-primary/30">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200">
              View Case Study
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  /* ── REGULAR card ── */
  return (
    <article
      onClick={() => onOpenModal(project)}
      className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-borderLight dark:border-borderDark bg-white dark:bg-surface-900 hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative shadow-sm"
    >
      {/* Amber top accent line */}
      <div className="absolute top-0 inset-x-0 z-10 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden project-card-img bg-surface-100 dark:bg-surface-800">
        {!imgError ? (
          <img
            src={publicAsset(project.images.thumbnail)}
            alt={project.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600"
          />
        ) : (
          <ImageFallback category={project.category} featured={false} />
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
            {project.category}
          </span>
        </div>

        {/* Eye icon on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
            <Eye className="w-3.5 h-3.5 text-slate-950" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1 font-sans text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3 text-primary/70" />
            {project.duration}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">
            {project.category.split(' ')[0]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-textLight dark:text-textDark leading-snug mb-2.5 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1 mb-4">
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wide bg-surface-50 dark:bg-surface-800 text-slate-700 dark:text-slate-300 border border-borderLight dark:border-borderDark"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-primary/10 text-primary border border-primary/20 font-semibold">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-borderLight dark:border-borderDark flex items-center justify-between bg-surface-50/10">
        <span className="font-sans text-xs font-semibold text-primary">
          Explore →
        </span>
        <div className="w-7 h-7 rounded-full border border-primary/30 bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-slate-950 transition-colors duration-200">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </article>
  );
}
