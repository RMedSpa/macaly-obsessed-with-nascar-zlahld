"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    twttr?: { widgets?: { load: () => void } };
  }
}

const ACCOUNT_CATEGORIES = [
  {
    label: '🏁 Official',
    accounts: [
      { handle: 'NASCAR', name: 'NASCAR', desc: 'Official NASCAR account' },
      { handle: 'NASCAR_Xfinity', name: "NASCAR O'Reilly", desc: "O'Reilly Auto Parts Series" },
      { handle: 'NASCAR_Trucks', name: 'NASCAR Trucks', desc: 'Craftsman Truck Series' },
      { handle: 'ARCARacing', name: 'ARCA Racing', desc: 'ARCA Menards Series' },
      { handle: 'NASCAR_PR', name: 'NASCAR PR', desc: 'Official press releases' },
      { handle: 'NASCARHall', name: 'NASCAR Hall of Fame', desc: 'Racing legends & history' },
    ],
  },
  {
    label: '🏎️ Drivers',
    accounts: [
      { handle: 'DaleJr', name: 'Dale Earnhardt Jr.', desc: 'Legend & NASCAR ambassador' },
      { handle: 'KyleLarsonRacin', name: 'Kyle Larson', desc: '#5 Hendrick Motorsports' },
      { handle: 'ChaseElliott', name: 'Chase Elliott', desc: '#9 Hendrick Motorsports' },
      { handle: 'William_Byron', name: 'William Byron', desc: '#24 Hendrick Motorsports' },
      { handle: 'RyanBlaney', name: 'Ryan Blaney', desc: '#12 Team Penske — Champion' },
      { handle: 'joeylogano', name: 'Joey Logano', desc: '#22 Team Penske' },
      { handle: 'dennyhamlin', name: 'Denny Hamlin', desc: '#11 Joe Gibbs Racing' },
      { handle: 'KyleBusch', name: 'Kyle Busch', desc: 'Legend · 2× Cup champion' },
      { handle: 'TylerReddick', name: 'Tyler Reddick', desc: '#45 23XI Racing' },
      { handle: 'BubbaWallace', name: 'Bubba Wallace', desc: '#23 23XI Racing' },
      { handle: 'ChristopherBell', name: 'Christopher Bell', desc: '#20 Joe Gibbs Racing' },
      { handle: 'corey_lajoie', name: 'Corey LaJoie', desc: 'NASCAR driver & podcaster' },
    ],
  },
  {
    label: '🔧 Teams',
    accounts: [
      { handle: 'HendrickMotorsports', name: 'Hendrick Motorsports', desc: 'Most successful Cup team' },
      { handle: 'TeamPenske', name: 'Team Penske', desc: "The Captain's team" },
      { handle: 'JoeGibbsRacing', name: 'Joe Gibbs Racing', desc: "JGR Cup & O'Reilly" },
      { handle: '23XIRacing', name: '23XI Racing', desc: 'Hamlin & MJ ownership' },
      { handle: 'RCRracing', name: 'RCR Racing', desc: 'Richard Childress Racing' },
      { handle: 'FrontRowMotorsports', name: 'Front Row Motorsports', desc: 'Independent power' },
      { handle: 'TRDMotorsports', name: 'TRD Motorsports', desc: 'Toyota Racing Development' },
      { handle: 'Team_Chevy', name: 'Team Chevrolet', desc: 'Chevy in NASCAR' },
      { handle: 'FordPerformance', name: 'Ford Performance', desc: 'Ford in NASCAR' },
    ],
  },
  {
    label: '📺 Media',
    accounts: [
      { handle: 'NASCAR_MRN', name: 'MRN Radio', desc: 'Voice of NASCAR radio' },
      { handle: 'NASCARonNBC', name: 'NASCAR on NBC', desc: 'NBC/Peacock coverage' },
      { handle: 'NASCARonFOX', name: 'NASCAR on FOX', desc: 'FOX & FS1 coverage' },
      { handle: 'NASCARTalk', name: 'NASCAR Talk', desc: 'NBC Sports NASCAR news' },
      { handle: 'jayski', name: 'Jayski', desc: "NASCAR's rumor mill" },
      { handle: 'motorsport', name: 'Motorsport.com', desc: 'Global motorsport news' },
    ],
  },
  {
    label: '🏟️ Tracks',
    accounts: [
      { handle: 'DISupdates', name: 'Daytona Intl Speedway', desc: 'Home of the Daytona 500' },
      { handle: 'TalladegaSuperSL', name: 'Talladega Superspeedway', desc: 'The Big One awaits' },
      { handle: 'BMSupdates', name: 'Bristol Motor Speedway', desc: "The World's Fastest Half Mile" },
      { handle: 'CLTMotorSpdwy', name: 'Charlotte Motor Speedway', desc: 'NASCAR hometown track' },
      { handle: 'MartinsvilleSwy', name: 'Martinsville Speedway', desc: 'Oldest NASCAR track' },
      { handle: 'NHMS', name: 'New Hampshire Motor Speedway', desc: 'The Magic Mile · Loudon' },
    ],
  },
];

function loadTwitterWidgets() {
  if (typeof window === 'undefined') return;
  if (window.twttr?.widgets) {
    window.twttr.widgets.load();
    return;
  }
  if (document.querySelector('script[data-nascar-twitter="1"]')) return;

  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.charset = 'utf-8';
  script.dataset.nascarTwitter = '1';
  script.onload = () => {
    console.log('Twitter widget script loaded (deferred until social section visible)');
    window.twttr?.widgets?.load();
  };
  document.body.appendChild(script);
}

export default function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [timelineReady, setTimelineReady] = useState(false);

  // Defer third-party X widgets until the section is near the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(() => {
        loadTwitterWidgets();
        setTimelineReady(true);
      }, 3000);
      return () => window.clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          console.log('SocialFeed: section near viewport — loading widgets');
          loadTwitterWidgets();
          setTimelineReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentAccounts = ACCOUNT_CATEGORIES[activeCategory].accounts;

  return (
    <section
      id="social"
      ref={sectionRef}
      className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-bebas text-xl sm:text-3xl tracking-wider sm:tracking-widest text-foreground text-center">
          𝕏 NASCAR ON SOCIAL
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Left: Main @NASCAR timeline */}
        <div className="lg:col-span-2 bg-card border border-border rounded-md overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4 border-b border-border flex-shrink-0">
            <span className="font-bebas text-base sm:text-xl tracking-wider text-foreground">
              @NASCAR — LIVE FEED
            </span>
            <Link
              href="https://twitter.com/NASCAR"
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow text-[11px] sm:text-xs text-nascar-red hover:opacity-80 transition-opacity whitespace-nowrap flex-shrink-0"
            >
              FOLLOW →
            </Link>
          </div>
          <div className="p-2 sm:p-4 flex-1 overflow-x-auto min-h-[420px]">
            {timelineReady ? (
              <a
                className="twitter-timeline"
                data-theme="dark"
                data-height="420"
                data-dnt="true"
                data-tweet-limit="8"
                href="https://twitter.com/NASCAR"
              >
                Loading @NASCAR feed...
              </a>
            ) : (
              <div className="h-[420px] rounded bg-muted/40 animate-pulse flex items-center justify-center">
                <p className="font-oswald text-xs tracking-widest uppercase text-muted-foreground">
                  Scroll to load @NASCAR feed
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Account directory */}
        <div className="flex flex-col gap-0 bg-card border border-border rounded-md overflow-hidden">
          {/* Directory header */}
          <div className="px-5 py-4 border-b border-border">
            <p className="font-bebas text-lg tracking-wider text-foreground">
              WHO TO FOLLOW
            </p>
            <p className="font-barlow text-xs text-muted-foreground mt-1">
              The best NASCAR accounts on 𝕏
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex overflow-x-auto border-b border-border scrollbar-none">
            {ACCOUNT_CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`flex-shrink-0 px-3 py-2 font-bebas text-xs tracking-wider transition-colors whitespace-nowrap border-b-2 ${
                  activeCategory === i
                    ? 'text-nascar-red border-nascar-red'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Account list */}
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            {currentAccounts.map((acct) => (
              <Link
                key={acct.handle}
                href={`https://twitter.com/${acct.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 border-b border-border/50 hover:bg-secondary/40 transition-colors group"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bebas tracking-wider text-sm text-foreground group-hover:text-nascar-red transition-colors truncate">
                    {acct.name}
                  </p>
                  <p className="font-barlow text-xs text-muted-foreground">
                    @{acct.handle}
                  </p>
                  <p className="font-barlow text-xs text-muted-foreground/70 truncate">
                    {acct.desc}
                  </p>
                </div>
                <span className="flex-shrink-0 text-muted-foreground group-hover:text-nascar-red transition-colors font-bold">
                  𝕏
                </span>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-4 py-3 border-t border-border mt-auto">
            <Link
              href="https://twitter.com/search?q=%23NASCAR"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-bebas tracking-widest text-sm text-nascar-red hover:opacity-80 transition-opacity"
            >
              EXPLORE #NASCAR ON 𝕏 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
