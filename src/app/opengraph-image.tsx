import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luis Javier Lozoya - Full Stack Engineer, Security Focused";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#3b82f6",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
            }}
          >
            Luis Javier Lozoya
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            Full Stack Engineer | Security, Cloud, AI
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["React", "Next.js", "AWS", "Python", "TypeScript", "GIAC GSEC"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 16,
                    color: "#cbd5e1",
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1px solid #334155",
                    background: "rgba(51, 65, 85, 0.5)",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: 16,
            color: "#475569",
          }}
        >
          luislozoya.com
        </div>
      </div>
    ),
    { ...size }
  );
}
