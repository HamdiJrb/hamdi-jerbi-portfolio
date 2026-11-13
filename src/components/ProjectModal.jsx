import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, Layers, Maximize2, Hand, PlayCircle } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { publicAsset } from '../utils/publicAsset';
import VideoPlayer, { resolveVideo } from './VideoPlayer';
import { useScrollLock } from '../utils/scrollLock';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const allImages = [project.images.hero, ...project.images.gallery];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, width: 1 });
  const [brokenImages, setBrokenImages] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fsStartX = useRef(null);
  const fsRef = useRef(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const video = resolveVideo(project.links?.videoDemo);

  // Swipe hint auto-dismisses; any interaction (see below) dismisses it sooner
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 3100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (activeImageIndex !== 0) setShowSwipeHint(false);
  }, [activeImageIndex]);

  const modalRef = useRef(null);

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  // Lock body scroll for as long as the modal is open
  useScrollLock();

  // Keyboard navigation (ESC, arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isVideoOpen) return; // the video player closes itself
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      } else if (isVideoOpen) return;
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, allImages.length, isFullscreen, isVideoOpen]);

  // Native browser fullscreen for the gallery overlay. Where the API is
  // unsupported (e.g. iPhone Safari) the overlay still works as a fallback.
  useEffect(() => {
    if (!isFullscreen) return;
    const el = fsRef.current;
    const request = el?.requestFullscreen || el?.webkitRequestFullscreen;
    if (request) {
      const result = request.call(el);
      if (result?.catch) result.catch(() => {});
    }

    // The browser handles Esc itself when in native fullscreen, so sync state
    const onChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        const r = exit.call(document);
        if (r?.catch) r.catch(() => {});
      }
    };
  }, [isFullscreen]);

  // Swipe / drag between images (touch, pen and mouse)
  const swipeThreshold = 0.15; // fraction of the slide width
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('button')) return;
    setShowSwipeHint(false);
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

  // Load the current slide and its neighbours (wrapping) eagerly, the rest lazily
  const isNearActive = (idx) => {
    const n = allImages.length;
    const dist = Math.abs(idx - activeImageIndex);
    return Math.min(dist, n - dist) <= 1;
  };

  const markImageBroken =(index) => setBrokenImages((prev) => ({ ...prev, [index]: true }));

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
        {/* Close button (floats over the image) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 p-2 rounded-lg text-white/90 hover:text-white bg-black/50 backdrop-blur-md border border-white/20 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

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
                      loading={isNearActive(idx) ? 'eager' : 'lazy'}
                      decoding="async"
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
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-mono tabular-nums tracking-wide">
              {activeImageIndex + 1}<span className="text-white/50"> / {allImages.length}</span>
            </div>

            {/* Swipe hint */}
            {showSwipeHint && allImages.length > 1 && (
              <div className="swipe-hint absolute inset-0 z-10 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="flex items-center justify-center p-3.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <Hand className="swipe-hint-hand w-6 h-6" />
                </div>
              </div>
            )}

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              aria-label="View gallery in full screen"
              className="absolute top-3 right-14 z-10 p-2 rounded-lg text-white/90 hover:text-white bg-black/50 backdrop-blur-md border border-white/20 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
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
                      loading="lazy"
                      decoding="async"
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

          {/* Title block */}
          <div className="flex flex-col gap-1.5 px-6 sm:px-8 py-5 border-b border-borderLight dark:border-borderDark">
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
                {video && (
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-borderLight dark:border-borderDark bg-white dark:bg-surface-800/60 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary text-sm font-medium transition-all duration-200 shadow-sm group"
                  >
                    <span>Watch Video Demo</span>
                    <PlayCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                  </button>
                )}
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

      {/* Video demo player */}
      {isVideoOpen && video && (
        <VideoPlayer video={video} title={project.title} onClose={() => setIsVideoOpen(false)} />
      )}

      {/* Full screen gallery */}
      {isFullscreen && (
        <div
          ref={fsRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery`}
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center select-none"
          onPointerDown={(e) => { fsStartX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (fsStartX.current === null) return;
            const dx = e.clientX - fsStartX.current;
            fsStartX.current = null;
            if (dx < -50) nextImage();
            else if (dx > 50) prevImage();
          }}
        >
          {!brokenImages[activeImageIndex] ? (
            <img
              key={activeImageIndex}
              src={publicAsset(allImages[activeImageIndex])}
              alt={`${project.title} screenshot ${activeImageIndex + 1}`}
              onError={() => markImageBroken(activeImageIndex)}
              draggable={false}
              className="max-w-full max-h-full object-contain animate-fade-in"
            />
          ) : (
            <p className="text-white/70 font-mono text-sm">Preview unavailable</p>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Exit full screen"
            className="absolute top-4 right-4 p-2.5 rounded-lg text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-mono tabular-nums">
            {activeImageIndex + 1}<span className="text-white/50"> / {allImages.length}</span>
          </div>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
