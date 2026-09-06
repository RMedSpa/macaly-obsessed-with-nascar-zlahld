import Link from "next/link";

export default function LoveGarageCta() {
  return (
    <section
      id="love-garage"
      className="relative border-y border-border bg-strategy-panel overflow-hidden"
      aria-labelledby="love-garage-cta-heading"
      data-testid="love-garage-cta"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-30" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-strategy-yellow" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <p className="font-oswald text-xs uppercase tracking-[0.2em] text-strategy-yellow mb-2">Love Garage</p>
        <h2 id="love-garage-cta-heading" className="font-archivo text-3xl sm:text-4xl text-white">
          Love Garage — your car, your pit calls.
        </h2>
        <p className="mt-3 max-w-xl font-oswald text-base text-white/65 leading-relaxed">
          Ghost car, midpack start. You call stay out, two, four, or fuel. Stack up against the crew after Darlington.
        </p>
        <Link
          href="/garage"
          className="mt-6 inline-flex rounded-lg bg-nascar-red px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white"
        >
          Open Love Garage →
        </Link>
      </div>
    </section>
  );
}
