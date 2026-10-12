import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { publicAsset } from '../utils/publicAsset';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const allImages = [project.images.hero, ...project.images.gallery];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, width: 1 });
  const [brokenImages, setBrokenImages] = useState({});

  const modalRef = useRef(null);

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  // Lock body scroll + keyboard navigation (ESC, arrow keys)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImageIndex, allImages.length]);

  // Swipe / drag between images (touch, pen and mouse)
  const swipeThreshold = 0.15; // fraction of the slide width
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('button')) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      width: e.currentTarget.getBoundingClientRect().width || 1,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(e.clientY - d.startY) > Math.abs(dx)) { d.active = false; return; }
      d.moved = true;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDragX(dx);
  };
  const endDrag = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    const dx = e.clientX - d.startX;
    setIsDragging(false);
    setDragX(0);
    if (dx < -d.width * swipeThreshold) nextImage();
    else if (dx > d.width * swipeThreshold) prevImage();
  };

  const markImageBroken = (index) => setBrokenImages((prev) => ({ ...prev, [index]: true }));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[94vh] animate-fade-in border border-borderLight dark:border-borderDark bg-white dark:bg-surface-900 transition-colors duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between px-6 py-5 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-borderLight dark:border-borderDark">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs tracking-widest text-primary uppercase font-semibold">
              {project.category}
            </span>
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-heading font-extrabold text-textLight dark:text-textDark leading-tight"
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="ml-4 mt-1 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-textLight dark:hover:text-white border border-borderLight dark:border-borderDark bg-surface-50 dark:bg-surface-800 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shrink-0 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          {/* Image slider (swipe / drag, arrows, keyboard) */}
          <div
            className="relative w-full aspect-video bg-surface-100 dark:bg-surface-950 group overflow-hidden select-none touch-pan-y"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={`flex h-full ${isDragging ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ transform: `translateX(calc(${-activeImageIndex * 100}% + ${dragX}px))` }}
            >
              {allImages.map((img, idx) => (
                <div key={idx} className="w-full h-full shrink-0">
                  {!brokenImages[idx] ? (
                    <img
                      src={publicAsset(img)}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      onError={() => markImageBroken(idx)}
                      draggable={false}
                      className="w-full h-full object-cover object-top pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-surface-100 dark:bg-surface-900 text-center">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-3">
                        <Layers className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-heading font-bold text-sm text-textLight dark:text-textDark">
                        {project.title}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                        Preview {idx + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation arrows (desktop) */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Slide counter + dots */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-mono tabular-nums tracking-wide">
              {activeImageIndex + 1}<span className="text-white/50"> / {allImages.length}</span>
            </div>
          </div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 px-6 py-2.5 bg-surface-50 dark:bg-surface-950/70 border-b border-borderLight dark:border-borderDark overflow-x-auto">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Switch to image ${idx + 1}`}
                  className={`relative shrink-0 w-12 h-8 rounded-md overflow-hidden border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-primary ring-1 ring-primary/40'
                      : 'border-borderLight dark:border-borderDark opacity-50 hover:opacity-100 hover:border-primary/50'
                  }`}
                >
                  {!brokenImages[idx] ? (
                    <img
                      src={publicAsset(img)}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={() => markImageBroken(idx)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-[9px] leading-none text-slate-400 dark:text-slate-500 font-mono tabular-nums">
                      {idx + 1}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 divide-y lg:divide-y-0 lg:divide-x divide-borderLight dark:divide-borderDark">
            {/* LEFT: description + features */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Long description */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-borderLight dark:border-borderDark pb-2">
                  Project Overview
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                  {project.longDescription}
                </p>
              </div>

              {/* Key features */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-borderLight dark:border-borderDark pb-2">
                  Key Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800/40 border border-borderLight dark:border-borderDark"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: metadata sidebar */}
            <div className="p-6 sm:p-8 space-y-7 bg-surface-50 dark:bg-surface-950/50">
              {/* Role & Duration */}
              <div className="space-y-4">
                <div>
                  <p className="font-mono uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 mb-1">Role</p>
                  <p className="text-sm font-semibold text-textLight dark:text-textDark">{project.role}</p>
                </div>
                <div>
                  <p className="font-mono uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-textLight dark:text-textDark">{project.duration}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <p className="font-mono uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-primary-dark dark:text-primary border border-primary/25 bg-primary/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2.5 pt-2">
                {project.links.liveDemo && (
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-borderLight dark:border-borderDark bg-white dark:bg-surface-800/60 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary text-sm font-medium transition-all duration-200 shadow-sm group"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-borderLight dark:border-borderDark bg-white dark:bg-surface-800/60 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary text-sm font-medium transition-all duration-200 shadow-sm group"
                  >
                    <span>Source Repository</span>
                    <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                  </a>
                )}
                {project.links.caseStudy && (
                  <a
                    href={project.links.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-borderLight dark:border-borderDark bg-white dark:bg-surface-800/60 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary text-sm font-medium transition-all duration-200 shadow-sm group"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
