import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Library",
  description: "All images used in the Alzheimer's Disease scrollytelling presentation.",
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"]);

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

export default function ImagesPage() {
  const images = getImages();

  return (
    <div style={{ background: "var(--color-paper)", minHeight: "100dvh", padding: "var(--sp-8) var(--gutter)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <p className="heading heading--2" style={{ marginBottom: "var(--sp-3)" }}>
          Image library
        </p>
        <h1 className="heading heading--3" style={{ marginBottom: "var(--sp-2)" }}>
          All images · {images.length} file{images.length !== 1 ? "s" : ""}
        </h1>
        <p className="text-body" style={{ marginBottom: "var(--sp-6)" }}>
          Drop image files into <code>public/images/</code> and they appear here automatically.
          Reference them in slides as <code>/images/filename.svg</code>.
        </p>

        {images.length === 0 ? (
          <div className="glass-panel" style={{ maxWidth: "480px" }}>
            <p className="heading heading--2" style={{ marginBottom: "var(--sp-2)" }}>No images yet</p>
            <p className="text-body" style={{ marginBottom: 0 }}>
              Add files to <code>public/images/</code> and rebuild to see them here.
            </p>
          </div>
        ) : (
          <ul
            style={{
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--sp-4)",
            }}
          >
            {images.map((filename) => (
              <li key={filename}>
                <div className="glass-panel" style={{ padding: "var(--sp-3)", display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      borderRadius: "var(--radius-md)",
                      background: "var(--ink-12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`/images/${filename}`}
                      alt={filename}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans, monospace)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 500,
                      color: "var(--color-ink-muted)",
                      wordBreak: "break-all",
                    }}
                  >
                    /images/{filename}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
