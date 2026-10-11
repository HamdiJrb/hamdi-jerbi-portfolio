import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { publicAsset } from '../utils/publicAsset';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll spy + glass trigger
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = ['home', 'work', 'skills', 'experience', 'about', 'contact'];
      const offset = window.scrollY + 140;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Top bar wrapper ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex items-center justify-center px-4 pt-5">

          {/* ── Floating pill container ────────────────────────────── */}
          <div
            className={`
              pointer-events-auto w-full max-w-5xl
              flex items-center justify-between
              px-4 py-2.5 rounded-full
              transition-all duration-500 ease-out
              ${isScrolled
                ? 'glass-nav border border-borderLight dark:border-borderDark shadow-soft'
                : 'bg-transparent border border-transparent'}
            `}
          >

            {/* ── Brand mark ──────────────────────────────────────── */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Hamdi Jerbi – home"
            >
              {/* Monogram square */}
              <div
                className="
                  w-8 h-8 rounded-md flex items-center justify-center shrink-0
                  bg-primary/10 border border-primary/30
                  group-hover:bg-primary/20 group-hover:border-primary/60
                  transition-all duration-200
                "
              >
                <img
                  src={publicAsset('/hj_favicon_text.svg')}
                  alt="HJ"
                  className="w-4 h-4 object-contain"
                />
              </div>

              {/* Name */}
              <span
                className="
                  font-heading font-bold text-base tracking-tight
                  text-textLight dark:text-textDark group-hover:text-primary dark:group-hover:text-primary
                  transition-colors duration-200
                "
              >
                Hamdi Jerbi
              </span>
            </a>

            {/* ── Desktop nav links (center) ───────────────────────── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map(({ name, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <a
                    key={name}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`
                      relative px-3.5 py-2 text-sm font-medium
                      transition-colors duration-200
                      ${isActive
                        ? 'text-primary font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-textLight dark:hover:text-textDark'}
                    `}
                  >
                    {name}
                    {/* Amber underline indicator */}
                    <span
                      className={`
                        absolute bottom-0.5 left-1/2 -translate-x-1/2
                        h-px bg-primary rounded-full
                        transition-all duration-300
                        ${isActive ? 'w-4 opacity-100' : 'w-0 opacity-0'}
                      `}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── Right controls ───────────────────────────────────── */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Let's talk – text + arrow, desktop only */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="
                  hidden lg:inline-flex items-center gap-1
                  text-sm font-medium text-slate-600 dark:text-slate-400
                  hover:text-primary dark:hover:text-primary transition-colors duration-200 group
                "
              >
                Let&apos;s talk
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200
                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="
                  md:hidden w-9 h-9 flex items-center justify-center rounded-full
                  border border-borderLight dark:border-borderDark
                  text-slate-700 dark:text-slate-300 hover:text-primary
                  hover:border-primary/50
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                "
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen
                  ? <X className="w-4 h-4" />
                  : <Menu className="w-4 h-4" />
                }
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ───────────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          flex flex-col
          bg-bgLight/98 dark:bg-bgDark/98 backdrop-blur-2xl
          transition-all duration-500 ease-out
          ${isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!isMenuOpen}
      >
        {/* Close button top-right */}
        <div className="flex justify-end px-6 pt-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="
              w-10 h-10 flex items-center justify-center rounded-full
              border border-borderLight dark:border-borderDark text-slate-700 dark:text-slate-300 hover:text-primary
              hover:border-primary/50 transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
            "
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items – huge editorial typography */}
        <nav
          className="flex-1 flex flex-col justify-center px-8 gap-2"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ name, href }, i) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={name}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                style={{ transitionDelay: isMenuOpen ? `${i * 60}ms` : '0ms' }}
                className={`
                  font-heading font-black text-5xl sm:text-6xl leading-none tracking-tight
                  border-b border-borderLight dark:border-borderDark/60 py-4
                  flex items-center justify-between
                  transition-all duration-500
                  ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  ${isActive
                    ? 'text-primary'
                    : 'text-slate-400 hover:text-textLight dark:text-slate-600 dark:hover:text-textDark'}
                `}
              >
                <span>{name}</span>
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer row inside overlay */}
        <div className="px-8 pb-10 flex items-center justify-between border-t border-borderLight dark:border-borderDark pt-6">
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase">
            © 2026 Hamdi Jerbi
          </span>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="
              inline-flex items-center gap-1.5
              text-sm font-medium text-primary
              hover:text-primary-hover transition-colors duration-200 group
            "
          >
            Let&apos;s talk
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200
                         group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </>
  );
}
