import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "#F5EDE0", borderRadius: 12, display: "flex", height: "100%", justifyContent: "center", width: "100%" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M4 2h22l10 10v26H4V2Z" stroke="#141210" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M26 2v10h10" stroke="#141210" strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="31" cy="8" r="2.2" fill="#FF5B2E" />
          <path d="M11 22h16M11 28h20M11 34h10" stroke="#141210" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
