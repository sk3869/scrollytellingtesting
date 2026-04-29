import { z } from "zod";

export const PageFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  layout: z.enum(["standard", "presentation"]),
  heroImage: z.string().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      openGraphImage: z.string().optional(),
    })
    .optional(),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;

export interface PageData {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}
