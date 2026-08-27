import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Barrass AI",
    short_name: "Barrass AI",
    description:
      "Custom software, automation and business systems for NZ businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A2B4A",
    theme_color: "#1A2B4A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
