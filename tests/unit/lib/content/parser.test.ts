import { describe, it, expect } from "vitest";
import { splitMarkdownIntoSlides } from "../../../../lib/content/parser";

describe("splitMarkdownIntoSlides", () => {

  // ── Positive case ────────────────────────────────────────────────────────
  it("splits multi-slide markdown into the correct number of slides", () => {
    const input = `
# Slide One
Body text here.

---

# Slide Two
More content.

---

# Slide Three
Final slide.
`.trim();

    const result = splitMarkdownIntoSlides(input);
    expect(result).toHaveLength(3);
    expect(result[0].cleanContent).toContain("Slide One");
    expect(result[1].cleanContent).toContain("Slide Two");
    expect(result[2].cleanContent).toContain("Slide Three");
  });

  // ── Background directive ─────────────────────────────────────────────────
  it("extracts backgroundSrc and removes the directive from cleanContent", () => {
    const input = `![bg](/images/hero.jpg)\n\n## Eyebrow\n# Title\nBody text.`;

    const [slide] = splitMarkdownIntoSlides(input);

    expect(slide.backgroundSrc).toBe("/images/hero.jpg");
    expect(slide.backgroundFocal).toBeNull();
    expect(slide.cleanContent).not.toContain("![bg]");
    expect(slide.cleanContent).toContain("Title");
  });

  // ── Focal point ──────────────────────────────────────────────────────────
  it("extracts backgroundFocal when a focal point is provided", () => {
    const input = `![bg 50% 65%](/images/photo.jpg)\n\n# Heading`;

    const [slide] = splitMarkdownIntoSlides(input);

    expect(slide.backgroundSrc).toBe("/images/photo.jpg");
    expect(slide.backgroundFocal).toBe("50% 65%");
    expect(slide.cleanContent).not.toContain("![bg");
  });

  // ── Split directive ───────────────────────────────────────────────────────
  it("extracts splitSrc and removes the directive from cleanContent", () => {
    const input = `![split](/images/dna.svg)\n\n## Cause\n# Genetics\nDetails here.`;

    const [slide] = splitMarkdownIntoSlides(input);

    expect(slide.splitSrc).toBe("/images/dna.svg");
    expect(slide.splitReverseSrc).toBeNull();
    expect(slide.backgroundSrc).toBeNull();
    expect(slide.cleanContent).not.toContain("![split]");
    expect(slide.cleanContent).toContain("Genetics");
  });

  // ── Split-reverse directive ───────────────────────────────────────────────
  it("extracts splitReverseSrc and removes the directive from cleanContent", () => {
    const input = `![split-reverse](/images/heart.svg)\n\n# Cardiovascular`;

    const [slide] = splitMarkdownIntoSlides(input);

    expect(slide.splitReverseSrc).toBe("/images/heart.svg");
    expect(slide.splitSrc).toBeNull();
    expect(slide.cleanContent).not.toContain("![split-reverse]");
    expect(slide.cleanContent).toContain("Cardiovascular");
  });

  // ── Single slide (no separator) ──────────────────────────────────────────
  it("returns a single SlideNode when there is no --- separator", () => {
    const input = `# Only Slide\nSome content here.`;

    const result = splitMarkdownIntoSlides(input);

    expect(result).toHaveLength(1);
    expect(result[0].cleanContent).toContain("Only Slide");
    expect(result[0].backgroundSrc).toBeNull();
    expect(result[0].splitSrc).toBeNull();
  });

  // ── Empty input ───────────────────────────────────────────────────────────
  it("returns an empty array for an empty string", () => {
    expect(splitMarkdownIntoSlides("")).toHaveLength(0);
  });

  it("returns an empty array for whitespace-only input", () => {
    expect(splitMarkdownIntoSlides("   \n\n   ")).toHaveLength(0);
  });

  // ── rawContent preserved ─────────────────────────────────────────────────
  it("preserves the original rawContent including directives", () => {
    const input = `![bg](/images/bg.jpg)\n\n# Title`;

    const [slide] = splitMarkdownIntoSlides(input);

    expect(slide.rawContent).toContain("![bg](/images/bg.jpg)");
    expect(slide.cleanContent).not.toContain("![bg]");
  });

  // ── Separator variants ───────────────────────────────────────────────────
  it("handles --- separators with surrounding whitespace", () => {
    const input = `# Slide A\n\n  ---  \n\n# Slide B`;

    const result = splitMarkdownIntoSlides(input);

    expect(result).toHaveLength(2);
  });

});
