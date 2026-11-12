"use client";

import { useEffect, useRef, useState } from "react";

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
  const [sound, setSound] = useState(false);

  // Only one film has sound at a time: turning one on turns the others off.
  useEffect(() => {
    const quiet = (e: Event) => {
      if ((e as CustomEvent).detail !== ref.current) setSound(false);
    };
    window.addEventListener("reel-sound", quiet);
    return () => window.removeEventListener("reel-sound", quiet);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.muted = !sound;
  }, [sound]);

  const toggle = () => {
    const next = !sound;
    if (next) window.dispatchEvent(new CustomEvent("reel-sound", { detail: ref.current }));
    setSound(next);
    if (next) ref.current?.play().catch(() => {});
  };

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
      ) : null}
      {ad ? (
        <button type="button" className="sound" onClick={toggle} aria-pressed={sound}>
          {sound ? "Sound off" : "Sound on"}
        </button>
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
