import { ImageResponse } from "next/og";

export const alt = "Emberline — The wire, still warm.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5EDE0",
          color: "#141210",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>EVENING DESK</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.9 }}>Emberline</div>
          <div style={{ marginTop: 16, fontSize: 36, color: "#FF5B2E" }}>The wire, still warm.</div>
        </div>
      </div>
    ),
    size,
  );
}
