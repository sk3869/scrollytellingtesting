import { ContentRepository } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import path from "node:path";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const pagesDir = path.join(process.cwd(), "content", "pages");

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const repo = new ContentRepository(pagesDir);
    const slugs = await repo.getAllSlugs();
    return slugs.map((slug) => ({ slug: [slug] }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const repo = new ContentRepository(pagesDir);
    const page = await repo.getPageBySlug(slug[slug.length - 1]);
    return {
      title: page.frontmatter.seo?.title || page.frontmatter.title,
      description: page.frontmatter.seo?.description,
    };
  } catch {
    return {};
  }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  try {
    const repo = new ContentRepository(pagesDir);
    const page = await repo.getPageBySlug(slug[slug.length - 1]);
    return <PageLayoutFactory page={page} />;
  } catch {
    notFound();
  }
}
