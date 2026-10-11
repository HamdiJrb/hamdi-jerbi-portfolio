import React from 'react';
import { ArrowUp } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import { publicAsset } from '../utils/publicAsset';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-surface-50 dark:bg-surface-900 border-t border-borderLight dark:border-borderDark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Two-column: brand ↔ nav + back-to-top ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* LEFT — Brand mark */}
          <div className="flex items-center gap-3">
            {/* HJ monogram */}
            <img
              src={publicAsset('/hj_favicon.svg')}
              alt="HJ"
              className="w-8 h-8 object-contain"
            />
            <div>
              <span className="font-heading font-bold text-sm text-textLight dark:text-textDark block leading-tight">
                Hamdi Jerbi
              </span>
              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 tracking-wider">
                Engineer &amp; UI/UX Specialist
              </span>
            </div>
          </div>

          {/* RIGHT — nav column + back-to-top */}
          <div className="flex items-center gap-12">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-lg border border-borderLight dark:border-borderDark bg-white/70 dark:bg-surface-800/70 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors duration-200 shrink-0 shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Bottom copyright row ── */}
        <div className="mt-10 pt-6 border-t border-borderLight dark:border-borderDark flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>© 2026 Hamdi Jerbi. All rights reserved.</span>
          <span>Crafting impactful design solutions with empathy &amp; strategy.</span>
        </div>
      </div>
    </footer>
  );
}
