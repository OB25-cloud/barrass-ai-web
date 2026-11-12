"use client";

import { useEffect, useRef } from "react";

interface Props {
  name: string;
  ad?: string;
  poster?: string;
  still?: string;
  pendingNote?: string;
}

/**
 * A product's screen. The short ad loops muted while the scene is on screen
 * and pauses when it leaves. People who ask for reduced motion get the poster
 * and native controls instead of autoplay.
 */
export function SceneScreen({ name, ad, poster, still, pendingNote }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="screen">
      {ad ? (
        <video
          ref={ref}
          src={ad}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${name} product film`}
        />
      ) : still ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={still} alt={`${name} screenshot`} loading="lazy" />
      ) : (
        <div className="pending">
          <span>{pendingNote}</span>
        </div>
      )}
    </div>
  );
}
