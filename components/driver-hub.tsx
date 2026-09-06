'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Top10CupDrivers from '@/components/top10-cup-drivers';
import NascarLegends from '@/components/nascar-legends';

interface Driver {
  name: string;
  number: string;
  team: string;
  twitter?: string;
  series: 'cup' | 'xfinity' | 'truck' | 'arca' | 'legend';
  profileHref?: string;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const NASCAR_DRIVERS: Driver[] = [
  // Cup Series
  { name: 'Kyle Larson', number: '5', team: 'Hendrick Motorsports', twitter: 'KyleLarsonRacin', series: 'cup', profileHref: '/drivers/kyle-larson' },
  { name: 'Chase Elliott', number: '9', team: 'Hendrick Motorsports', twitter: 'ChaseElliott', series: 'cup', profileHref: '/drivers/chase-elliott' },
  { name: 'William Byron', number: '24', team: 'Hendrick Motorsports', twitter: 'William_Byron', series: 'cup' },
  { name: 'Alex Bowman', number: '48', team: 'Hendrick Motorsports', twitter: 'AlexBowman88', series: 'cup' },
  { name: 'Ryan Blaney', number: '12', team: 'Team Penske', twitter: 'RyanBlaney', series: 'cup', profileHref: '/drivers/ryan-blaney' },
  { name: 'Joey Logano', number: '22', team: 'Team Penske', twitter: 'joeylogano', series: 'cup', profileHref: '/drivers/joey-logano' },
  { name: 'Austin Cindric', number: '2', team: 'Team Penske', twitter: 'AustinCindric', series: 'cup' },
  { name: 'Denny Hamlin', number: '11', team: 'Joe Gibbs Racing', twitter: 'dennyhamlin', series: 'cup', profileHref: '/drivers/denny-hamlin' },
  { name: 'Martin Truex Jr.', number: '19', team: 'Joe Gibbs Racing', twitter: 'MartinTruex_Jr', series: 'cup' },
  { name: 'Christopher Bell', number: '20', team: 'Joe Gibbs Racing', twitter: 'ChristopherBell', series: 'cup', profileHref: '/drivers/christopher-bell' },
  { name: 'Ty Gibbs', number: '54', team: 'Joe Gibbs Racing', twitter: 'TyGibbs', series: 'cup', profileHref: '/drivers/ty-gibbs' },
  { name: 'Chase Briscoe', number: '19', team: 'Joe Gibbs Racing', twitter: 'chasebriscoe', series: 'cup', profileHref: '/drivers/chase-briscoe' },

  { name: 'Austin Dillon', number: '3', team: 'Richard Childress Racing', twitter: 'AustinDillon3', series: 'cup' },
  { name: 'Tyler Reddick', number: '45', team: '23XI Racing', twitter: 'TylerReddick', series: 'cup', profileHref: '/drivers/tyler-reddick' },
  { name: 'Bubba Wallace', number: '23', team: '23XI Racing', twitter: 'BubbaWallace', series: 'cup', profileHref: '/drivers/bubba-wallace' },
  { name: 'Brad Keselowski', number: '6', team: 'RFK Racing', twitter: 'keselowski', series: 'cup' },
  { name: 'Chris Buescher', number: '17', team: 'RFK Racing', twitter: 'Chris_Buescher', series: 'cup', profileHref: '/drivers/chris-buescher' },
  { name: 'Michael McDowell', number: '34', team: 'Front Row Motorsports', twitter: 'Mc_Driver', series: 'cup' },
  { name: 'Corey LaJoie', number: '7', team: 'Spire Motorsports', twitter: 'CoreyLaJoie', series: 'cup' },
  { name: 'Ross Chastain', number: '1', team: 'Trackhouse Racing', twitter: 'RossChastain', series: 'cup' },
  { name: 'Daniel Suarez', number: '99', team: 'Trackhouse Racing', twitter: 'Daniel_SuarezG', series: 'cup' },
  { name: 'Connor Zilisch', number: '88', team: 'Trackhouse Racing', twitter: 'ConnorZilisch', series: 'cup' },

  // O'Reilly Auto Parts Series (expanded 2026 grid)
  { name: 'Justin Allgaier', number: '7', team: 'JR Motorsports', twitter: 'justinallgaier', series: 'xfinity' },
  { name: 'Carson Kvapil', number: '1', team: 'JR Motorsports', twitter: 'CarsonKvapil', series: 'xfinity' },
  { name: 'Sammy Smith', number: '8', team: 'JR Motorsports', twitter: 'SammySmith_18', series: 'xfinity' },
  { name: 'Connor Zilisch', number: '88', team: 'JR Motorsports', twitter: 'ConnorZilisch', series: 'xfinity' },
  { name: 'Sheldon Creed', number: '00', team: 'Haas Factory Team', twitter: 'SheldonCreed', series: 'xfinity' },
  { name: 'Sam Mayer', number: '41', team: 'Haas Factory Team', twitter: 'sammayer', series: 'xfinity' },
  { name: 'Cole Custer', number: '0', team: 'Haas Factory Team', twitter: 'ColeCuster', series: 'xfinity' },
  { name: 'Jesse Love', number: '2', team: 'Richard Childress Racing', twitter: 'Jesse_Love2', series: 'xfinity' },
  { name: 'Austin Hill', number: '21', team: 'Richard Childress Racing', twitter: 'austinhill33', series: 'xfinity' },
  { name: 'Brandon Jones', number: '20', team: 'Joe Gibbs Racing', twitter: 'BrandonJones19', series: 'xfinity' },
  { name: 'Taylor Gray', number: '54', team: 'Joe Gibbs Racing', twitter: 'TaylorGray54', series: 'xfinity' },
  { name: 'Corey Day', number: '17', team: 'Hendrick Motorsports', twitter: 'CoreyDay17', series: 'xfinity' },
  { name: 'Parker Retzlaff', number: '4', team: 'Alpha Prime Racing', twitter: 'PRetzlaff', series: 'xfinity' },
  { name: 'Nick Sanchez', number: '25', team: 'AM Racing', twitter: 'NickSanchez_6', series: 'xfinity' },
  { name: 'Ryan Sieg', number: '39', team: 'RSS Racing', twitter: 'Ryan_Sieg', series: 'xfinity' },
  { name: 'Daniel Dye', number: '10', team: 'Kaulig Racing', twitter: 'DanielDye_39', series: 'xfinity' },
  { name: 'Christian Eckes', number: '16', team: 'Kaulig Racing', twitter: 'CEckes19', series: 'xfinity' },
  { name: 'Jeb Burton', number: '27', team: 'Jordan Anderson Racing', twitter: 'JebBurton', series: 'xfinity' },
  { name: 'Brennan Poole', number: '44', team: 'Alpha Prime Racing', twitter: 'BrennanPoole', series: 'xfinity' },
  { name: 'Josh Williams', number: '11', team: 'Kaulig Racing', twitter: 'joshwilliamsxyz', series: 'xfinity' },
  { name: 'Anthony Alfredo', number: '5', team: "Our Motorsports", twitter: 'AnthonyAlfredo', series: 'xfinity' },
  { name: 'Blaine Perkins', number: '31', team: 'Jordan Anderson Racing', twitter: 'BlainePerkins31', series: 'xfinity' },

  // Craftsman Truck Series (expanded 2026 grid)
  { name: 'Layne Riggs', number: '34', team: 'Front Row Motorsports', twitter: 'layneriggs', series: 'truck' },
  { name: 'Kaden Honeycutt', number: '11', team: 'TRICON Garage', twitter: 'KadenHoneycutt', series: 'truck' },
  { name: 'Chandler Smith', number: '38', team: 'Front Row Motorsports', twitter: 'ChandlerSmith', series: 'truck' },
  { name: 'Corey Heim', number: '5', team: 'TRICON Garage', twitter: 'Corey_Heim', series: 'truck' },
  { name: 'Gio Ruggiero', number: '17', team: 'TRICON Garage', twitter: 'GioRuggiero17', series: 'truck' },
  { name: 'Christian Eckes', number: '91', team: 'McAnally-Hilgemann Racing', twitter: 'CEckes19', series: 'truck' },
  { name: 'Daniel Hemric', number: '19', team: 'McAnally-Hilgemann Racing', twitter: 'DanielHemric', series: 'truck' },
  { name: 'Tyler Ankrum', number: '18', team: 'McAnally-Hilgemann Racing', twitter: 'TylerAnkrum', series: 'truck' },
  { name: 'Ty Majeski', number: '98', team: 'ThorSport Racing', twitter: 'tymajeski', series: 'truck' },
  { name: 'Ben Rhodes', number: '99', team: 'ThorSport Racing', twitter: 'benrhodes', series: 'truck' },
  { name: 'Grant Enfinger', number: '9', team: 'CR7 Motorsports', twitter: 'GrantEnfinger', series: 'truck' },
  { name: 'Matt Crafton', number: '88', team: 'ThorSport Racing', twitter: 'MattCrafton', series: 'truck' },
  { name: 'Stewart Friesen', number: '52', team: 'Halmar Friesen Racing', twitter: 'Stewart_Friesen', series: 'truck' },
  { name: 'Jake Garcia', number: '13', team: 'ThorSport Racing', twitter: 'JakeGarcia13', series: 'truck' },
  { name: 'Tanner Gray', number: '15', team: 'TRICON Garage', twitter: 'TannerGray15', series: 'truck' },
  { name: 'Rajah Caruth', number: '71', team: 'Spire Motorsports', twitter: 'RajahCaruth', series: 'truck' },
  { name: 'Dean Thompson', number: '5', team: 'TRICON Garage', twitter: 'DeanThompson5', series: 'truck' },
  { name: 'Connor Mosack', number: '7', team: 'Spire Motorsports', twitter: 'ConnorMosack', series: 'truck' },
  { name: 'Andres Perez de Lara', number: '77', team: 'Spire Motorsports', twitter: 'andresperez77', series: 'truck' },
  { name: 'Bayley Currey', number: '45', team: 'Niece Motorsports', twitter: 'BayleyCurrey', series: 'truck' },

  // NASCAR Legends
  { name: 'Richard Petty', number: '43', team: 'NASCAR Legend · 200 Cup wins', twitter: 'KingPetty', series: 'legend' },
  { name: 'Dale Earnhardt', number: '3', team: 'NASCAR Legend · 7× Cup champion', series: 'legend', profileHref: '/drivers/dale-earnhardt' },
  { name: 'Kyle Busch', number: '8', team: 'NASCAR Legend · 2× Cup champion', twitter: 'KyleBusch', series: 'legend', profileHref: '/drivers/kyle-busch' },
  { name: 'Dale Earnhardt Jr.', number: '88', team: 'NASCAR Legend', twitter: 'DaleJr', series: 'legend' },
  { name: 'Jeff Gordon', number: '24', team: 'NASCAR Legend · 4× Cup champion', twitter: 'JeffGordonWeb', series: 'legend' },
  { name: 'Jimmie Johnson', number: '48', team: 'NASCAR Legend · 7× Cup champion', twitter: 'JimmieJohnson', series: 'legend' },
  { name: 'Tony Stewart', number: '14', team: 'NASCAR Legend · 3× Cup champion', twitter: 'TonyStewart', series: 'legend' },
  { name: 'David Pearson', number: '21', team: 'NASCAR Legend · 105 Cup wins', series: 'legend' },
  { name: 'Cale Yarborough', number: '11', team: 'NASCAR Legend · 3× Cup champion', series: 'legend' },
  { name: 'Bobby Allison', number: '22', team: 'NASCAR Legend · 85 Cup wins', series: 'legend' },
  { name: 'Darrell Waltrip', number: '17', team: 'NASCAR Legend · 3× Cup champion', twitter: 'DWBible', series: 'legend' },
  { name: 'Bill Elliott', number: '9', team: 'NASCAR Legend · Awesome Bill', twitter: 'Bill_Elliott', series: 'legend' },
  { name: 'Rusty Wallace', number: '2', team: 'NASCAR Legend · 1989 champion', twitter: 'RustyWallace', series: 'legend' },
  { name: 'Mark Martin', number: '6', team: 'NASCAR Legend', twitter: 'MarkMartin', series: 'legend' },
  { name: 'Terry Labonte', number: '5', team: 'NASCAR Legend · 2× Cup champion', series: 'legend' },
  { name: 'Bobby Labonte', number: '18', team: 'NASCAR Legend · 2000 champion', twitter: 'Bobby_Labonte', series: 'legend' },
  { name: 'Kurt Busch', number: '97', team: 'NASCAR Legend · 2004 champion', twitter: 'KurtBusch', series: 'legend' },
  { name: 'Kevin Harvick', number: '4', team: 'NASCAR Legend · 2014 champion', twitter: 'KevinHarvick', series: 'legend' },
  { name: 'Carl Edwards', number: '99', team: 'NASCAR Legend', twitter: 'CarlEdwards', series: 'legend' },
  { name: 'Kasey Kahne', number: '5', team: 'NASCAR Legend', twitter: 'kaseykahne', series: 'legend' },
  { name: 'Jeff Burton', number: '31', team: 'NASCAR Legend', twitter: 'JeffBurton', series: 'legend' },
];

const SERIES_LABELS: Record<Driver['series'], string> = {
  cup: 'CUP',
  xfinity: "O'REILLY",
  truck: 'TRUCK',
  arca: 'ARCA',
  legend: 'LEGEND',
};

const SERIES_CLASSES: Record<Driver['series'], string> = {
  cup: 'text-series-cup border-series-cup',
  xfinity: 'text-series-xfinity border-series-xfinity',
  truck: 'text-series-truck border-series-truck',
  arca: 'text-series-arca border-series-arca',
  legend: 'text-nascar-yellow border-nascar-yellow',
};

const SERIES_BG: Record<Driver['series'], string> = {
  cup: 'bg-series-cup/10',
  xfinity: 'bg-series-xfinity/10',
  truck: 'bg-series-truck/10',
  arca: 'bg-series-arca/10',
  legend: 'bg-nascar-yellow/10',
};

type SeriesFilter = 'all' | Driver['series'];

export default function DriverHub() {
  const [search, setSearch] = useState('');
  const [seriesFilter, setSeriesFilter] = useState<SeriesFilter>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [twitterLoaded, setTwitterLoaded] = useState(false);

  const filteredDrivers = NASCAR_DRIVERS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.team.toLowerCase().includes(search.toLowerCase()) ||
      d.number.includes(search);
    const matchSeries = seriesFilter === 'all' || d.series === seriesFilter;
    return matchSearch && matchSeries;
  });

  const fetchDriverNews = useCallback(async (driver: Driver) => {
    setNewsLoading(true);
    setNews([]);
    console.log(`Fetching news for driver: ${driver.name}`);
    try {
      const res = await fetch(`/api/driver-news?driver=${encodeURIComponent(driver.name)}`);
      const data = await res.json();
      setNews(data.items || []);
    } catch (err) {
      console.error('Failed to fetch driver news:', err);
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedDriver) return;
    fetchDriverNews(selectedDriver);
  }, [selectedDriver, fetchDriverNews]);

  // Load Twitter widget when driver with twitter is selected
  useEffect(() => {
    if (!selectedDriver?.twitter) {
      setTwitterLoaded(false);
      return;
    }
    setTwitterLoaded(false);
    const loadWidget = () => {
      if ((window as unknown as { twttr?: { widgets?: { load: () => void } } }).twttr?.widgets) {
        (window as unknown as { twttr: { widgets: { load: () => void } } }).twttr.widgets.load();
        setTwitterLoaded(true);
      }
    };
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (existingScript) {
      setTimeout(loadWidget, 300);
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => { loadWidget(); setTwitterLoaded(true); };
      document.body.appendChild(script);
    }
  }, [selectedDriver]);

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    // Scroll to hub section smoothly
    setTimeout(() => {
      document.getElementById('driver-hub-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const youtubeSearchUrl = (driver: Driver) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(driver.name + ' NASCAR')}`;

  const twitterSearchUrl = (driver: Driver) =>
    `https://twitter.com/search?q=${encodeURIComponent(driver.name + ' NASCAR')}&src=typed_query&f=live`;

  return (
    <main className="bg-background">
      {/* Hero header */}
      <section className="relative py-8 sm:py-12 px-3 sm:px-4 overflow-hidden border-b border-border">
        {/* Speed lines background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-0 h-px opacity-10"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, transparent, #E8001C, transparent)',
                transform: `translateY(${(i - 2) * 14}px)`,
              }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto relative">
          <p className="font-bebas tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground text-xs sm:text-sm mb-1">
            OBSESSED WITH NASCAR
          </p>
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-foreground tracking-tight mb-3">
            FIND YOUR{' '}
            <span className="relative inline-block">
              <span
                className="absolute inset-0 bg-nascar-red"
                style={{ transform: 'skewX(-8deg)', borderRadius: '2px' }}
              />
              <span className="relative text-white px-2 sm:px-3">DRIVER</span>
            </span>
          </h1>
          <p className="font-barlow text-muted-foreground text-base sm:text-lg">
            Select a driver to get their latest news, videos, and social posts all in one place.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-12 sm:top-14 z-40 bg-black/95 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, team, or car #…"
              className="w-full bg-secondary border border-border rounded pl-8 pr-3 py-2 text-sm font-barlow text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-nascar-red transition-colors"
            />
          </div>
          {/* Series filter pills */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'cup', 'xfinity', 'truck', 'legend'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSeriesFilter(s);
                  if (s === 'legend') {
                    setTimeout(() => {
                      document.getElementById('nascar-legends')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }
                }}
                className={`font-bebas tracking-wider text-xs px-3 py-1.5 rounded border transition-colors ${
                  seriesFilter === s
                    ? 'bg-nascar-red border-nascar-red text-white'
                    : 'border-border text-muted-foreground hover:border-nascar-red hover:text-foreground'
                }`}
              >
                {s === 'all' ? 'ALL DRIVERS' : SERIES_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Top10CupDrivers />

      <NascarLegends />

      {/* Driver Grid */}
      <section className="px-3 sm:px-4 py-6 sm:py-8 max-w-5xl mx-auto">
        {filteredDrivers.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-bebas text-3xl text-muted-foreground">NO DRIVERS FOUND</p>
            <p className="font-barlow text-muted-foreground mt-2">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredDrivers.map((driver) => {
              const driverKey = `${driver.series}-${driver.number}-${driver.name}`;
              const isSelected =
                selectedDriver?.name === driver.name &&
                selectedDriver.series === driver.series &&
                selectedDriver.number === driver.number;
              return (
              <button
                key={driverKey}
                onClick={() => handleSelectDriver(driver)}
                className={`relative group text-left p-3 sm:p-4 rounded-lg border transition-all overflow-hidden min-h-[108px] ${
                  isSelected
                    ? `${SERIES_BG[driver.series]} border-current ${SERIES_CLASSES[driver.series].split(' ')[0]}`
                    : 'bg-card border-border hover:border-nascar-red/50'
                }`}
              >
                {/* Big watermark number */}
                <div
                  className="absolute -right-2 -bottom-3 font-bebas leading-none select-none pointer-events-none opacity-10 group-hover:opacity-15 transition-opacity"
                  style={{ fontSize: '72px', color: 'currentColor' }}
                  aria-hidden="true"
                >
                  {driver.number}
                </div>

                {/* Series badge */}
                <span
                  className={`inline-block font-bebas tracking-wider text-[10px] px-1.5 py-0.5 rounded border mb-2 ${SERIES_CLASSES[driver.series]}`}
                >
                  {SERIES_LABELS[driver.series]}
                </span>

                {/* Car number */}
                <div className={`font-bebas text-2xl leading-none mb-1 ${SERIES_CLASSES[driver.series].split(' ')[0]}`}>
                  #{driver.number}
                </div>

                {/* Name */}
                <div className="font-bebas text-base leading-tight text-foreground">
                  {driver.name}
                </div>

                {/* Team */}
                <div className="font-barlow text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  {driver.team}
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-nascar-red animate-pulse" />
                )}
              </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Driver Hub Content */}
      {selectedDriver && (
        <section id="driver-hub-content" className="px-3 sm:px-4 pb-12 sm:pb-16 max-w-5xl mx-auto">
          {/* Driver banner */}
          <div className={`relative rounded-xl border overflow-hidden mb-6 sm:mb-8 p-4 sm:p-6 ${SERIES_BG[selectedDriver.series]} ${SERIES_CLASSES[selectedDriver.series].split(' ')[1]}`}>
            {/* Huge watermark number */}
            <div
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 font-bebas leading-none select-none pointer-events-none opacity-[0.07]"
              style={{ fontSize: 'clamp(96px, 28vw, 180px)' }}
              aria-hidden="true"
            >
              {selectedDriver.number}
            </div>

            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  <span className={`font-bebas tracking-wider text-xs sm:text-sm px-2 py-1 rounded border ${SERIES_CLASSES[selectedDriver.series]}`}>
                    {SERIES_LABELS[selectedDriver.series]} SERIES
                  </span>
                  <span className={`font-bebas text-3xl sm:text-4xl ${SERIES_CLASSES[selectedDriver.series].split(' ')[0]}`}>
                    #{selectedDriver.number}
                  </span>
                </div>
                <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-foreground leading-none tracking-tight break-words">
                  {selectedDriver.name}
                </h2>
                <p className="font-barlow text-muted-foreground mt-1 text-base sm:text-lg">{selectedDriver.team}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDriver.profileHref ? (
                  <Link
                    href={selectedDriver.profileHref}
                    className="flex items-center gap-2 bg-nascar-red/90 border border-nascar-red hover:bg-nascar-red rounded-lg px-3 py-2 transition-colors"
                  >
                    <span className="font-bebas tracking-wider text-sm text-white">FULL STORY</span>
                  </Link>
                ) : null}
                {selectedDriver.twitter ? (
                  <Link
                    href={`https://twitter.com/${selectedDriver.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/60 border border-border hover:border-foreground/40 rounded-lg px-3 py-2 transition-colors"
                  >
                    <span className="font-bebas tracking-wider text-sm text-muted-foreground">𝕏</span>
                    <span className="font-barlow text-sm text-muted-foreground">@{selectedDriver.twitter}</span>
                  </Link>
                ) : null}
                <Link
                  href={youtubeSearchUrl(selectedDriver)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-900/40 border border-red-800/60 hover:border-red-600 rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="text-sm">▶</span>
                  <span className="font-bebas tracking-wider text-sm text-red-400">YOUTUBE</span>
                </Link>
                <Link
                  href={twitterSearchUrl(selectedDriver)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary border border-border hover:border-foreground/40 rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="font-bebas tracking-wider text-sm text-muted-foreground">🔍 SEARCH POSTS</span>
                </Link>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="flex items-center gap-2 bg-secondary border border-border hover:border-nascar-red/60 rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="font-bebas tracking-wider text-sm text-muted-foreground">✕ CLEAR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content grid: News + Social */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* News column — takes 2/3 */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-bebas text-2xl tracking-wider text-foreground">LATEST NEWS</h3>
                <div className="flex-1 h-px bg-border" />
                <button
                  onClick={() => fetchDriverNews(selectedDriver)}
                  className="font-bebas text-xs tracking-wider text-muted-foreground hover:text-nascar-red transition-colors px-2 py-1 border border-border hover:border-nascar-red/60 rounded"
                >
                  ↻ REFRESH
                </button>
              </div>

              {newsLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                      <div className="h-3 bg-secondary rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : news.length > 0 ? (
                <div className="space-y-2">
                  {news.map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-card hover:bg-secondary border border-border hover:border-nascar-red/40 rounded-lg p-4 transition-all"
                    >
                      <p className="font-barlow text-sm text-foreground group-hover:text-nascar-red transition-colors leading-snug mb-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-barlow">
                        {item.source && (
                          <span className="font-bebas tracking-wide text-[11px] bg-secondary px-2 py-0.5 rounded">
                            {item.source}
                          </span>
                        )}
                        {item.pubDate && <span>{item.pubDate}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="font-bebas text-2xl text-muted-foreground">NO RECENT NEWS</p>
                  <p className="font-barlow text-sm text-muted-foreground mt-1">
                    Check back soon or search directly
                  </p>
                  <Link
                    href={`https://news.google.com/search?q=${encodeURIComponent(selectedDriver.name + ' NASCAR')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 font-bebas tracking-wider text-sm text-nascar-red hover:text-foreground transition-colors"
                  >
                    SEARCH GOOGLE NEWS →
                  </Link>
                </div>
              )}
            </div>

            {/* Social + Videos column */}
            <div className="space-y-6">
              {/* Video links */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bebas text-2xl tracking-wider text-foreground">VIDEOS</h3>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <Link
                    href={youtubeSearchUrl(selectedDriver)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-800/60 transition-colors">
                      <span className="text-red-400 text-lg">▶</span>
                    </div>
                    <div>
                      <p className="font-bebas tracking-wide text-sm text-foreground">RACE HIGHLIGHTS</p>
                      <p className="font-barlow text-xs text-muted-foreground">YouTube search results</p>
                    </div>
                  </Link>
                  <div className="border-t border-border" />
                  <Link
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedDriver.name + ' NASCAR interview')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-800/60 transition-colors">
                      <span className="text-red-400 text-lg">🎙</span>
                    </div>
                    <div>
                      <p className="font-bebas tracking-wide text-sm text-foreground">INTERVIEWS</p>
                      <p className="font-barlow text-xs text-muted-foreground">Press & media coverage</p>
                    </div>
                  </Link>
                  <div className="border-t border-border" />
                  <Link
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedDriver.name + ' NASCAR 2025')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-800/60 transition-colors">
                      <span className="text-red-400 text-lg">🏁</span>
                    </div>
                    <div>
                      <p className="font-bebas tracking-wide text-sm text-foreground">2025 SEASON</p>
                      <p className="font-barlow text-xs text-muted-foreground">This season&apos;s coverage</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Twitter / X feed */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bebas text-2xl tracking-wider text-foreground">SOCIAL</h3>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="rounded-lg overflow-hidden border border-border bg-card">
                  {selectedDriver.twitter ? (
                    <a
                      className="twitter-timeline"
                      data-theme="dark"
                      data-height="480"
                      data-chrome="noheader nofooter transparent"
                      href={`https://twitter.com/${selectedDriver.twitter}`}
                    >
                      <div className="p-6 text-center">
                        <div className="font-bebas text-lg text-muted-foreground mb-2">
                          @{selectedDriver.twitter}
                        </div>
                        <div className="font-barlow text-xs text-muted-foreground animate-pulse">
                          Loading posts…
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="font-bebas text-lg text-muted-foreground mb-2">
                        No official X profile on file
                      </div>
                      <p className="font-barlow text-xs text-muted-foreground">
                        Use Search Posts below for live mentions of {selectedDriver.name}.
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  {selectedDriver.twitter ? (
                    <Link
                      href={`https://twitter.com/${selectedDriver.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center font-bebas tracking-wider text-xs py-2 bg-secondary hover:bg-card border border-border rounded transition-colors text-muted-foreground hover:text-foreground"
                    >
                      OPEN PROFILE
                    </Link>
                  ) : null}
                  <Link
                    href={twitterSearchUrl(selectedDriver)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center font-bebas tracking-wider text-xs py-2 bg-secondary hover:bg-card border border-border rounded transition-colors text-muted-foreground hover:text-foreground"
                  >
                    SEARCH POSTS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
