import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Earlsdwara Digital",
    short_name: "Earlsdwara",
    description:
      "Premium digital agency: strategy, design, technology, and growth for founders and enterprise teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#151222",
    theme_color: "#1f1d30",
    icons: [
      {
        src: "/brand-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
