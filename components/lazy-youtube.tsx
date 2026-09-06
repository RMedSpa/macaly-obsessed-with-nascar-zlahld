"use client";

import { useEffect, useRef, useState } from "react";

type LazyYoutubeProps = {
  playlistId: string;
  title: string;
};

/**
 * Defers YouTube iframe creation until near viewport / user intent.
 * Keeps third-party main-thread work off the critical path.
 */
export default function LazyYoutube({ playlistId, title }: LazyYoutubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: load after a short idle delay so initial path stays clear
      const t = window.setTimeout(() => setShouldLoad(true), 2500);
      return () => window.clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          console.log("LazyYoutube: entering viewport, loading embed");
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0&rel=0&modestbranding=1`;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden border border-nascar-red/30 bg-black"
      style={{ paddingBottom: "56.25%" }}
    >
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            console.log("LazyYoutube: user requested load");
            setShouldLoad(true);
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-black via-[#1a0505] to-black text-white group"
          aria-label={`Load video: ${title}`}
        >
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-nascar-red text-white shadow-lg shadow-nascar-red/40 transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-7 w-7 ml-1" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-oswald text-sm tracking-widest uppercase text-white/80">
            Load NASCAR videos
          </span>
        </button>
      )}
    </div>
  );
}
