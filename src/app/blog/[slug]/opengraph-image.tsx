import { ImageResponse } from "next/og";
import { getStandalonePost } from "../../../lib/blog-mdx";

export const alt = "Blog post on luislozoya.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOGImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getStandalonePost(params.slug);

  const title = post?.title ?? "luislozoya.com";
  const description = post?.description ?? "";
  const tags = post?.tags?.slice(0, 4) ?? [];

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
          Writing · luislozoya.com
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "40px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                fontSize: 26,
                color: "#94a3b8",
                lineHeight: 1.4,
                maxWidth: "1000px",
              }}
            >
              {description.length > 180
                ? description.slice(0, 178) + "..."
                : description}
            </div>
          )}

          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag) => (
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
              ))}
            </div>
          )}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ color: "#cbd5e1", fontWeight: 600 }}>
              Luis Javier Lozoya
            </div>
            <div>Security Engineer · AppSec · Cloud · AI</div>
          </div>
          <div
            style={{
              fontFamily: "monospace",
              color: "#fbbf24",
              fontSize: 16,
            }}
          >
            luislozoya.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
