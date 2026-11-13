import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { publicAsset } from '../utils/publicAsset';
import { useScrollLock } from '../utils/scrollLock';

// Turns a videoDemo value into something playable: a YouTube/Vimeo embed URL,
// or a direct video file (local path like "/videos/demo.mp4" or a full URL).
export function resolveVideo(src) {
  if (!src) return null;
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { type: 'embed', url: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` };
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: 'embed', url: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  return { type: 'file', url: /^https?:\/\//.test(src) ? src : publicAsset(src) };
}

// Full-screen video overlay. Rendered into <body> so it isn't trapped by a
// transformed parent (cards lift on hover), and clicks inside it are stopped
// so they never reach the card or modal underneath.
export default function VideoPlayer({ video, title, onClose }) {
  useScrollLock();
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!video) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video demo`}
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <div className="w-full max-w-5xl flex justify-center" onClick={(e) => e.stopPropagation()}>
        {video.type === 'embed' ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={video.url}
              title={`${title} video demo`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <video
            src={video.url}
            controls
            autoPlay
            playsInline
            className="w-auto h-auto max-w-full max-h-[85vh] rounded-xl bg-black shadow-2xl"
          />
        )}
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close video"
        className="absolute top-4 right-4 p-2.5 rounded-lg text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <X className="w-5 h-5" />
      </button>
    </div>,
    document.body
  );
}
