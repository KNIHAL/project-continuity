import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.fullName}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dots = ["#a78bfa", "#f5b942", "#3ddc97"];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b0c0d",
        color: "#ece9e2",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {dots.map((color) => (
            <div
              key={color}
              style={{ width: 28, height: 28, borderRadius: 14, background: color }}
            />
          ))}
        </div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>PCS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 30, color: "#9ba1a7" }}>
          Local-first handoffs for AI coding agents. Verified, reported, inferred.
        </div>
      </div>
    </div>,
    size,
  );
}
