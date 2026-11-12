"use client";

import { useEffect, useRef } from "react";

interface Props {
  name: string;
  ad?: string;
  poster?: string;
  walkthrough?: string;
  walkthroughPoster?: string;
  pendingNote?: string;
}

/**
 * A product's screen. The short ad loops muted while the scene is on screen
 * and pauses when it leaves. People who ask for reduced motion get the poster
 * and native controls instead of autoplay.
 */
export function SceneScreen({ name, ad, poster, pendingNote }: Props) {
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
      ) : (
        <div className="pending">
          <span>{pendingNote}</span>
        </div>
      )}
    </div>
  );
}

/** Opens the full walkthrough in a dialog, with sound controls. */
export function WalkthroughButton({ name, src, poster }: { name: string; src: string; poster?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const close = () => {
    video.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button
        type="button"
        className="reel-btn line"
        onClick={() => {
          dialog.current?.showModal();
          video.current?.play().catch(() => {});
        }}
      >
        Watch the walkthrough
      </button>
      <dialog
        ref={dialog}
        className="reel-dialog"
        aria-label={`${name} walkthrough`}
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <button type="button" onClick={close}>
          Close
        </button>
        <video ref={video} src={src} poster={poster} controls playsInline preload="none" />
      </dialog>
    </>
  );
}
