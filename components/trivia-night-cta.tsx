import Link from "next/link";

export default function TriviaNightCta() {
  return (
    <section
      id="trivia-night"
      className="relative border-y border-border bg-strategy-panel overflow-hidden"
      aria-labelledby="trivia-night-cta-heading"
      data-testid="trivia-night-cta"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-30" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-strategy-cyan" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <p className="font-oswald text-xs uppercase tracking-[0.2em] text-strategy-cyan mb-2">Trivia Night</p>
        <h2 id="trivia-night-cta-heading" className="font-archivo text-3xl sm:text-4xl text-white">
          Trivia Night — five questions, no caution laps.
        </h2>
        <p className="mt-3 max-w-xl font-oswald text-base text-white/65 leading-relaxed">
          Daily 5 drops at 6 a.m. Mountain. Beginner-friendly, with a hard one for the lifers.
        </p>
        <Link
          href="/trivia"
          className="mt-6 inline-flex rounded-lg bg-nascar-red px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white"
        >
          Play Trivia Night →
        </Link>
      </div>
    </section>
  );
}
