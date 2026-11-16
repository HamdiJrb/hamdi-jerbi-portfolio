import React from 'react';
import { Sparkles, Compass, Check } from 'lucide-react';

// How AI fits into the work. The hero's "AI is on the team" card scrolls here.
const HANDED_TO_AI = [
  'First drafts & quick variations',
  'Boilerplate code & repetitive tasks',
  'Exploring options fast',
  'Copy and asset iterations',
];

const KEPT_BY_ME = [
  'User research & the real problem',
  'UX flows, hierarchy & decisions',
  'The visual identity & every detail',
  'The final call on what ships',
];

const kicker = 'text-[11px] font-semibold uppercase tracking-[0.2em]';

function Column({ Icon, title, note, items, accent }) {
  const [first, second] = note;
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-1 ${
        accent
          ? 'bg-sage/10 border-sage/40 hover:border-sage/70 hover:shadow-[0_20px_50px_-20px_rgb(var(--sage)/0.45)]'
          : 'bg-fg/[0.03] border-line hover:border-fg/20 hover:shadow-[0_20px_50px_-24px_rgb(0_0_0/0.35)]'
      }`}
    >
      {/* Soft glow in the corner */}
      <div
        aria-hidden="true"
        className={`absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
          accent ? 'bg-sage/25' : 'bg-fg/[0.06]'
        }`}
      />

      <div className="relative">
        {/* Label: icon tile + small caps title */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${
              accent ? 'bg-sage text-on-primary border-sage' : 'bg-ground text-fg border-line'
            }`}
          >
            <Icon className="w-4 h-4" />
          </span>
          <h3 className={`${kicker} ${accent ? 'text-sage' : 'text-muted'}`}>{title}</h3>
        </div>

        {/* The role, as a headline */}
        <p className="mt-6 font-heading font-bold tracking-tight leading-[1.05] text-3xl sm:text-4xl text-fg">
          {first}{' '}
          <span className={accent ? 'text-sage' : 'text-muted'}>&amp; {second}</span>
        </p>

        <div className={`my-6 h-px ${accent ? 'bg-sage/30' : 'bg-line'}`} />
      </div>

      <ul className="relative space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] text-fg">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent ? 'text-sage' : 'text-muted'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AiDirection() {
  return (
    <section id="ai" className="relative py-20 md:py-24 bg-ground scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-borderLight dark:via-borderDark to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className={`${kicker} text-sage mb-5 inline-flex items-center gap-2`}>
          <Sparkles className="w-3.5 h-3.5" />
          On working with AI
        </p>

        <h2 className="font-heading font-bold tracking-tight text-fg leading-[1.02] text-4xl sm:text-5xl md:text-6xl max-w-4xl">
          AI is on the team.{' '}
          <span className="text-muted">I&apos;m still the art director.</span>
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-6 md:gap-12 max-w-5xl">
          <p className="text-base sm:text-lg leading-relaxed text-muted">
            Left on its own, AI produces the average of everything it has seen: the same hero,
            the same cards, the same gradients. It looks fine, it feels like everything else,
            and the UX rarely holds up once real users arrive.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-muted">
            So I use it the way a director uses a fast, tireless crew. It speeds up the work;
            the research, the decisions and the taste stay with me.{' '}
            <span className="text-fg font-medium">Nothing ships until it feels right to a human.</span>
          </p>
        </div>

        <div className="relative mt-12 grid md:grid-cols-2 gap-4">
          <Column
            Icon={Sparkles}
            title="Handed to AI"
            note={['Speed', 'volume']}
            items={HANDED_TO_AI}
          />
          <Column
            Icon={Compass}
            title="Kept by me"
            note={['Judgement', 'craft']}
            items={KEPT_BY_ME}
            accent
          />

          {/* "+" badge joining the two cards (desktop) */}
          <span
            aria-hidden="true"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-ground border border-line text-sage font-heading text-xl font-bold shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)]"
          >
            +
          </span>
        </div>
      </div>
    </section>
  );
}
