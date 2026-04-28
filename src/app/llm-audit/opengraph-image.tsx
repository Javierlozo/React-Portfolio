import { ImageResponse } from "next/og";

export const alt =
  "llm-audit: Static Analysis for TypeScript LLM Applications";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function LlmAuditOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #0B1220 0%, #1a1f2e 50%, #0B1220 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 18,
            fontWeight: 600,
            color: "#fbbf24",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#fbbf24",
            }}
          />
          Open source · MIT · v0.0.2
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "28px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#fbbf24",
              fontFamily: "monospace",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            llm-audit
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#f8fafc",
              fontWeight: 600,
              lineHeight: 1.2,
              maxWidth: "1024px",
            }}
          >
            Static analysis for TypeScript LLM applications.
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "1000px",
              marginTop: "4px",
            }}
          >
            OWASP LLM Top 10 at commit time. The TS/JS niche
            Semgrep&rsquo;s official AI pack does not cover.
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            {["LLM01", "LLM02", "LLM06", "Semgrep", "TypeScript", "Next.js"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 18,
                    color: "#fbbf24",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(251, 191, 36, 0.4)",
                    background: "rgba(251, 191, 36, 0.08)",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#475569",
            fontSize: 18,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <div style={{ color: "#cbd5e1", fontWeight: 600 }}>
              by Luis Javier Lozoya
            </div>
            <div>npm i -D llm-audit</div>
          </div>
          <div
            style={{
              fontFamily: "monospace",
              color: "#fbbf24",
              fontSize: 16,
            }}
          >
            luislozoya.com/llm-audit
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
