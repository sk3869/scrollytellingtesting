import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { PageData, PageFrontmatterSchema } from "./schema";

export class ContentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentNotFoundError";
  }
}

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

export class ContentRepository {
  private baseDir: string;

  constructor(baseDir: string = path.join(process.cwd(), "content")) {
    this.baseDir = baseDir;
  }

  async getAllSlugs(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.baseDir);
      return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""));
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        return [];
      }
      throw err;
    }
  }

  async getPageBySlug(slug: string): Promise<PageData> {
    const fullPath = path.join(this.baseDir, `${slug}.md`);

    let rawFileContent: string;
    try {
      rawFileContent = await fs.readFile(fullPath, "utf8");
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        throw new ContentNotFoundError(`Page not found: ${slug}`);
      }
      throw err;
    }

    const { data, content } = matter(rawFileContent);

    const parsedFrontmatter = PageFrontmatterSchema.safeParse(data);
    if (!parsedFrontmatter.success) {
      throw new ContentValidationError(
        `Invalid frontmatter for ${slug}: ${parsedFrontmatter.error.message}`
      );
    }

    return {
      slug,
      frontmatter: parsedFrontmatter.data,
      content,
    };
  }
}
