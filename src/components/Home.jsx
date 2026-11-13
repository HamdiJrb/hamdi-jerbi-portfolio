import React from 'react';
import { publicAsset } from '../utils/publicAsset';
import { ArrowUpRight, FileText, Globe } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

// The giant word behind the portrait. Change it here; its width is fitted in
// globals.css (.hero-word --fit), so re-measure if the length changes a lot.
const BACKDROP_WORD = 'Beyond';
const PORTRAIT = '/images/about/profile_cutout.webp';

const container = 'relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12';
const kicker = 'text-[11px] font-semibold uppercase tracking-[0.2em]';

/* Four-point star used as a small ornament */
function Spark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2c.6 5.6 2.4 7.4 10 10-7.6 2.6-9.4 4.4-10 10-.6-5.6-2.4-7.4-10-10 7.6-2.6 9.4-4.4 10-10Z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const { personal, stats } = portfolioData;
  const [firstName, ...rest] = personal.name.split(' ');

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const delay = (ms) => ({ animationDelay: `${ms}ms` });

  /* Stat list, used in the right column (desktop) and under the intro (mobile) */
  const statList = (className) => (
    <ul className={className}>
      {stats.map(({ value, suffix }) => (
        <li key={suffix} className="flex items-center gap-4 py-3.5 border-b border-line last:border-b-0">
          <span className="font-heading font-extrabold tracking-tight text-sage text-3xl xl:text-4xl leading-none min-w-[4.5rem]">
            {value}
          </span>
          <span className={`${kicker} text-muted`}>{suffix}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ground lg:min-h-[max(100svh,760px)] pt-24 sm:pt-28 lg:pt-24"
    >
      <div className={`${container} lg:h-[calc(max(100svh,760px)-6rem)] flex flex-col`}>

        {/* ── Giant backdrop word ──────────────────────────── */}
        <div className="relative z-0 shrink-0 overflow-hidden lg:absolute lg:left-12 lg:right-12 lg:-top-7" aria-hidden="true">
          <p className="hero-word hero-rise block text-backdrop whitespace-nowrap select-none">
            {BACKDROP_WORD}
          </p>
        </div>

        {/* ── Portrait: overlaps the word, anchored to the bottom ── */}
        <div className="relative z-10 -mt-[20vw] sm:-mt-[16vw] lg:mt-0 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[7rem] flex justify-center pointer-events-none">
          <div className="relative w-[80%] max-w-[24rem] sm:max-w-[27rem] lg:max-w-none lg:w-auto lg:h-full translate-x-[6%] lg:translate-x-[11%] xl:translate-x-[13%]">
            <div className="hero-settle relative h-full" style={delay(120)}>
            {/* Halo behind the head and shoulders */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[2%] -translate-x-1/2 w-[92%] lg:w-[125%] aspect-square rounded-full opacity-70 dark:opacity-100"
              style={{ background: 'radial-gradient(circle, rgb(var(--sage) / 0.42) 0%, rgb(var(--sage) / 0.14) 38%, transparent 66%)' }}
            />
            <img
              src={publicAsset(PORTRAIT)}
              alt={personal.name}
              className="portrait-glow relative block w-full h-auto lg:w-auto lg:h-full"
            />
            </div>
          </div>
          {/* Fade the bottom edge into the page */}
          <div className="absolute inset-x-0 bottom-0 h-28 lg:h-24 bg-gradient-to-t from-ground via-ground/70 to-transparent" />
        </div>

        {/* ── Foreground text (desktop: over the portrait's sides) ── */}
        <div className="relative z-20 lg:mt-auto lg:pb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,24rem)_1fr_minmax(0,17rem)] items-end gap-10 lg:gap-6 -mt-10 lg:mt-0">

          {/* Left: name & intro */}
          <div className="flex flex-col items-start">
            <p className="hero-settle text-lg sm:text-xl font-medium text-fg/80 mb-2" style={delay(260)}>
              Hello, I&apos;m
            </p>
            <h1
              className="hero-settle font-heading font-extrabold uppercase text-fg leading-[0.88] tracking-[-0.035em] text-[clamp(3.25rem,6.4vw,5.75rem)]"
              style={delay(320)}
            >
              {firstName}
              <br />
              {rest.join(' ')}
            </h1>
            <p className={`hero-settle mt-5 ${kicker} text-sage text-[13px] leading-relaxed`} style={delay(380)}>
              Software engineer &amp;<br />UI/UX designer
            </p>
            <p className="hero-settle mt-4 max-w-[23rem] text-[15px] leading-relaxed text-muted" style={delay(430)}>
              Half engineer, half designer. I design interfaces for kiosks, brand
              activations and mobile apps, and I build them too.
            </p>

            <div className="hero-settle mt-6 flex flex-wrap items-center gap-3" style={delay(480)}>
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, 'work')}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                See my work
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={publicAsset('/cv/Hamdi_Jerbi_CV.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-fg/25 text-fg text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                View CV
              </a>
            </div>

            <div className={`hero-settle mt-6 ${kicker} text-muted flex flex-wrap items-center gap-x-6 gap-y-2`} style={delay(520)}>
              <span className="inline-flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sage" />
                Based in {personal.location}
              </span>
              <span className="inline-flex items-center gap-2 text-fg">
                <Spark className="w-3 h-3 text-sage" />
                Available for freelance
              </span>
            </div>
          </div>

          {/* Middle spacer keeps the portrait clear on desktop */}
          <div className="hidden lg:block" />

          {/* Right: tagline + stats */}
          <div className="hero-settle flex flex-col gap-10 lg:gap-14" style={delay(400)}>
            <div className="flex items-start gap-4">
              <span className="shrink-0 w-11 h-11 rounded-full border border-line bg-ground flex items-center justify-center text-sage">
                <Spark className="w-4 h-4" />
              </span>
              <p className="text-[15px] leading-relaxed text-fg max-w-[15rem]">
                Crafting digital experiences that bridge logic &amp; emotion.
              </p>
            </div>
            {statList('grid grid-cols-2 gap-x-6 lg:block border-t border-line lg:border-t-0')}
          </div>
        </div>
      </div>
    </section>
  );
}
