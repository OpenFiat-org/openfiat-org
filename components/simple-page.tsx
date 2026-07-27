import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { type Dictionary, getDictionary, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type PageKey = keyof Dictionary["pages"];

/**
 * The pages that are a heading and a paragraph: legal text awaiting counsel,
 * a blog with no posts, a status page for a network that is not running.
 *
 * They share one component so they stay a hero and a sentence rather than
 * accumulating filler.
 */
export function simplePage(key: PageKey) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale: raw } = await params;
    if (!isLocale(raw)) return {};
    const page = getDictionary(raw).pages[key];
    return {
      title: page.title,
      description: page.intro,
      alternates: { canonical: `/${raw}/${key}` },
      openGraph: {
        title: `${page.title} · ${SITE.name}`,
        description: page.intro,
        url: `/${raw}/${key}`,
      },
    };
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: raw } = await params;
    if (!isLocale(raw)) notFound();
    const page = getDictionary(raw).pages[key];
    return <PageHero title={page.title} lede={page.intro} />;
  }

  return { generateMetadata, Page };
}
