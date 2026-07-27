import { DEFAULT_LOCALE, getDictionary, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

/**
 * Social card. Drawn with plain layout primitives and system-weight text
 * rather than a fetched font, so it renders without a network round-trip at
 * build time.
 */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0e14",
        padding: "72px",
        // The dotted grid from the site, as a repeating radial gradient.
        backgroundImage:
          "radial-gradient(rgba(0,112,248,0.16) 1.5px, transparent 1.5px)",
        backgroundSize: "36px 36px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: "linear-gradient(100deg, #0070f8, #00b098)",
          }}
        />
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#f2f5f9",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#f2f5f9",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: "900px",
          }}
        >
          {t.meta.tagline}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#8c98a7",
            maxWidth: "880px",
            lineHeight: 1.4,
          }}
        >
          {t.home.lede.slice(0, 150)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: 20,
          color: "#58a6ff",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>openfiat.network</span>
        <span style={{ color: "#1c2532" }}>/</span>
        <span style={{ color: "#778494" }}>Solana</span>
      </div>
    </div>,
    size,
  );
}
