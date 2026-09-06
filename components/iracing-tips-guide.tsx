'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  CUP_SETUP_TRACK_TYPES,
  DEFAULT_CUP_SETUP_ID,
  IRACING_CUP_SETUPS,
  IRACING_LADDER,
  IRACING_QUICK_WINS,
  IRACING_TIPS,
  LEVEL_LABELS,
  TIP_CATEGORY_META,
  type CupSetupTrackType,
  type CupTrackSetup,
  type TipCategory,
  type IracingTip,
} from '@/lib/iracing-tips';

const JUMP_LINKS = [
  { id: 'quick-wins', label: 'Quick wins' },
  { id: 'cup-setups', label: 'Cup setups' },
  { id: 'ladder', label: 'Series ladder' },
  { id: 'tip-library', label: 'Tip library' },
  { id: 'race-week', label: 'Race-week plan' },
] as const;

const CATEGORY_FILTERS: Array<{ id: 'all' | TipCategory; label: string }> = [
  { id: 'all', label: 'All tips' },
  { id: 'oval', label: 'Ovals' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'restarts', label: 'Restarts' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'setup', label: 'Setup' },
  { id: 'hardware', label: 'Rig & FOV' },
  { id: 'licenses', label: 'Licenses' },
];

const LEVEL_FILTERS: Array<{ id: 'all' | IracingTip['level']; label: string }> = [
  { id: 'all', label: 'All levels' },
  { id: 'rookie', label: 'Rookie' },
  { id: 'club', label: 'Club' },
  { id: 'pro', label: 'Pro' },
];

function accentText(accent: 'red' | 'cyan' | 'blue' | 'yellow') {
  switch (accent) {
    case 'red':
      return 'text-nascar-red';
    case 'cyan':
      return 'text-strategy-cyan';
    case 'blue':
      return 'text-nascar-blue';
    case 'yellow':
      return 'text-strategy-yellow';
  }
}

function accentBorder(accent: 'red' | 'cyan' | 'blue' | 'yellow') {
  switch (accent) {
    case 'red':
      return 'border-l-nascar-red';
    case 'cyan':
      return 'border-l-strategy-cyan';
    case 'blue':
      return 'border-l-nascar-blue';
    case 'yellow':
      return 'border-l-strategy-yellow';
  }
}

function accentBg(accent: 'red' | 'cyan' | 'blue' | 'yellow') {
  switch (accent) {
    case 'red':
      return 'bg-nascar-red text-white';
    case 'cyan':
      return 'bg-strategy-cyan text-background';
    case 'blue':
      return 'bg-nascar-blue text-white';
    case 'yellow':
      return 'bg-strategy-yellow text-background';
  }
}

function levelTone(level: IracingTip['level']) {
  if (level === 'rookie') return 'bg-muted text-muted-foreground';
  if (level === 'club') return 'bg-nascar-blue/15 text-nascar-blue';
  return 'bg-nascar-red/15 text-nascar-red';
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function IracingTipsGuide() {
  const [category, setCategory] = useState<'all' | TipCategory>('all');
  const [level, setLevel] = useState<'all' | IracingTip['level']>('all');
  const [query, setQuery] = useState('');
  const [setupType, setSetupType] = useState<'all' | CupSetupTrackType>('all');
  const [setupId, setSetupId] = useState(DEFAULT_CUP_SETUP_ID);

  const filteredTips = useMemo(() => {
    const q = query.trim().toLowerCase();
    return IRACING_TIPS.filter((tip) => {
      if (category !== 'all' && tip.category !== category) return false;
      if (level !== 'all' && tip.level !== level) return false;
      if (!q) return true;
      const hay = `${tip.title} ${tip.summary} ${tip.body} ${tip.bullets.join(' ')} ${tip.trackFocus ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [category, level, query]);

  const setupsInType = useMemo(() => {
    if (setupType === 'all') return IRACING_CUP_SETUPS;
    return IRACING_CUP_SETUPS.filter((s) => s.trackType === setupType);
  }, [setupType]);

  const activeSetup: CupTrackSetup = useMemo(() => {
    const found = setupsInType.find((s) => s.id === setupId) ?? IRACING_CUP_SETUPS.find((s) => s.id === setupId);
    return found ?? setupsInType[0] ?? IRACING_CUP_SETUPS[0];
  }, [setupId, setupsInType]);

  console.log('iRacing tips filter', {
    category,
    level,
    query,
    count: filteredTips.length,
    setupType,
    setupId: activeSetup?.id,
    setupCount: IRACING_CUP_SETUPS.length,
  });

  return (
    <div className="bg-background">
      <main>
        {/* Hero — sim-desk energy */}
        <section className="relative overflow-hidden border-b border-border px-3 sm:px-4 py-10 sm:py-14">
          <div className="absolute inset-0 pointer-events-none speed-lines-bg opacity-70" aria-hidden />
          <div
            className="absolute -right-16 -top-20 w-80 h-80 rounded-full blur-3xl opacity-30"
            style={{ background: 'hsl(var(--strategy-cyan) / 0.35)' }}
            aria-hidden
          />
          <div
            className="absolute -left-12 bottom-0 w-72 h-72 rounded-full blur-3xl opacity-25"
            style={{ background: 'hsl(var(--nascar-red) / 0.3)' }}
            aria-hidden
          />

          <div className="relative max-w-5xl mx-auto">
            <p className="font-oswald tracking-[0.25em] text-strategy-cyan text-xs sm:text-sm uppercase mb-2">
              Sim rig school · NASCAR ovals
            </p>
            <h1 className="font-archivo text-4xl sm:text-5xl md:text-7xl tracking-tight text-foreground leading-[0.95] mb-4">
              iRACING{' '}
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-strategy-cyan"
                  style={{ transform: 'skewX(-8deg)', borderRadius: '2px' }}
                />
                <span className="relative text-background px-2 sm:px-3">TIPS</span>
              </span>
            </h1>
            <p className="font-oswald text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Cleaner ovals, smarter traffic, and starter Cup garage boards for every major track type. Built for
              fans who watch on Sunday and race the same tracks online all week.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {[
                { label: `${IRACING_TIPS.length} race tips`, tone: 'bg-strategy-cyan text-background' },
                {
                  label: `${IRACING_CUP_SETUPS.length} Cup setup starters`,
                  tone: 'bg-strategy-yellow text-background',
                },
                { label: 'Oval-first focus', tone: 'bg-nascar-red text-white' },
                { label: 'Rookie → Cup ladder', tone: 'bg-foreground text-background' },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full ${chip.tone}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {JUMP_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="font-oswald text-xs sm:text-sm tracking-widest uppercase px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:border-strategy-cyan hover:text-strategy-cyan transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quick wins */}
        <section
          id="quick-wins"
          className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14 scroll-mt-20"
          aria-labelledby="quick-wins-heading"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="font-oswald text-[11px] tracking-[0.22em] text-strategy-cyan uppercase mb-1">
                Start tonight
              </p>
              <h2
                id="quick-wins-heading"
                className="font-archivo text-2xl sm:text-4xl uppercase tracking-tight text-foreground"
              >
                Four quick wins
              </h2>
            </div>
            <p className="font-oswald text-sm text-muted-foreground max-w-md">
              Do these before you buy another setup pack. Instant cleaner heats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {IRACING_QUICK_WINS.map((win, i) => (
              <article
                key={win.id}
                className="relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 card-lift"
                data-testid={`iracing-quick-win-${win.id}`}
              >
                <span className="font-archivo text-4xl text-strategy-cyan/25 absolute top-2 right-3 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-archivo text-lg uppercase tracking-tight text-foreground mb-2 pr-10 leading-snug">
                  {win.label}
                </h3>
                <p className="font-oswald text-sm text-muted-foreground leading-relaxed">{win.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Cup setup garage */}
        <section
          id="cup-setups"
          className="border-y border-border bg-card/40 scroll-mt-20"
          aria-labelledby="cup-setups-heading"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14">
            <div className="mb-6 sm:mb-8 max-w-3xl">
              <p className="font-oswald text-[11px] tracking-[0.22em] text-strategy-yellow uppercase mb-1">
                Open garage · first clicks
              </p>
              <h2
                id="cup-setups-heading"
                className="font-archivo text-2xl sm:text-4xl uppercase tracking-tight text-foreground"
              >
                Cup series setup starters
              </h2>
              <p className="font-oswald text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                Pick a Cup track, load the iRacing baseline (or your fixed-feeling race file), then use these boards
                as the first direction — brake bias windows, pressure mindset, bars, wedge, gear notes, and what to
                twist if the car is tight or loose. Editorial coaching ranges, not payware magic files. Builds change;
                your notes win.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter Cup setups by track type">
              <button
                type="button"
                onClick={() => {
                  setSetupType('all');
                  console.log('Cup setup type filter', { setupType: 'all' });
                }}
                className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                  setupType === 'all'
                    ? 'bg-strategy-yellow text-background border-strategy-yellow'
                    : 'bg-background text-muted-foreground border-border hover:border-strategy-yellow hover:text-strategy-yellow'
                }`}
              >
                All tracks
              </button>
              {CUP_SETUP_TRACK_TYPES.map((t) => {
                const active = setupType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSetupType(t.id);
                      const first = IRACING_CUP_SETUPS.find((s) => s.trackType === t.id);
                      if (first) setSetupId(first.id);
                      console.log('Cup setup type filter', { setupType: t.id, first: first?.id });
                    }}
                    className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-strategy-yellow text-background border-strategy-yellow'
                        : 'bg-background text-muted-foreground border-border hover:border-strategy-yellow hover:text-strategy-yellow'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div
              className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1"
              role="listbox"
              aria-label="Cup track setup list"
            >
              {setupsInType.map((setup) => {
                const active = activeSetup.id === setup.id;
                return (
                  <button
                    key={setup.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setSetupId(setup.id);
                      console.log('Cup setup selected', setup.id);
                    }}
                    className={`flex-shrink-0 font-oswald text-xs sm:text-sm tracking-wide uppercase px-3 py-2 rounded-lg border transition-colors ${
                      active
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                    }`}
                    data-testid={`cup-setup-chip-${setup.id}`}
                  >
                    {setup.shortName}
                  </button>
                );
              })}
            </div>

            {activeSetup ? (
              <article
                className="rounded-2xl border border-border bg-background overflow-hidden"
                data-testid={`cup-setup-detail-${activeSetup.id}`}
              >
                <div className="border-b border-border p-4 sm:p-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-strategy-yellow text-background">
                        {CUP_SETUP_TRACK_TYPES.find((t) => t.id === activeSetup.trackType)?.label ??
                          activeSetup.trackType}
                      </span>
                      <span className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
                        Next Gen · open starters
                      </span>
                    </div>
                    <h3 className="font-archivo text-2xl sm:text-3xl uppercase tracking-tight text-foreground leading-none">
                      {activeSetup.name}
                    </h3>
                    <p className="font-oswald text-sm sm:text-base text-strategy-cyan mt-2 leading-relaxed max-w-2xl">
                      {activeSetup.goal}
                    </p>
                  </div>
                  <p className="font-oswald text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed lg:text-right">
                    {activeSetup.feel}
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-0">
                  <div className="xl:col-span-3 p-4 sm:p-6 border-b xl:border-b-0 xl:border-r border-border">
                    <p className="font-oswald text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      First-click board
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {activeSetup.knobs.map((knob) => (
                        <div
                          key={`${activeSetup.id}-${knob.label}`}
                          className="rounded-lg border border-border bg-card px-3 py-3"
                        >
                          <p className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
                            {knob.label}
                          </p>
                          <p className="font-archivo text-sm sm:text-base uppercase tracking-tight text-foreground mt-1 leading-snug">
                            {knob.value}
                          </p>
                          {knob.tip ? (
                            <p className="font-oswald text-xs text-muted-foreground mt-1 leading-relaxed">{knob.tip}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-2 p-4 sm:p-6 flex flex-col gap-4">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="font-oswald text-[10px] tracking-widest uppercase text-strategy-yellow mb-1">
                        Qual vs race
                      </p>
                      <p className="font-oswald text-sm text-foreground leading-relaxed">{activeSetup.qualVsRace}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="rounded-xl border border-l-4 border-border border-l-nascar-blue bg-card p-4">
                        <p className="font-oswald text-[10px] tracking-widest uppercase text-nascar-blue mb-1">
                          If tight
                        </p>
                        <p className="font-oswald text-sm text-foreground leading-relaxed">{activeSetup.ifTight}</p>
                      </div>
                      <div className="rounded-xl border border-l-4 border-border border-l-nascar-red bg-card p-4">
                        <p className="font-oswald text-[10px] tracking-widest uppercase text-nascar-red mb-1">
                          If loose
                        </p>
                        <p className="font-oswald text-sm text-foreground leading-relaxed">{activeSetup.ifLoose}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 border-t border-border pt-4">
                      {activeSetup.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 font-oswald text-sm text-foreground/90 leading-relaxed"
                        >
                          <span className="text-strategy-yellow flex-shrink-0" aria-hidden>
                            ▸
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-card/50">
                  <p className="font-oswald text-xs text-muted-foreground leading-relaxed">
                    {IRACING_CUP_SETUPS.length} Cup tracks · start from baseline · change one thing at a time
                  </p>
                  <Link
                    href="/pit-strategy"
                    className="font-oswald text-xs tracking-widest uppercase text-strategy-cyan hover:underline"
                  >
                    Pair with pit strategy calc →
                  </Link>
                </div>
              </article>
            ) : null}
          </div>
        </section>

        {/* Ladder */}
        <section
          id="ladder"
          className="border-y border-border bg-card/40 scroll-mt-20"
          aria-labelledby="ladder-heading"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14">
            <div className="mb-6 sm:mb-8">
              <p className="font-oswald text-[11px] tracking-[0.22em] text-nascar-red uppercase mb-1">
                Climb clean
              </p>
              <h2
                id="ladder-heading"
                className="font-archivo text-2xl sm:text-4xl uppercase tracking-tight text-foreground"
              >
                License & series ladder
              </h2>
              <p className="font-oswald text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                Finish races, protect safety rating, then step up. Skipping rungs is how good car speed turns into
                endless incident points.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {IRACING_LADDER.map((step, index) => (
                <li
                  key={step.id}
                  className="rounded-xl border border-border bg-background p-4 sm:p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-archivo text-2xl text-nascar-red leading-none">{step.tier}</span>
                    <span className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="font-archivo text-lg uppercase tracking-tight text-foreground leading-snug">
                    {step.name}
                  </h3>
                  <p className="font-oswald text-sm text-muted-foreground leading-relaxed flex-1">{step.why}</p>
                  <p className="font-oswald text-xs sm:text-sm text-strategy-cyan border-t border-border pt-3 leading-relaxed">
                    <span className="uppercase tracking-widest text-[10px] text-muted-foreground block mb-1">
                      Coach note
                    </span>
                    {step.tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tip library */}
        <section
          id="tip-library"
          className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14 scroll-mt-20"
          aria-labelledby="tip-library-heading"
        >
          <div className="mb-6">
            <p className="font-oswald text-[11px] tracking-[0.22em] text-nascar-blue uppercase mb-1">
              Playbook
            </p>
            <h2
              id="tip-library-heading"
              className="font-archivo text-2xl sm:text-4xl uppercase tracking-tight text-foreground"
            >
              Tip library
            </h2>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <label className="sr-only" htmlFor="iracing-tip-search">
              Search tips
            </label>
            <input
              id="iracing-tip-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tips — draft, bias, Bristol, FOV…"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 font-oswald text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-strategy-cyan"
            />

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {CATEGORY_FILTERS.map((f) => {
                  const active = category === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCategory(f.id)}
                      className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? 'bg-strategy-cyan text-background border-strategy-cyan'
                          : 'bg-card text-muted-foreground border-border hover:border-strategy-cyan hover:text-strategy-cyan'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by level">
                {LEVEL_FILTERS.map((f) => {
                  const active = level === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setLevel(f.id)}
                      className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="font-oswald text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Showing {filteredTips.length} tip{filteredTips.length === 1 ? '' : 's'}
          </p>

          {filteredTips.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <p className="font-oswald text-muted-foreground">No tips match that filter. Clear search or pick All.</p>
              <button
                type="button"
                className="mt-3 font-oswald text-sm uppercase tracking-widest text-strategy-cyan hover:underline"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                  setLevel('all');
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {filteredTips.map((tip) => {
                const meta = TIP_CATEGORY_META[tip.category];
                return (
                  <article
                    key={tip.id}
                    data-testid={`iracing-tip-${tip.id}`}
                    className={`rounded-xl border border-border border-l-4 ${accentBorder(meta.accent)} bg-card p-4 sm:p-5 flex flex-col gap-3`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded ${accentBg(meta.accent)}`}
                      >
                        {meta.short}
                      </span>
                      <span
                        className={`font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded ${levelTone(tip.level)}`}
                      >
                        {LEVEL_LABELS[tip.level]}
                      </span>
                      {tip.trackFocus ? (
                        <span className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
                          {tip.trackFocus}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="font-archivo text-xl uppercase tracking-tight text-foreground leading-snug">
                      {tip.title}
                    </h3>
                    <p className={`font-oswald text-sm ${accentText(meta.accent)} leading-relaxed`}>
                      {tip.summary}
                    </p>
                    <p className="font-oswald text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
                    <ul className="space-y-2 border-t border-border pt-3">
                      {tip.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 font-oswald text-sm text-foreground/90 leading-relaxed">
                          <span className={`${accentText(meta.accent)} flex-shrink-0`} aria-hidden>
                            ▸
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Race week plan */}
        <section
          id="race-week"
          className="border-t border-border scroll-mt-20"
          aria-labelledby="race-week-heading"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <div className="absolute inset-0 speed-lines-bg opacity-40 pointer-events-none" aria-hidden />
              <div
                className="absolute inset-y-0 right-0 w-1/2 opacity-30 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, hsl(var(--strategy-cyan) / 0.2), hsl(var(--nascar-red) / 0.15))',
                }}
                aria-hidden
              />

              <div className="relative p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="font-oswald text-[11px] tracking-[0.22em] text-strategy-yellow uppercase mb-2">
                    Template
                  </p>
                  <h2
                    id="race-week-heading"
                    className="font-archivo text-2xl sm:text-4xl uppercase tracking-tight text-foreground mb-3"
                  >
                    Race-week practice plan
                  </h2>
                  <p className="font-oswald text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                    Mirror the real Cup weekend so your sim nights build the same habits as Sunday fans study on TV.
                  </p>
                  <ol className="space-y-3">
                    {[
                      { day: 'Mon–Tue', item: 'Open test. Find markers. 20 clean laps. Note push/loose.' },
                      { day: 'Wed', item: 'Race a lower-split official or hosted for traffic mileage only.' },
                      { day: 'Thu–Fri', item: 'Long runs + pit exit practice. Time a full green stint.' },
                      { day: 'Sat', item: 'Full official. SR first. Review one wreck replay max.' },
                      { day: 'Sun', item: 'Watch the real race. Steal lines, restart choices, pit calls.' },
                    ].map((row) => (
                      <li key={row.day} className="flex gap-3 items-start">
                        <span className="font-archivo text-sm text-strategy-cyan w-16 flex-shrink-0 uppercase">
                          {row.day}
                        </span>
                        <span className="font-oswald text-sm text-foreground leading-relaxed">{row.item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-background/80 p-5 sm:p-6">
                  <div>
                    <h3 className="font-archivo text-xl uppercase tracking-tight text-foreground mb-2">
                      Cross-train with our tools
                    </h3>
                    <p className="font-oswald text-sm text-muted-foreground leading-relaxed mb-4">
                      Use the same strategy language from broadcast night when you sit in the rig.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      <Link
                        href="/pit-strategy"
                        className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-4 py-3 rounded-lg bg-strategy-cyan text-background hover:opacity-90 transition-opacity"
                      >
                        Pit strategy calc →
                      </Link>
                      <Link
                        href="/track-types"
                        className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-4 py-3 rounded-lg border border-border bg-card text-foreground hover:border-nascar-blue hover:text-nascar-blue transition-colors"
                      >
                        Track types
                      </Link>
                      <Link
                        href="/#last-race"
                        className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-4 py-3 rounded-lg border border-border bg-card text-foreground hover:border-nascar-red hover:text-nascar-red transition-colors"
                      >
                        Last race debrief
                      </Link>
                    </div>
                  </div>
                  <p className="font-oswald text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
                    Not affiliated with iRacing.com or NASCAR. Tips are fan coaching notes for cleaner, smarter
                    online oval racing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
