import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Earlsdwara Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#60a5fa";
const BLUE_DEEP = "#2563eb";
const INK = "#0c1929";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: `linear-gradient(145deg, ${INK} 0%, #0f2847 38%, #0a1628 72%, ${INK} 100%)`,
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            marginBottom: 28,
            background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            boxShadow: `0 0 64px rgba(37, 99, 235, 0.45)`,
          }}
        />
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.22em", color: BLUE }}>
          EARLSDWARA
        </div>
        <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800, letterSpacing: "0.35em", color: "rgba(248,250,252,0.55)" }}>
          DIGITAL
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.08,
            maxWidth: 920,
            letterSpacing: -1,
            color: "#f8fafc",
          }}
        >
          Web development packages &amp; online stores
        </div>
        <div style={{ marginTop: 20, fontSize: 24, color: "rgba(248,250,252,0.72)", maxWidth: 820 }}>
          Ghana · GHS pricing · Responsive · SEO-ready · E‑commerce
        </div>
      </div>
    ),
    { ...size }
  );
}
