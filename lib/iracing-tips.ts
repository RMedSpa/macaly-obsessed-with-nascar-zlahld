export type TipCategory =
  | 'setup'
  | 'oval'
  | 'traffic'
  | 'restarts'
  | 'strategy'
  | 'hardware'
  | 'licenses';

export interface IracingTip {
  id: string;
  category: TipCategory;
  title: string;
  summary: string;
  body: string;
  bullets: string[];
  level: 'rookie' | 'club' | 'pro';
  trackFocus?: string;
}

export interface IracingQuickWin {
  id: string;
  label: string;
  detail: string;
}

export interface IracingSeriesStep {
  id: string;
  tier: string;
  name: string;
  why: string;
  tip: string;
}

export const TIP_CATEGORY_META: Record<
  TipCategory,
  { label: string; short: string; accent: 'red' | 'cyan' | 'blue' | 'yellow' }
> = {
  setup: { label: 'Car setup', short: 'Setup', accent: 'cyan' },
  oval: { label: 'Oval driving', short: 'Ovals', accent: 'red' },
  traffic: { label: 'Traffic & drafting', short: 'Traffic', accent: 'blue' },
  restarts: { label: 'Restarts', short: 'Restarts', accent: 'yellow' },
  strategy: { label: 'Race strategy', short: 'Strategy', accent: 'cyan' },
  hardware: { label: 'Controls & FOV', short: 'Rig', accent: 'blue' },
  licenses: { label: 'Licenses & series', short: 'Ladder', accent: 'red' },
};

export const LEVEL_LABELS = {
  rookie: 'Rookie',
  club: 'Club',
  pro: 'Pro tip',
} as const;

/** Homepage teaser chips */
export const IRACING_HIGHLIGHTS = [
  'Fixed setup ovals first',
  'Cup setup starters by track',
  'High line vs low line',
  'Draft without wrecks',
  'Restart launch timing',
  'Fuel & tire windows',
  'FOV that actually works',
] as const;

/** Shared track-type labels for setup garage filters */
export type CupSetupTrackType = 'short' | 'flat' | 'intermediate' | 'superspeedway' | 'road';

export const CUP_SETUP_TRACK_TYPES: { id: CupSetupTrackType; label: string }[] = [
  { id: 'short', label: 'Short Track' },
  { id: 'flat', label: 'Flat Mile' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'superspeedway', label: 'Superspeedway' },
  { id: 'road', label: 'Road Course' },
];

export interface CupSetupKnob {
  label: string;
  value: string;
  tip?: string;
}

/**
 * Editorial Cup / Next Gen garage starters for iRacing open (and sense-check for fixed).
 * Values are coaching ranges from typical sim baselines — builds change, so treat as a
 * first-click board from the series baseline, then tune to YOUR hands.
 */
export interface CupTrackSetup {
  id: string;
  name: string;
  shortName: string;
  trackType: CupSetupTrackType;
  /** One-line car goal */
  goal: string;
  /** How the car should feel after 8–12 laps */
  feel: string;
  /** Qual trim vs race trim note */
  qualVsRace: string;
  knobs: CupSetupKnob[];
  /** First change if tight center / entry */
  ifTight: string;
  /** First change if loose off */
  ifLoose: string;
  bullets: string[];
}

export const DEFAULT_CUP_SETUP_ID = 'new-hampshire';

export const IRACING_CUP_SETUPS: CupTrackSetup[] = [
  // ── Short tracks ─────────────────────────────────────────────────────────
  {
    id: 'richmond',
    name: 'Richmond Raceway',
    shortName: 'Richmond',
    trackType: 'short',
    goal: 'Rotate early, plant the rear on throttle, survive long green fall-off.',
    feel: 'Slight free entry that settles mid — not a push-mobile on a short run.',
    qualVsRace: 'Qual: +rear bite / a click rear brake for rotation. Race: free the front a hair and protect RR.',
    knobs: [
      { label: 'Brake bias', value: '54–56% forward', tip: 'Start safer on stickers; go rearward as tires heat' },
      { label: 'RF / LF pressure', value: 'RF +1–2 vs LF', tip: 'Abrasive — watch RF build' },
      { label: 'RR / LR pressure', value: 'RR mild + over LF baseline', tip: 'Too much RR = snap loose off' },
      { label: 'Crossweight / wedge', value: 'Slightly higher (left-side grip)', tip: 'Helps drive off bottom' },
      { label: 'Track bar (rear)', value: 'Baseline → mild lower right', tip: 'Lower right frees center; too low = loose' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Soft enough to take a set on entry' },
      { label: 'Rear spring / ARB', value: 'Supportive, not rock-hard', tip: 'Need drive, not a skating rear' },
      { label: 'Camber', value: 'Aggressive RF within fixed limit', tip: 'Stay inside iRacing garage limits' },
    ],
    ifTight: 'Drop right-side track bar a hair, add 0.5 rear brake, or soften front bar one step.',
    ifLoose: 'Bias forward 0.5–1%, raise RR pressure 0.5, or add a click of wedge.',
    bullets: [
      'Bottom is money on restarts — build a car that exits clean, not just turns in',
      'Long run: free the nose before the RF gives up',
      'Do not over-bank on spring rate; Richmond is mechanical grip + patience',
    ],
  },
  {
    id: 'martinsville',
    name: 'Martinsville Speedway',
    shortName: 'Martinsville',
    trackType: 'short',
    goal: 'Bumper structure + throttle science. Soft hands on paper-clip ends.',
    feel: 'Stable trail, willing mid, zero wheelspin off the cookie-cutter exits.',
    qualVsRace: 'Qual can take more rear brake. Race trim needs forward drive and cooler RR.',
    knobs: [
      { label: 'Brake bias', value: '53–55% forward', tip: 'Paper clips need controlled rotation' },
      { label: 'Tire pressures', value: 'Even-ish; RF slight +', tip: 'Avoid huge stagger mistakes' },
      { label: 'Wedge', value: 'Higher left-side help', tip: 'Classic paper-clip grit' },
      { label: 'Track bar', value: 'Mild free on right', tip: 'Too free = apex spin' },
      { label: 'Front ARB', value: 'Soft–medium', tip: 'Car must take a set, not skate' },
      { label: 'Rear support', value: 'Soft enough to plant', tip: 'Hard rear = no drive off' },
      { label: 'Brake ducts / tape', value: 'Safe cooling if available', tip: 'Long greens cook binders' },
      { label: 'Gear', value: 'Short enough for thrust', tip: 'Don’t tall-gear yourself into push' },
    ],
    ifTight: 'More rear brake on entry, slight less front bar, open a lane with wheel — don’t pry.',
    ifLoose: 'Bias forward, less throttle angle on exit, slight RR pressure up.',
    bullets: [
      'Practice 20-lap stints behind a car — dirty air is the real setup',
      'Protect the nose; one flat RF rewrites your night',
      'Bump-and-run only when YOU still have exit — otherwise both lose',
    ],
  },
  {
    id: 'bristol',
    name: 'Bristol Motor Speedway',
    shortName: 'Bristol',
    trackType: 'short',
    goal: 'Commit center speed without loading the RF into a push/wall sandwich.',
    feel: 'Planted at throttle, honest mid — high bank forgives less when you stab.',
    qualVsRace: 'Qual: stiffer, sharper turn-in. Race: free face + tire life or you’ll die after lap 40.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'High bank + cold tires = spin risk' },
      { label: 'RF pressure', value: 'Monitor rise carefully', tip: 'Coliseum heats the RF fast' },
      { label: 'Front ARB', value: 'Medium', tip: 'Too stiff = mid push into wall' },
      { label: 'Track bar', value: 'Free enough for center', tip: 'Bristol rewards mid commitment' },
      { label: 'Wedge', value: 'Moderate left help', tip: 'Over-wedge jackets the RF' },
      { label: 'Rear springs', value: 'Balanced support', tip: 'Need drive without snap' },
      { label: 'Camber RF', value: 'Use available negative', tip: 'Stay legal to garage max' },
      { label: 'Tape / cooling', value: 'Prioritize stability temps', tip: 'If overheating, free cooling first' },
    ],
    ifTight: 'Soften front bar or free right rear bar/track bar — then check your entry marks.',
    ifLoose: 'Bias forward and tame throttle; stagger/wedge before throwing springs.',
    bullets: [
      'High line works only with a real run — not ego on lap 3',
      'Leaf-spring feel: smooth inputs; the wall arrives quick',
      'Short-run speed means nothing if RF is dead at the half',
    ],
  },
  {
    id: 'north-wilkesboro',
    name: 'North Wilkesboro Speedway',
    shortName: 'N. Wilkesboro',
    trackType: 'short',
    goal: 'Old-school mechanical grip. Carry speed without dumping the nose.',
    feel: 'Honest progressive push you can throttle around — not a knife-edge spinner.',
    qualVsRace: 'Qual sharper; race softer front face and patient exits for abrasive long runs.',
    knobs: [
      { label: 'Brake bias', value: '54–56% forward', tip: 'Cold stickers first lap = patient' },
      { label: 'Pressures', value: 'RF managed rise', tip: 'Historic asphalt eats rights' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Need grip more than razor turn' },
      { label: 'Track bar', value: 'Mild free center', tip: 'Don’t over-free for TV highlights' },
      { label: 'Wedge', value: 'Slight left bias', tip: 'Helps drive off bottom' },
      { label: 'Rear support', value: 'Planted', tip: 'Throttle-on stability first' },
      { label: 'Gear', value: 'Balanced pull', tip: 'Match the short straights' },
      { label: 'Brake ducts', value: 'Keep them honest', tip: 'Long greens, small track' },
    ],
    ifTight: 'Free center (track bar) before dumping brake bias to the rear.',
    ifLoose: 'Bias forward + smoother throttle circle — Wilkesboro punishes stabs.',
    bullets: [
      'Rubber builds — re-eval lane choice every long green',
      'Track position > highlight-reel slide jobs',
      'Practice restarts on both lanes; preferred groove swings',
    ],
  },

  // ── Flat miles ───────────────────────────────────────────────────────────
  {
    id: 'phoenix',
    name: 'Phoenix Raceway',
    shortName: 'Phoenix',
    trackType: 'flat',
    goal: 'Dogleg discipline + long-corner patience. Mechanical grip over hope.',
    feel: 'Calm mid-corner, strong off — no RF death march by lap 30.',
    qualVsRace: 'Qual can take more overspeed entry. Race trim protects RF and drive off T2/T4.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Low bank = easy to over-rotate' },
      { label: 'RF pressure', value: 'Conservative start', tip: 'Desert heat + flat load' },
      { label: 'Front ARB', value: 'Medium', tip: 'Too stiff kills long-corner grip' },
      { label: 'Track bar', value: 'Mild free', tip: 'Rotate without snap' },
      { label: 'Wedge', value: 'Slight left help', tip: 'Dogleg exit matters' },
      { label: 'Rear springs', value: 'Supportive', tip: 'Need throttle confidence' },
      { label: 'Camber', value: 'RF priority', tip: 'Within garage max' },
      { label: 'Gear', value: 'Pull off dogleg', tip: 'Don’t tall-gear the drive' },
    ],
    ifTight: 'Earlier brake mark + freer center; don’t pry more entry speed.',
    ifLoose: 'Bias forward; delay throttle half a car off apex.',
    bullets: [
      'Championship-style patience — one-lane late is common',
      'Practice the dogleg without jerking the wheel',
      'Long run wins: save the RF early',
    ],
  },
  {
    id: 'new-hampshire',
    name: 'New Hampshire Motor Speedway',
    shortName: 'Loudon',
    trackType: 'flat',
    goal: 'Magic Mile: carry mid speed without RF murder. Exits pay the bills.',
    feel: 'Settled long-corner load — never a darty short-track knife edge.',
    qualVsRace: 'Qual may free entry slightly. Race: softer face, cooler RF, honest drive off.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Flat mile over-rotation is common' },
      { label: 'RF / RR pressures', value: 'Start safe; watch rise', tip: 'Abrasive surface heats rights' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Needs grip through long corners' },
      { label: 'Track bar', value: 'Mild free center', tip: 'Too free = exit snap' },
      { label: 'Wedge', value: 'Slight left', tip: 'Bottom still matters early' },
      { label: 'Rear support', value: 'Planted for throttle', tip: 'Loudon rewards patience off' },
      { label: 'Camber RF', value: 'Use available', tip: 'Stay in limits' },
      { label: 'Brake ducts / tape', value: 'Keep temps stable', tip: 'Green-flag heat soaks in' },
    ],
    ifTight: 'Brake earlier, free track bar mild, drop front bar one step — then re-mark entry.',
    ifLoose: 'Bias +0.5–1% forward, raise RR 0.5 psi, unwind smoother.',
    bullets: [
      'Dollar Tree 301 mindset: clean air + track position ends fights',
      'If it pushes, lift mid — don’t wrestle more wheel',
      'Cross-train with our Pit Strategy Calculator for NH stint math',
    ],
  },
  {
    id: 'dover',
    name: 'Dover Motor Speedway',
    shortName: 'Dover',
    trackType: 'flat',
    goal: 'Concrete Monster: commit center, survive the wall when grip leaves.',
    feel: 'High-commitment mid with predictable fall-off — not a sudden loose spike.',
    qualVsRace: 'Qual sharper. Race free enough that lap 40 isn’t a crash test.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Concrete bites then lets go' },
      { label: 'Pressures', value: 'RF carefully managed', tip: 'Concrete heat spikes' },
      { label: 'Front ARB', value: 'Medium', tip: 'Balance grip vs response' },
      { label: 'Track bar', value: 'Free for center speed', tip: 'Dover is mid-corner theater' },
      { label: 'Wedge', value: 'Moderate', tip: 'Too much jackets RF' },
      { label: 'Rear support', value: 'Stable throttle-on', tip: 'Wall is unforgiving' },
      { label: 'Camber', value: 'RF aggressive legal', tip: 'Within garage' },
      { label: 'Gear', value: 'Match concrete pull', tip: 'Don’t lug or over-rev mindlessly' },
    ],
    ifTight: 'Free center first; less entry pride.',
    ifLoose: 'Bias forward immediately under green — Dover spins become yardsales.',
    bullets: [
      'Leave margin on cold tires after pits',
      'One groove late: track position > hero slide',
      'Practice long runs more than single flyer laps',
    ],
  },

  // ── Intermediates ────────────────────────────────────────────────────────
  {
    id: 'charlotte',
    name: 'Charlotte Motor Speedway',
    shortName: 'Charlotte',
    trackType: 'intermediate',
    goal: 'Classic 1.5: aero platform + long-run RF management + clean air speed.',
    feel: 'Slight tight in traffic that frees in clean air — race trim for 25–40 lap stints.',
    qualVsRace: 'Qual: lower, stiffer, more rake preference if available. Race: free face, tire life, balance in dirty air.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Stable into 1 and 3' },
      { label: 'RF pressure', value: 'Watch bank load rise', tip: '1.5s cook RF' },
      { label: 'Front ARB', value: 'Medium-stiff', tip: 'Platform for aero' },
      { label: 'Track bar', value: 'Race free > qual free', tip: 'Long-run center' },
      { label: 'Wedge', value: 'Mild left', tip: 'Don’t overdo belt wear' },
      { label: 'Rear springs', value: 'Balanced platform', tip: 'Aero needs consistent ride' },
      { label: 'Ride height / rake', value: 'Legal race window', tip: 'Follow series garage limits' },
      { label: 'Gear', value: 'Tall enough for draft pulls', tip: 'Match split meta' },
    ],
    ifTight: 'Free track bar / soften front bar; check if you’re just in dirty air.',
    ifLoose: 'Bias forward; stiffen rear support slight before panic wedge.',
    bullets: [
      'Clean air is a setup — practice runs behind cars',
      'Two-tire calls only when the groove is one-lane and track position is everything',
      'Stage points ≠ win: plan fuel from practice %',
    ],
  },
  {
    id: 'kansas',
    name: 'Kansas Speedway',
    shortName: 'Kansas',
    trackType: 'intermediate',
    goal: 'Wide, multi-groove capable — car that can move up without dying on entry.',
    feel: 'Neutral-to-free center so the top is optional, not a shove-fest only.',
    qualVsRace: 'Qual low and sharp. Race free enough to run the top when rubber moves.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Stable 1.5 entry' },
      { label: 'Pressures', value: 'Right-side heat watch', tip: 'Long banks' },
      { label: 'Front ARB', value: 'Medium', tip: 'Allow mid grip' },
      { label: 'Track bar', value: 'Free for groove choice', tip: 'Top line needs turn' },
      { label: 'Wedge', value: 'Mild', tip: 'Balance vs RF wear' },
      { label: 'Rear support', value: 'Planted off', tip: 'Throttle on both lanes' },
      { label: 'Aero platform', value: 'Legal consistent heights', tip: 'No porpoise rides' },
      { label: 'Gear', value: 'Split-meta pull', tip: 'Copy top splits’ RPM targets' },
    ],
    ifTight: 'Free center; try higher entry only after balance exists bottom.',
    ifLoose: 'Bias forward + smoother unwind off the top.',
    bullets: [
      'Mark two brake points — bottom and top',
      'Long run: the top often comes in; don’t junk the car for lap-1 bottom only',
      'Side draft on the straights, not mid-corner wrestling',
    ],
  },
  {
    id: 'vegas',
    name: 'Las Vegas Motor Speedway',
    shortName: 'Las Vegas',
    trackType: 'intermediate',
    goal: 'Similar 1.5 package to Kansas/Charlotte with desert heat management.',
    feel: 'Stable aero car that doesn’t dump the nose when temps climb.',
    qualVsRace: 'Qual sharp. Race cooling + RF life first; pace second.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Predictable 1.5 stops' },
      { label: 'RF pressure', value: 'Conservative in heat', tip: 'Desert sessions spike temps' },
      { label: 'Front ARB', value: 'Medium-stiff', tip: 'Platform' },
      { label: 'Track bar', value: 'Race free', tip: 'Long-run center' },
      { label: 'Wedge', value: 'Mild left', tip: 'Drive off' },
      { label: 'Cooling / tape', value: 'Prioritize temps', tip: 'Heat soak is real' },
      { label: 'Rear support', value: 'Balanced', tip: 'Throttle confidence' },
      { label: 'Gear', value: 'Match pack speed', tip: 'Drafting intermediates' },
    ],
    ifTight: 'Free face before adding entry speed.',
    ifLoose: 'Bias forward; check RR temp vs LR.',
    bullets: [
      'Night vs day sessions change grip — re-baseline pressures',
      'Don’t peak-a-boo the wall chasing one tenths',
      'Practice pit exit blend — Vegas packs bunch fast',
    ],
  },
  {
    id: 'texas',
    name: 'Texas Motor Speedway',
    shortName: 'Texas',
    trackType: 'intermediate',
    goal: 'High-speed banked 1.5 with attention to center push and aero dirty air.',
    feel: 'Committed with a safe throttle-on — not wall-kissing every lap.',
    qualVsRace: 'Qual lower/stiffer. Race freer, cooler, traffic-tolerant.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Fast entry stability' },
      { label: 'Pressures', value: 'Right-side heat first', tip: 'Bank load' },
      { label: 'Front ARB', value: 'Medium-stiff', tip: 'Aero platform' },
      { label: 'Track bar', value: 'Free race center', tip: 'Traffic tightens cars' },
      { label: 'Wedge', value: 'Mild', tip: 'RF life' },
      { label: 'Rear springs', value: 'Platform', tip: 'Consistent rake' },
      { label: 'Cooling', value: 'Open if hot', tip: 'Texas heat' },
      { label: 'Gear', value: 'Pack RPM window', tip: 'Match leaders' },
    ],
    ifTight: 'Assume dirty air first — then free track bar.',
    ifLoose: 'Bias forward; reduce overspeed entry.',
    bullets: [
      'Runs off turn 2/4 decide passes — setup for exit',
      'Large crashes happen on entry overspeed chains — leave a gap',
      'Fuel window discipline on long greens',
    ],
  },
  {
    id: 'homestead',
    name: 'Homestead-Miami Speedway',
    shortName: 'Homestead',
    trackType: 'intermediate',
    goal: 'Mini-toad progressive banking — car that can roll the top when it comes in.',
    feel: 'Neutral enough to choose lanes; not locked to the bottom bumper.',
    qualVsRace: 'Qual can bottom-bias. Race needs top-line capability and tire life.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Stable into progressive bank' },
      { label: 'Pressures', value: 'Balanced rights', tip: 'Long stints move grip up' },
      { label: 'Front ARB', value: 'Medium', tip: 'Allow roll for top' },
      { label: 'Track bar', value: 'Free enough for top', tip: 'Top dies if tight' },
      { label: 'Wedge', value: 'Mild', tip: 'Don’t lock bottom only' },
      { label: 'Rear support', value: 'Drive off both lanes', tip: 'Pass with exit' },
      { label: 'Aero heights', value: 'Legal race', tip: 'Consistent platform' },
      { label: 'Gear', value: 'Pull off corners', tip: 'Homestead is exit theater' },
    ],
    ifTight: 'Free center/top — check if you’re forcing bottom on worn tires.',
    ifLoose: 'Bias forward; soften throttle when rolling upper groove.',
    bullets: [
      'Practice the top in open air before race traffic',
      'Championship tracks reward patience over desperation',
      'Watch long-run falloff more than flying lap',
    ],
  },
  {
    id: 'nashville',
    name: 'Nashville Superspeedway',
    shortName: 'Nashville',
    trackType: 'intermediate',
    goal: 'Concrete intermediate — grip that bites then drops. Honest long-run balance.',
    feel: 'Predictable push that frees with heat, not a sudden spin cliff.',
    qualVsRace: 'Qual sharp on fresh. Race free + pressure discipline on concrete heat.',
    knobs: [
      { label: 'Brake bias', value: '56–58% forward', tip: 'Concrete entry safety' },
      { label: 'RF pressure', value: 'Conservative', tip: 'Concrete spikes' },
      { label: 'Front ARB', value: 'Medium', tip: 'Grip window' },
      { label: 'Track bar', value: 'Race free', tip: 'Center commitment' },
      { label: 'Wedge', value: 'Mild left', tip: 'Drive' },
      { label: 'Rear support', value: 'Stable', tip: 'Throttle confidence' },
      { label: 'Cooling', value: 'Prioritize', tip: 'Summer races bake' },
      { label: 'Gear', value: 'Match pack', tip: 'Draft matters here too' },
    ],
    ifTight: 'Free center; earlier markers.',
    ifLoose: 'Bias forward after pits for a lap.',
    bullets: [
      'Cold tire caution after yellows — concrete is binary',
      'Lane choice changes with rubber — re-scout each run',
      'Long green tire management beats lap-1 heroics',
    ],
  },
  {
    id: 'darlington',
    name: 'Darlington Raceway',
    shortName: 'Darlington',
    trackType: 'intermediate',
    goal: 'Too Tough to Tame: asymmetric patience. Touch the wall less, exit cleaner.',
    feel: 'Slight tight that you throttle around — never darty near the fence.',
    qualVsRace: 'Qual can free turn-in carefully. Race prioritizes RF/RR survival and composure.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Egg shape = different ends' },
      { label: 'RF pressure', value: 'Guarded', tip: 'Wall proximity heat' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Need mechanical forgive' },
      { label: 'Track bar', value: 'Mild free — not wild', tip: 'Too free kisses fence' },
      { label: 'Wedge', value: 'Moderate help', tip: 'Drive without spin' },
      { label: 'Rear support', value: 'Stable throttle', tip: 'Lady in Black punishes snaps' },
      { label: 'Camber', value: 'RF legal max care', tip: 'Within limits' },
      { label: 'Gear', value: 'Strong dice exits', tip: 'Uneven ends' },
    ],
    ifTight: 'Lift mid slightly before adding rear brake chaos.',
    ifLoose: 'Bias forward; reduce fence pride on exit.',
    bullets: [
      'Practice BOTH ends as separate corners',
      'Stripe the wall only if you’re already fast — don’t invent pace on the fence',
      'Tire fall-off is massive — race the stint, not lap 2',
    ],
  },
  {
    id: 'atlanta',
    name: 'Atlanta Motor Speedway',
    shortName: 'Atlanta',
    trackType: 'intermediate',
    goal: 'Draft-heavy intermediate: pack manners + slight spoilers of speed over pure tire race.',
    feel: 'Stable in traffic, predictable in push-draft chaos — not a loose spinner.',
    qualVsRace: 'Qual single-car trim. Race: pack stability, cooling, fuel window.',
    knobs: [
      { label: 'Brake bias', value: '57–59% forward', tip: 'Pack stability > rotation' },
      { label: 'Pressures', value: 'Even heat management', tip: 'Long draft runs' },
      { label: 'Front ARB', value: 'Stiffer platform', tip: 'Aero calm' },
      { label: 'Track bar', value: 'Stable > free', tip: 'Middle lane is a sandwich' },
      { label: 'Wedge', value: 'Mild', tip: 'Keep drive' },
      { label: 'Cooling / tape', value: 'Pack temps first', tip: 'Nose-to-tail heat' },
      { label: 'Gear', value: 'Draft RPM sweet spot', tip: 'Critical at Atlanta' },
      { label: 'Brake ducts', value: 'Safe', tip: 'Big packs, big heat' },
    ],
    ifTight: 'Accept some push in traffic; free only if pure solo is locked.',
    ifLoose: 'Bias forward NOW — pack spins end nights.',
    bullets: [
      'Treat it halfway to superspeedway mentally',
      'Allies and lines > solo kamikaze',
      'Fuel calculations win stages here',
    ],
  },
  {
    id: 'michigan',
    name: 'Michigan International Speedway',
    shortName: 'Michigan',
    trackType: 'intermediate',
    goal: 'Wide, fast 2-mile: aero efficiency, draft, and calm high-speed balance.',
    feel: 'Planted at speed — no big yaw moments in the wind.',
    qualVsRace: 'Qual low/sharp. Race pack-stable, cooling buried in draft.',
    knobs: [
      { label: 'Brake bias', value: '57–59% forward', tip: 'High-speed entry calm' },
      { label: 'Pressures', value: 'Right-side watched', tip: 'Long high-speed load' },
      { label: 'Front ARB', value: 'Stiffer platform', tip: 'Aero first' },
      { label: 'Track bar', value: 'Stable race', tip: 'Avoid nervous rear' },
      { label: 'Wedge', value: 'Mild', tip: 'Drive off wide corners' },
      { label: 'Gear', value: 'Tall draft pull', tip: 'Big thrills on straights' },
      { label: 'Cooling', value: 'Open in pack', tip: 'Michigan drafts cook' },
      { label: 'Rear support', value: 'Planted', tip: 'Wind + wake' },
    ],
    ifTight: 'Mild free center if solo slow — else live with pack push.',
    ifLoose: 'Bias forward; reduce rear brake depending.',
    bullets: [
      'Side draft timing off corner more than mid-corner fighting',
      'Big wrecks: leave a gap on accordion restarts',
      'Fuel and stages rewrite aggressive plans',
    ],
  },
  {
    id: 'pocono',
    name: 'Pocono Raceway',
    shortName: 'Pocono',
    trackType: 'intermediate',
    goal: 'Tricky Triangle: three corners, three setups in one. Compromise wisely.',
    feel: 'Balanced may feel slightly wrong everywhere — that’s correct.',
    qualVsRace: 'Qual may favor the corner you gain most. Race overall compromise + tire life.',
    knobs: [
      { label: 'Brake bias', value: '55–58% (corner-dependent)', tip: 'Bind bias for in-lap tweaks' },
      { label: 'Pressures', value: 'Balanced start', tip: 'Different loads each end' },
      { label: 'Front ARB', value: 'Medium', tip: 'Compromise turn-in' },
      { label: 'Track bar', value: 'Mild free', tip: 'Help the tightest corner' },
      { label: 'Wedge', value: 'Mild', tip: 'Global balance tool' },
      { label: 'Gear', value: 'Long straight pull', tip: 'Tunnel/straight speed' },
      { label: 'Rear support', value: 'Stable throttle', tip: 'Uneven exits' },
      { label: 'Brake ducts', value: 'Strong cooling', tip: 'Heavy braking zones' },
    ],
    ifTight: 'Note WHICH corner — fix that end’s marks before global free chaos.',
    ifLoose: 'Same: isolate corner, then bias/pressure.',
    bullets: [
      'Practice each corner as a separate skill trial',
      'In-car bias changes between ends are a pro habit',
      'Don’t chase one corner into wrecking the other two',
    ],
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    shortName: 'Indy (Oval)',
    trackType: 'intermediate',
    goal: 'Brickyard oval: smooth, flat-ish commitment, huge aero calm, zero twitch.',
    feel: 'Dead stable — Indy punishes nervous rear instantly.',
    qualVsRace: 'Qual low and precise. Race safer platform, tire temp management.',
    knobs: [
      { label: 'Brake bias', value: '57–59% forward', tip: 'Stability over rotation' },
      { label: 'Pressures', value: 'Even heat build', tip: 'Long loaded corners' },
      { label: 'Front ARB', value: 'Stiffer platform', tip: 'Aero confidence' },
      { label: 'Track bar', value: 'Stable mild free', tip: 'No darty rear' },
      { label: 'Wedge', value: 'Mild', tip: 'Drive without spin' },
      { label: 'Gear', value: 'Long oval pull', tip: 'Indy RPM targets matter' },
      { label: 'Cooling', value: 'Pack-aware', tip: 'Heat in traffic' },
      { label: 'Rear support', value: 'Very stable', tip: 'Never knife-edge here' },
    ],
    ifTight: 'Tiny free only — over-free cars wreck in the pack.',
    ifLoose: 'Bias forward immediately; log a milder entry.',
    bullets: [
      'Smooth is fast — no sawing at the wheel',
      'Respect the pack; Indy wrecks are huge',
      'Fuel strategy often decides more than last-lap dunks',
    ],
  },
  {
    id: 'gateway',
    name: 'World Wide Technology Raceway',
    shortName: 'Gateway',
    trackType: 'intermediate',
    goal: 'Egg-ish mile-plus: uneven ends, mechanical honesty, restart IQ.',
    feel: 'Slight push you can live with — both ends must be driveable.',
    qualVsRace: 'Qual freer entry. Race tire life + both-end compromise.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Different ends, one bias' },
      { label: 'Pressures', value: 'RF managed', tip: 'Unique loads' },
      { label: 'Front ARB', value: 'Medium', tip: 'Mechanical grip' },
      { label: 'Track bar', value: 'Mild free', tip: 'Help tight end' },
      { label: 'Wedge', value: 'Moderate', tip: 'Drive off' },
      { label: 'Rear support', value: 'Planted', tip: 'Throttle exits' },
      { label: 'Gear', value: 'Short-ish pull', tip: 'Shorter ovals need thrust' },
      { label: 'Cooling', value: 'Standard safe', tip: 'Summer nights still heat' },
    ],
    ifTight: 'Identify which end; free globally only after marks are fixed.',
    ifLoose: 'Bias forward; reduce aggression on the free end.',
    bullets: [
      'Rehearse restarts — Gateway bunches hard',
      'Don’t over-specialize one corner',
      'Long run rubber can flip preferred lane',
    ],
  },
  {
    id: 'iowa',
    name: 'Iowa Speedway',
    shortName: 'Iowa',
    trackType: 'intermediate',
    goal: 'Short-intermediate hybrid: free enough mid, strong off, tire soak management.',
    feel: 'Eager turn without rear instability on throttle.',
    qualVsRace: 'Qual sharp. Race frees face and protects right sides on longer runs.',
    knobs: [
      { label: 'Brake bias', value: '55–57% forward', tip: 'Hybrid track rotation' },
      { label: 'Pressures', value: 'RF/RR watched', tip: 'Bank + abrasion' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Need grip' },
      { label: 'Track bar', value: 'Free race center', tip: 'Mid speed' },
      { label: 'Wedge', value: 'Mild-moderate', tip: 'Drive off' },
      { label: 'Rear support', value: 'Balanced', tip: 'No snap' },
      { label: 'Gear', value: 'Strong pull', tip: 'Shorter straights' },
      { label: 'Camber', value: 'RF priority', tip: 'Within limits' },
    ],
    ifTight: 'Free center + earlier throttle patience.',
    ifLoose: 'Bias forward; wedge/RR pressure before drama.',
    bullets: [
      'Treat it part short track, part 1-miler',
      'Top can come in — practice it alone first',
      'Restarts: bottom often preferred early',
    ],
  },

  // ── Superspeedways ───────────────────────────────────────────────────────
  {
    id: 'daytona',
    name: 'Daytona International Speedway',
    shortName: 'Daytona',
    trackType: 'superspeedway',
    goal: 'Pack stability, cooling, and draft gear — not tire-hero camber wars.',
    feel: 'Dead straight stability in a pack. Mild push preferred over any loose.',
    qualVsRace: 'Qual: max single-car speed package. Race: cooling, mirror driving, fuel.',
    knobs: [
      { label: 'Brake bias', value: '58–60% forward', tip: 'Pack calm if you must check up' },
      { label: 'Pressures', value: 'Even, stable', tip: 'Not a tire deg race primarily' },
      { label: 'Front ARB', value: 'Stiff platform', tip: 'Aero straight-line' },
      { label: 'Track bar', value: 'Stable (not free)', tip: 'Loose kills packs' },
      { label: 'Wedge', value: 'Mild / baseline', tip: 'Keep simple' },
      { label: 'Cooling / tape', value: 'Race pack open enough', tip: 'Overheat = lift = wreck' },
      { label: 'Gear', value: 'Draft steep pull', tip: 'Copy split leaders’ RPM' },
      { label: 'Brake ducts', value: 'Adequate', tip: 'Big slows still happen' },
    ],
    ifTight: 'Usually fine — don’t free into loose chasing solo tenths in race trim.',
    ifLoose: 'Bias forward / stabilize rear immediately. Park pride.',
    bullets: [
      'Setup won’t save bad pack IQ — practice drafting more than garage',
      'Allies, polar lines, and patience > third lane hero',
      'Fuel window math from practice; yellows rewrite everything',
    ],
  },
  {
    id: 'talladega',
    name: 'Talladega Superspeedway',
    shortName: 'Talladega',
    trackType: 'superspeedway',
    goal: 'Same Daytona mindset, bigger speeds — stability and cooling above all.',
    feel: 'Calm in a turbo pack. Never nervous rear at 200mph sim speeds.',
    qualVsRace: 'Qual single car. Race: cooler nose, denser draft manners.',
    knobs: [
      { label: 'Brake bias', value: '58–60% forward', tip: 'Emergency checks' },
      { label: 'Pressures', value: 'Stable even', tip: 'Simple' },
      { label: 'Front ARB', value: 'Stiff', tip: 'Platform' },
      { label: 'Track bar', value: 'Stable', tip: 'No freestyle' },
      { label: 'Wedge', value: 'Baseline', tip: 'Keep dumb simple' },
      { label: 'Cooling / tape', value: 'Pack-first', tip: 'Dega heat cycles' },
      { label: 'Gear', value: 'Tall draft', tip: 'RPM targets' },
      { label: 'Rear support', value: 'Very stable', tip: 'Zero knife edge' },
    ],
    ifTight: 'Accept it in traffic.',
    ifLoose: 'Fix now — Dega loose ends seasons.',
    bullets: [
      'The Big One is optional if you leave outs',
      'Don’t sit middle forever without an ally plan',
      'Stage points greed wrecks more cars than lap time',
    ],
  },

  // ── Road courses ─────────────────────────────────────────────────────────
  {
    id: 'cota',
    name: 'Circuit of the Americas',
    shortName: 'COTA',
    trackType: 'road',
    goal: 'Heavy braking zones + T1 elevation: stable bias, rotation without spin, fuel savvy.',
    feel: 'Front-axle confidence on brakes, rear that accepts throttle on exits.',
    qualVsRace: 'Qual more rear brake / lower. Race tire thrift + safer bias on colds.',
    knobs: [
      { label: 'Brake bias', value: '52–55% forward', tip: 'Road needs rotation — not oval 58%' },
      { label: 'Pressures', value: 'Even temps L/R more', tip: 'Lefts matter now' },
      { label: 'Front ARB', value: 'Medium', tip: 'Turn-in without understeer forever' },
      { label: 'Rear ARB / bar', value: 'Controlled free', tip: 'Too free = hairpin spin' },
      { label: 'Diff / lock (if avail)', value: 'Exit stable', tip: 'Follow garage options' },
      { label: 'Brake ducts', value: 'Open strong', tip: 'Big stops every lap' },
      { label: 'Gear', value: 'Range for T1 + straights', tip: 'Don’t miss shifts' },
      { label: 'Camber', value: 'More road-balanced', tip: 'Not pure oval RF max only' },
    ],
    ifTight: 'More rear brake carefully; freer front bar; check trail technique first.',
    ifLoose: 'Bias forward; less trail; softer throttle on hairpins.',
    bullets: [
      'Trail brake with intent — not a stab',
      'COTA T1: leave a lane offline on lap 1 chaos',
      'Fuel window is real — practice lift-and-coast marks',
    ],
  },
  {
    id: 'watkins-glen',
    name: 'Watkins Glen International',
    shortName: 'Watkins Glen',
    trackType: 'road',
    goal: 'Fast essences + inner loop: calm high-speed yaw, strong anchors into bus stop.',
    feel: 'Stable at speed, rotate in slower bits without unloading the rear.',
    qualVsRace: 'Qual aggressive rotation. Race tire + safer high-speed balance.',
    knobs: [
      { label: 'Brake bias', value: '53–56% forward', tip: 'Bus stop / inner loop anchors' },
      { label: 'Pressures', value: 'Balanced L/R heat', tip: 'Road load both sides' },
      { label: 'Front ARB', value: 'Medium', tip: 'Turn-in + mid support' },
      { label: 'Rear support', value: 'Keep high-speed calm', tip: 'Essences punish loose' },
      { label: 'Brake ducts', value: 'Generous', tip: 'Repeated big stops' },
      { label: 'Gear', value: 'Boot & straight speed', tip: 'Shift points rehearsed' },
      { label: 'Cooling', value: 'Safe', tip: 'Summer Glen cooks' },
      { label: 'Toe / align', value: 'Stable highway', tip: 'No darty wheel' },
    ],
    ifTight: 'Entry technique first; then mild freer front/ rear brake.',
    ifLoose: 'Bias forward before the esses ruin your week.',
    bullets: [
      'Inner loop: commit or lift early — half moves create piles',
      'Don’t overdrive the carousel equivalents; exits matter',
      'Practice full fuel stints; road Cup races punish empty tanks',
    ],
  },
  {
    id: 'sonoma',
    name: 'Sonoma Raceway',
    shortName: 'Sonoma',
    trackType: 'road',
    goal: 'Elevation + tight chicanes: mechanical grip, short-shift patience, zero rear snap.',
    feel: 'Grippy and honest up the hills — not oversteery on cresting exits.',
    qualVsRace: 'Qual rotation. Race safer bias and tire for heat cycles.',
    knobs: [
      { label: 'Brake bias', value: '53–56% forward', tip: 'Heavy stops into tight bits' },
      { label: 'Pressures', value: 'Even L/R', tip: 'Both sides work' },
      { label: 'Front ARB', value: 'Medium-soft', tip: 'Mechanical grip hills' },
      { label: 'Rear support', value: 'Stable on crests', tip: 'Elevation unloads cars' },
      { label: 'Brake ducts', value: 'Open', tip: 'Repeated hard stops' },
      { label: 'Gear', value: 'Flexible midrange', tip: 'Chicanes + climbs' },
      { label: 'Cooling', value: 'Priority', tip: 'California heat' },
      { label: 'Ride / springs', value: 'Absorb bumps', tip: 'Not skatepark stiff' },
    ],
    ifTight: 'Better bare throttle circles; mild free front.',
    ifLoose: 'Bias forward on cresting corners immediately.',
    bullets: [
      'Don’t peak over crests flat if the car lightens',
      'Passing zones are limited — track position from pits counts',
      'Warm tires fully; cold Sonoma spins are costly',
    ],
  },
  {
    id: 'chicago-street',
    name: 'Chicago Street Course',
    shortName: 'Chicago',
    trackType: 'road',
    goal: 'Walls everywhere: safe bias, strong brakes, composure over peak grip.',
    feel: 'Planted and predictable — street courses reward survival IQ.',
    qualVsRace: 'Qual can free slightly. Race: safer, cooler brakes, scratch-free panels.',
    knobs: [
      { label: 'Brake bias', value: '54–57% forward', tip: 'Walls punish over-rotation' },
      { label: 'Pressures', value: 'Even L/R', tip: '90° city corners both ways' },
      { label: 'Front ARB', value: 'Medium', tip: 'Turn without push into barriers' },
      { label: 'Rear support', value: 'Stable exits', tip: 'Throttle onto walls is fatal' },
      { label: 'Brake ducts', value: 'Max practical', tip: 'Stop-go abuse' },
      { label: 'Gear', value: 'Strong 2–3 response', tip: 'Short shifts common' },
      { label: 'Cooling', value: 'Open', tip: 'City heat + low speed' },
      { label: 'Toe', value: 'Stable', tip: 'No dart between walls' },
    ],
    ifTight: 'Earlier brakes + precision — freer only if you’re truly slow solo.',
    ifLoose: 'Bias forward; reduce trail near walls.',
    bullets: [
      'Lap 1: finish. Walls delete SR instantly',
      'Rehearse braking markers — cones disappear in traffic',
      'Fuel + caution timing often beat outright pace',
    ],
  },
];

export function getCupSetupsByType(type: CupSetupTrackType | 'all'): CupTrackSetup[] {
  if (type === 'all') return IRACING_CUP_SETUPS;
  return IRACING_CUP_SETUPS.filter((s) => s.trackType === type);
}

export function getCupSetupById(id: string): CupTrackSetup | undefined {
  return IRACING_CUP_SETUPS.find((s) => s.id === id);
}

export const IRACING_QUICK_WINS: IracingQuickWin[] = [
  {
    id: 'fixed-first',
    label: 'Race fixed setups first',
    detail:
      'Learn car behavior and race craft before you touch open setups. Fixed keeps the field honest and builds habits that transfer.',
  },
  {
    id: 'practice-alone',
    label: '10 clean laps before join',
    detail:
      'In test session, nail a repeatable lap + mark entry markers. Then hop official. Random heat with no plan = early incident points.',
  },
  {
    id: 'brake-sooner',
    label: 'Brake earlier than real life',
    detail:
      'Sim tires punish late apexes hard. Tap brake, rotate, then get to throttle. Over-driving entry is the #1 oval tourer wreck.',
  },
  {
    id: 'spotter-on',
    label: 'Use a real spotter callout',
    detail:
      'Built-in spotter + relative screen together. Call “clear low / still there” out loud. Half of sim wrecks are silent door contact.',
  },
];

export const IRACING_LADDER: IracingSeriesStep[] = [
  {
    id: 'rookies',
    tier: 'R',
    name: 'Rookie Legends / Street Stock',
    why: 'Cheap, short races, learns pack manners without Gen‑3 monster speed.',
    tip: 'Finish races. Incident points matter more than finishing P1 every heat.',
  },
  {
    id: 'd-class',
    tier: 'D',
    name: 'Advanced Legends · ARCA · Trucks fixed',
    why: 'Bridges you into longer ovals and real drafting packs.',
    tip: 'Pick one oval each week and hammer it. Don’t hop content every night.',
  },
  {
    id: 'c-class',
    tier: 'C',
    name: "NASCAR O'Reilly / Class C ovals",
    why: 'Closer to what you watch on Sunday — stages, fuel, and tire fall-off.',
    tip: 'Learn green-flag pit windows. A clean P8 often outscores a wrecked P2.',
  },
  {
    id: 'b-a',
    tier: 'B–A',
    name: 'NASCAR Cup fixed & open',
    why: 'Top of the stock-car ladder. Crowded splits, real aggression, serious setups.',
    tip: 'Do not jump open Cup until you can run clean fixed top‑half finishes.',
  },
];

export const IRACING_TIPS: IracingTip[] = [
  {
    id: 'oval-line',
    category: 'oval',
    title: 'Own one racing line before you freestyle',
    summary: 'Consistency beats hero runs. Lock a baseline high/low path first.',
    body: 'On most intermediate ovals, the winning pattern is early apex entry, steam mid-corner, and a patient throttle that does not push the nose into the wall. Nail that for 15 laps before experimenting with the top.',
    bullets: [
      'Pick visual markers for brake and throttle (grandstand posts, SAFER seams, start/finish boards)',
      'If the car pushes, ease throttle mid-corner instead burning more entry speed',
      'If it is loose off, delay throttle ½ car length and unwind the wheel smoother',
      'Once consistent, try the high line only in open air — not three-wide on lap 2',
    ],
    level: 'rookie',
    trackFocus: '1.5-mile ovals',
  },
  {
    id: 'short-track-aggression',
    category: 'oval',
    title: 'Short tracks: patience is pace',
    summary: 'Bristol, Martinsville, Richmond reward bumper work — not kamikaze slides.',
    body: 'Short tracks are won with exits. A half-car shove that kills both of your corners costs more than waiting one lap for a better run.',
    bullets: [
      'Protect the bottom on restarts; the outside only works with a huge run',
      'Tap, don’t drive-through, when moving someone — leave them a lane',
      'Watch long-run tire falloff; early aggressors often die after lap 40',
      'Practice rolling the center without spinning the rears on exit',
    ],
    level: 'club',
    trackFocus: 'Short tracks',
  },
  {
    id: 'flat-mile-loudon',
    category: 'oval',
    title: 'Flat miles: carry speed, don’t force it',
    summary: 'New Hampshire’s Magic Mile punishes over-drive. Mechanical grip > hope.',
    body: 'Loudon and Phoenix are about patience through long, low-banked corners. If you shovel entry speed the front pushes, the RF loads up, and you bleed the entire next straight. Work a repeatable mid-corner commitment and live for exits — especially once the abrasive surface eats the right-front.',
    bullets: [
      'Brake a hair earlier than you think; rotate, then squeeze throttle — no stab',
      'Prefer the bottom until rubber builds; the outside only works with a real run',
      'Long green runs: watch RF heat. Short-run heroes often drop off after 25–35 laps',
      'Track position rules — a clean pit cycle beats a DNF three-wide heroesave',
      'Restarts: second place often wants the lane that already rolled free that day',
    ],
    level: 'club',
    trackFocus: 'New Hampshire · Phoenix',
  },
  {
    id: 'super-draft',
    category: 'traffic',
    title: 'Superspeedway: draft, don’t dive',
    summary: 'Daytona/Talladega packs punish solo moves. Manage air, allies, and the middle lane.',
    body: 'In the draft you are racing air more than asphalt. The middle lane looks heroic until it becomes the crash sandwich.',
    bullets: [
      'Never lift randomly in the pack — communicate with brake lights and predictable lines',
      'Push from behind only when aligned; offset pushes spin leaders',
      'If you are the lead pair, swap before either car overheats or runs out of momentum',
      'Late-race: protecting side draft on the bumper beats a full pass that prioritizes the wall',
    ],
    level: 'club',
    trackFocus: 'Superspeedways',
  },
  {
    id: 'side-draft',
    category: 'traffic',
    title: 'Side draft like a Cup driver',
    summary: 'Pull even with their rear quarters, not door-to-door for half a lap.',
    body: 'Effective side draft is short and timed off corner exit. Linger door-to-door and both cars slow while the next pack arrives.',
    bullets: [
      'Get your nose to their rear quarter, then free up and run your line',
      'Hold a stable wheel — swerving side draft looks cool and wrecks heats',
      'If someone side drafts you, give a lane early rather than pinching to the wall',
      'On intermediates, side draft works best with a big run — not equal cars mid-corner',
    ],
    level: 'pro',
  },
  {
    id: 'restarts-launch',
    category: 'restarts',
    title: 'Restart launches win positions for free',
    summary: 'Know the cone, know the leader’s timing, know your gear.',
    body: 'Most mid-pack gains (and wrecks) happen in the first two corners of a restart. Treat every yellow as a mini qualifying launch.',
    bullets: [
      'Watch the leader’s brake lights and rear suspension squat — not just the green',
      'Second place justifies choosing the preferred lane for that track’s rubber',
      'If you are deep, leave a gap so you are not rear-ended when the accordion hits',
      'Short track bottom: beach the throttle until the car rotates, then fire',
    ],
    level: 'club',
  },
  {
    id: 'choose-lane',
    category: 'restarts',
    title: 'Lane choice matrix (simple)',
    summary: 'Bottom for grip, top for a run — unless the rubber says otherwise.',
    body: 'Default: bottom on worn short tracks, outside if the top is packing rubber and you have a strong push car. Always look at the previous restart before locking in.',
    bullets: [
      'First restart of a run often favors the groove that dominated practice',
      'Long green-flag runs move preferred groove up as rubber builds',
      'If the leader falters, the second-row car in the free lane steals the race',
      'Never pick a lane just to “mix it up” without a reason',
    ],
    level: 'pro',
  },
  {
    id: 'fuel-window',
    category: 'strategy',
    title: 'Know your fuel window before green',
    summary: 'Write stint length on a sticky note. Hope is not a strategy.',
    body: 'Even in fixed series, fuel and tire strategy separate top splits. Calculate laps per tank from practice, then plan one backup yellow scenario.',
    bullets: [
      'Practice until you see fuel% drop over a known lap count',
      'If scrambling for stage points, short-pit only if track position recovers under yellow',
      'Saving fuel? Lift earlier, short-shift, and draft smarter — not random trails of throttle',
      'Use our Pit Strategy Calculator for real-race learning you can bring back to the sim',
    ],
    level: 'club',
  },
  {
    id: 'tire-manage',
    category: 'strategy',
    title: 'Long-run tire management',
    summary: 'The driver who still has rear grip at lap 60 wins the restart that matters.',
    body: 'Early in stints, run 80% aggression. Build a gap or hold position without sliding. Deploy when the car ahead falls off or a restart bunches the field.',
    bullets: [
      'Listen for rear slip audio/FFB — that’s free pace leaving the building',
      'Free up entry if overheating the right-front on banked 1.5s',
      'Traffic: taking the air is worth more than diving a doomed inside move',
      'Two-tire calls only when track position is everything and the groove is one-lane',
    ],
    level: 'pro',
  },
  {
    id: 'baseline-setup',
    category: 'setup',
    title: 'Read a baseline before you wrench',
    summary: 'Open setups: change one thing, test five laps, write it down.',
    body: 'Copy a trusted baseline (or the iRacing baseline) and only adjust for your main complaint: tight center, loose off, entry snap. Random slider dinners create undrivable cars.',
    bullets: [
      'Fix the biggest handling fault first (usually rear grip or front bite)',
      'Track bar / wedge / brake bias are your daily drivers — not full aero rebuilds nightly',
      'If you can’t explain why a change helps, revert it',
      'Qualify trim ≠ race trim. Soften race runs for tire life',
    ],
    level: 'pro',
  },
  {
    id: 'brake-bias',
    category: 'setup',
    title: 'Brake bias is a race tool',
    summary: 'Shift bias forward when the rear gets light; back when the nose won’t rotate.',
    body: 'Do not leave bias static all race. As tires fade and fuel burns, the car’s balance walks. Tiny bias clicks mid-stint keep you in the throttle sooner.',
    bullets: [
      'Forward bias = more stable but longer corner',
      'Rearward bias = better rotation, higher spin risk on cold tires',
      'After a pit stop on cold stickers, start safer (more forward) for one lap',
      'Bind bias to easy buttons — not buried menus',
    ],
    level: 'club',
  },
  {
    id: 'fov',
    category: 'hardware',
    title: 'Set FOV from math, not vibes',
    summary: 'Wrong FOV wrecks depth perception and makes apexes lie.',
    body: 'Use a FOV calculator with your monitor size and distance. Then sit consistently. Cockpit cameras that look “cool” often make relative speed unreadable.',
    bullets: [
      'Measure eyes-to-screen; don’t guess',
      'Keep horizon stable — no bobbing chase cams for serious oval work',
      'Triple / VR users: still verify virtual wheel distance feels natural',
      'Once FOV is right, leave it alone so muscle memory sticks',
    ],
    level: 'rookie',
  },
  {
    id: 'controls',
    category: 'hardware',
    title: 'Force feedback & inputs that stay clean',
    summary: 'Smooth inputs win long runs. Spiky FFB hides the slip.',
    body: 'You want enough FFB to feel front load and rear step, not arm-wrestling. Prefer linear throttle curves for ovals so modulation stays predictable in traffic.',
    bullets: [
      'Lower FFB if you are fighting the wheel mid-corner every lap',
      'Deadzones: minimal on wheel, small on pedals only if hardware needs it',
      'Map look-left/right, bias, tearoff, and push-to-talk within thumb reach',
      'Wheel stand bolted = consistent seating = consistent times',
    ],
    level: 'rookie',
  },
  {
    id: 'sr-first',
    category: 'licenses',
    title: 'Safety rating is your career currency',
    summary: 'You can’t race the cool series if you’re wrecking every official.',
    body: 'Treat SR like playoff points. Finish. Leave space. If a divebomb is 50/50, take the 100% finish. iRating climbs naturally when you finish races in the lead pack.',
    bullets: [
      'Avoid early multi-wide unless you own the middle with goodwill',
      'If you’re involved in a wreck you didn’t start, still check your line next lap',
      'Protest dirty drivers; don’t retaliate and tank your own SR',
      'Off-weeks: run official fixed races for clean corners, not hero podcasts',
    ],
    level: 'rookie',
  },
  {
    id: 'content-buy',
    category: 'licenses',
    title: 'Buy content with a plan',
    summary: 'Chase one car class and the tracks that series uses this season.',
    body: 'Sales are great, random libraries are not. Look at the active NASCAR fixed schedule and own those tracks first so you can race every week without FOMO spending.',
    bullets: [
      'Priority: active official series tracks → popular next series → bucket-list',
      'One primary car path (Trucks → O’Reilly → Cup) beats owning everything',
      'Paint, setups, and practice time beat five unused tracks',
      'Watch the series calendar Sunday night; practice the next oval Monday',
    ],
    level: 'club',
  },
  {
    id: 'road-to-oval',
    category: 'oval',
    title: 'Coming from road racing?',
    summary: 'Ovals ask for throttle science and traffic IQ more than trail-braking heroics.',
    body: 'Your road-race instincts (late apex madness, divebombs) get people hurt on ovals. Think in 20-lap chess games in traffic, not sector times alone.',
    bullets: [
      'Work on throttle circularity — unwind and feed, don’t stab',
      'Practice running half a second off pace behind a car to learn dirty air',
      'Use the relative, standings, and track map HUDs without staring at them',
      'Mention “oval only / still learning” in voice early; good drivers help',
    ],
    level: 'rookie',
  },
  {
    id: 'mental',
    category: 'traffic',
    title: 'Mental checklist after contact',
    summary: 'Reset fast. Revenge laps destroy SR and nights.',
    body: 'Contact happens. The pro move is diagnose (who moved / cold tires / bad run) and return to your marks. Chat flame wars never gain spots.',
    bullets: [
      'Mute toxic chat; keep spotter/voice with teammates',
      'If the car is bent, pit and assess — dying slow causes bigger wrecks',
      'Clip the replay later; don’t re-litigate under green',
      'End sessions on a clean run so tomorrow’s practice starts confident',
    ],
    level: 'club',
  },
  {
    id: 'cold-stickers',
    category: 'oval',
    title: 'Cold stickers: survive lap 1 of the stint',
    summary: 'Fresh tires lie for a lap. Half the spins after green or pit exit are impatience.',
    body: 'Whether it’s a restart or a green-flag stop, the first full-throttle corner on new tires is where good nights die. Build heat with sexy enough pace — not qualifying rage — then go hunting.',
    bullets: [
      'Out-lap / first green lap: 90% aggression until the wheel talks back',
      'Bias a click forward for the first lap of stickers if the car feels light rear',
      'Leave a half-car to the wall until temps stabilize',
      'If someone dives you on ice-cold tires, live to take the spot back next lap',
    ],
    level: 'rookie',
  },
  {
    id: 'dirty-air',
    category: 'oval',
    title: 'Dirty air is a handling condition',
    summary: 'Your “tight” car in traffic may be perfect in clean air. Don’t over-fix the garage for a wake problem.',
    body: 'On intermediates especially, following closely unloads the nose. Free the car only until it’s drivable in a pack — then stop. A razor-sharp solo rocket that spins in traffic is a DNF machine.',
    bullets: [
      'Baseline: 8–10 solo laps, then 8 laps glued to a partner’s bumper',
      'Prefer a touch of push in dirty air over a loose rocket in clean air',
      'When stuck: change line or timing of the run, not fifteen sliders mid-race',
      'Use the relative gap — if you’re not closing, don’t force the bumper',
    ],
    level: 'club',
    trackFocus: '1.5-mile ovals',
  },
  {
    id: 'garage-discipline',
    category: 'setup',
    title: 'Garage discipline beats random wrenching',
    summary: 'One change, five laps, write it down. Screenshot the sheet.',
    body: 'Open Cup setups reward process. Start from the iRacing baseline or a trusted fixed-feeling race trim, then chase ONE complaint. Our Cup Setup Garage gives a first-click direction per track — not a magic file.',
    bullets: [
      'Name your files: Track_Race_v3_freeCenter — not setup_final_FINAL',
      'If two changes fight each other, revert both and try again sequential',
      'Qualify trim after race trim exists — never the other way around for weeknights',
      'Build a notes app row: tight / loose / temps / weather / split',
    ],
    level: 'pro',
  },
  {
    id: 'pressures-temps',
    category: 'setup',
    title: 'Read tire temps before you blame springs',
    summary: 'Temps and pressures tell the truth. Springs lie if the heat map is sideways.',
    body: 'After a representative run, check inside/middle/outside temps and ending pressures. Too hot inside often means camber/pressure issues; big RF spikes mean you’re loading the nose or over-driving entry.',
    bullets: [
      'Match pressures to session temp — colder night needs different starts than noon heat',
      'Chase even-ish temp curves before heroic ARB moves',
      'Right-side spikes on flats? Soften entry and check RF start pressure',
      'Left sides matter on road courses — don’t run pure oval stagger thinking',
    ],
    level: 'club',
  },
  {
    id: 'in-car-adjust',
    category: 'setup',
    title: 'In-car adjustments are free wins',
    summary: 'Bias, abs where available, tearoffs, weight jacker / wedge — use them during the race.',
    body: 'Top sim oval drivers drive the car and the knobs. As fuel burns and tires fade, balance walks. Tiny bias and wedge clicks mid-stint keep you in the throttle without a splashy pit fix.',
    bullets: [
      'Map brake bias and wedge/weight jacker to easy buttons',
      'Forward bias as rear gets loose late; reverse only when you can feel the push coolly',
      'After pits: safer bias for one lap on stickers',
      'Don’t stare at the black box mid-corner — click between corners',
    ],
    level: 'club',
  },
  {
    id: 'qual-vs-race',
    category: 'setup',
    title: 'Qualify trim ≠ race trim',
    summary: 'A one-lap killer that dies at lap 18 loses stages and weeks.',
    body: 'Build race trim first so you can finish. Then save a separate qualify file with slightly more rotation, lower current (if modeled), and sharper bite. Never show up to a 50% race only holding your flyer setup.',
    bullets: [
      'Race file: tire life, dirty-air manners, restart stability',
      'Qual file: freer entry, max single-lap commitment, accept mid-run death',
      'Load race file for warm-up if the series gives limited practice',
      'If fixed setup week: practice race craft — setup isn’t the differentiator',
    ],
    level: 'pro',
  },
  {
    id: 'road-cup',
    category: 'oval',
    title: 'Cup road courses still need stock-car brain',
    summary: 'It’s not an MX-5 clinic. Brakes, patience, and walls matter more than apex cosplay.',
    body: 'Next Gen on road courses rewards clean anchors, smart fuel, and not overdriving into barriers. Trail brake with purpose, short-shift when the rear lightens, and treat every wall as SR poison.',
    bullets: [
      'Bias lives lower than oval defaults — still safer on cold tires than your star friend says',
      'Lefthanders need left-side temp love; check both sides on the heat map',
      'Lap-1 chaos: finish first, pass later',
      'Use the Cup Setup Garage road presets as first clicks from baseline',
    ],
    level: 'club',
    trackFocus: 'COTA · Glen · Sonoma · Chicago',
  },
  {
    id: 'pit-exit-blend',
    category: 'restarts',
    title: 'Pit exit blends win without passing',
    summary: 'A clean blend keeps momentum and avoids the “free” incident point.',
    body: 'Practice pit commit speed, stall marks, and the blend line until they’re boring. Most mid-pack SR bleed is awkward exits under green, not big wrecks.',
    bullets: [
      'Hit the pit limiter marks the same every time — no late stabs',
      'Look up-track before releasing; yield if someone’s committed',
      'On ovals, don’t swing wide into the lane one car already owns',
      'Time a full stop+exit in test before the official',
    ],
    level: 'rookie',
  },
  {
    id: 'weather-adapt',
    category: 'strategy',
    title: 'Weather & track state change the “right” setup',
    summary: 'Clouds, rubber, and time of day move grip. Re-check pressures every session block.',
    body: 'A perfect noon baseline can feel glued or ice by night. Build a habit: first out laps reevaluate temps, then click pressures/bias before you throw the entire ARB stack away.',
    bullets: [
      'Cooler → slightly less start pressure / greasier feel early',
      'Rubbered-in top may free your tight bottom car — try the lane before big garage moves',
      'Rain-capable weeks: if wet splits exist, practice wet lines separately',
      'Save session notes with weather tags so next week isn’t guesswork',
    ],
    level: 'pro',
  },
  {
    id: 'telemetry-lite',
    category: 'hardware',
    title: 'You don’t need full traces to learn',
    summary: 'Throttle traces and delta beats buying more hardware first.',
    body: 'Before another rim or load-cell upgrade, overlay your throttle/brake to a ghost or teammate. Most oval time hides in throttle circularity and earlier, cleaner braking — not missing 5 Nm of FFB.',
    bullets: [
      'Watch for throttle stab spikes mid-corner — smooth those first',
      'Brake release should be progressive into rotation, not an on/off switch',
      'Delta bar positive? Don’t wreck chasing it in traffic',
      'Upgrade seating consistency before exotic peripherals',
    ],
    level: 'club',
  },
  {
    id: 'fixed-to-open',
    category: 'licenses',
    title: 'When to leave fixed for open Cup',
    summary: 'Not when you’re bored — when your race craft is already top half.',
    body: 'Open setups amplify mistakes. Earn the jump: consistent top-half fixed finishes, clean SR trend, and the patience to test scientifically. Then use the Cup Setup Garage as a track-by-track first board off baseline.',
    bullets: [
      'If fixed chaos still wrecks you, open will not heal it',
      'Join open practice early in the week — don’t debut the file in the race',
      'Keep a fixed series active so race craft doesn’t rust during setup rabbit holes',
      'Copy promoters’ notes carefully; still verify on YOUR wheel and FOV',
    ],
    level: 'pro',
  },
];

export function getTipsByCategory(category: TipCategory | 'all'): IracingTip[] {
  if (category === 'all') return IRACING_TIPS;
  return IRACING_TIPS.filter((t) => t.category === category);
}

export function getTipsByLevel(level: IracingTip['level'] | 'all'): IracingTip[] {
  if (level === 'all') return IRACING_TIPS;
  return IRACING_TIPS.filter((t) => t.level === level);
}
