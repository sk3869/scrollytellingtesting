import { ContentRepository } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const repo = new ContentRepository();
  try {
    const page = await repo.getPageBySlug("home");
    return {
      title: page.frontmatter.seo?.title || page.frontmatter.title,
      description: page.frontmatter.seo?.description,
      openGraph: page.frontmatter.seo?.openGraphImage
        ? { images: [page.frontmatter.seo.openGraphImage] }
        : undefined,
    };
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const repo = new ContentRepository();
  try {
    const page = await repo.getPageBySlug("home");
    return <PageLayoutFactory page={page} />;
  } catch (error) {
    console.error("Failed to load home page:", error);
    notFound();
  }
}
