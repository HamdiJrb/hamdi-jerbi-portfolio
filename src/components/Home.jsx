import React from 'react';
import { publicAsset } from '../utils/publicAsset';
import { ArrowUpRight, FileText, Mail, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

// The giant word behind the portrait. Change it here; its width is fitted in
// globals.css (.hero-word --fit), so re-measure if the length changes a lot.
const BACKDROP_WORD = 'Beyond';
const PORTRAIT = '/images/about/profile_cutout.png';

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
  const name = personal.name;

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
      className="relative overflow-hidden bg-ground pt-24 sm:pt-28 lg:pt-24"
    >
      <div className={`${container} hero-stage flex flex-col`}>

        {/* ── Giant backdrop word ──────────────────────────── */}
        <div className="relative z-0 shrink-0 overflow-hidden lg:absolute lg:left-12 lg:right-12 lg:-top-16" aria-hidden="true">
          <p className="hero-word hero-rise block text-backdrop whitespace-nowrap select-none">
            {BACKDROP_WORD}
          </p>
        </div>

        {/* ── Portrait: overlaps the word, anchored to the bottom ── */}
        <div className="relative z-10 -mt-[20vw] sm:-mt-[16vw] lg:mt-0 lg:absolute lg:inset-x-0 lg:bottom-[9%] lg:top-[5rem] lg:[clip-path:inset(-100%_-100%_0_-100%)] flex justify-center pointer-events-none">
          <div className="relative w-[75%] max-w-[22.4rem] sm:max-w-[25.3rem] lg:max-w-none lg:w-auto lg:h-[93.5%] lg:self-end translate-x-[6%] lg:translate-x-[11%] xl:translate-x-[13%]">
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

            {/* Location tag pinned on the chest, like a marker on a map */}
            <div
              className="hero-settle absolute right-[-11%] top-[30%] sm:right-[-2%] sm:top-[18%] lg:right-[-1%] lg:top-[38%]"
              style={delay(620)}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 rounded-full pl-2 pr-3 py-1.5 sm:pl-2.5 sm:pr-4 sm:py-2 bg-ground/60 backdrop-blur-md border border-fg/10 shadow-[0_8px_30px_-8px_rgb(0_0_0/0.35)]">
                <span className="relative flex w-2 h-2 sm:w-2.5 sm:h-2.5">
                  <span className="absolute inset-0 rounded-full bg-sage/60 motion-safe:animate-ping" />
                  <span className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sage" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[9px] sm:text-[10px] text-muted">Based in</span>
                  <span className="block text-[11px] sm:text-[13px] font-semibold text-fg">{personal.location}</span>
                </span>
              </div>
            </div>

            {/* AI card, tilted on the left of the chest */}
            <a
              href="#ai"
              onClick={(e) => scrollToSection(e, 'ai')}
              aria-label="How I work with AI"
              className="hero-settle pointer-events-auto block absolute left-[-13%] bottom-[23%] sm:left-[-3%] lg:left-[0%] lg:bottom-[19%] w-max rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 lg:p-4 bg-ground/70 backdrop-blur-md border border-fg/10 hover:border-sage/50 transition-colors shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)]"
              style={{ ...delay(700), rotate: '-4deg', backfaceVisibility: 'hidden' }}
            >
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-sage/15 text-sage px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[13px] font-semibold mb-1.5 sm:mb-2.5">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                AI is on the team
              </span>
              <blockquote className="font-heading font-medium text-fg text-[11px] sm:text-[15px] leading-snug tracking-tight whitespace-nowrap">
                But I'm still the art director.
              </blockquote>
            </a>
          </div>
          {/* Fade the bottom edge into the page */}
          <div className="absolute inset-x-0 bottom-0 h-28 lg:h-28 bg-gradient-to-t from-ground via-ground/70 to-transparent" />

          {/* Tagline across the foot of the portrait. This box mirrors the
              portrait's size and offset so the line spans exactly its width. */}
          {/* <div className="absolute inset-0 flex justify-center items-end">
            <div className="relative w-[80%] max-w-[24rem] sm:max-w-[27rem] lg:max-w-none lg:w-auto lg:h-full aspect-[900/996] translate-x-[6%] lg:translate-x-[11%] xl:translate-x-[13%] [container-type:inline-size]">
              <figure className="hero-settle absolute inset-x-0 bottom-[14%] lg:bottom-[5%]" style={delay(820)}>
                <blockquote className="tagline-fit font-heading font-medium text-fg whitespace-nowrap text-center tracking-tight leading-none">
                  Crafting digital experiences that bridge logic &amp; emotion.
                </blockquote>
              </figure>
            </div>
          </div> */}
        </div>

        {/* ── Foreground text (desktop: over the portrait's sides) ── */}
        <div className="relative z-20 pointer-events-none lg:mt-auto lg:pb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,24rem)_1fr_minmax(0,17rem)] items-end gap-10 lg:gap-6 -mt-10 lg:mt-0">

          {/* Left: name & intro */}
          <div className="pointer-events-auto flex flex-col items-start">
            <p className="hero-settle text-lg sm:text-xl font-medium text-fg/80 mb-2" style={delay(260)}>
              Hello, I&apos;m
            </p>
            <h1
              className="hero-settle whitespace-nowrap font-extrabold uppercase text-fg leading-[0.88] tracking-[-0.035em] text-[clamp(2.5rem,5vw,4.5rem)]"
              style={delay(320)}
            >
              {name}
            </h1>
            <p className={`hero-settle mt-4 ${kicker} text-sage text-[13px] leading-relaxed`} style={delay(380)}>
            Software engineer &amp; UI/UX Specialist
            </p>
            <p className="hero-settle mt-4 max-w-[23rem] text-[15px] leading-relaxed text-muted" style={delay(430)}>
              A hybrid thinker — half engineer, half designer. With 2+ years of professional experience delivering purposeful digital products that blend technical precision with emotional resonance.
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
              {/* <span className="inline-flex items-center gap-2 text-fg">
                <Spark className="w-3 h-3 text-sage" />
                Available for freelance
              </span> */}
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 normal-case tracking-normal text-[14px] font-medium text-fg hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sage" />
                {personal.email}
              </a>
            </div>
          </div>

          {/* Middle spacer keeps the portrait clear on desktop */}
          <div className="hidden lg:block" />

          {/* Right: stats */}
          <div className="hero-settle pointer-events-auto flex flex-col lg:mb-16" style={delay(400)}>
            {statList('grid grid-cols-2 gap-x-6 lg:block border-t border-line lg:border-t-0')}
          </div>
        </div>
      </div>
    </section>
  );
}
