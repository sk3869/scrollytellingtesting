export interface SlideNode {
  rawContent: string;
  cleanContent: string;
  backgroundSrc: string | null;
  backgroundFocal: string | null;
  splitSrc: string | null;
  splitReverseSrc: string | null;
}

export function splitMarkdownIntoSlides(content: string): SlideNode[] {
  if (!content || content.trim() === "") {
    return [];
  }

  const chunks = content.split(/\n\s*---\s*(?:\n|$)/);

  return chunks
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((slide) => {
      const bgMatch = slide.match(/!\[bg(?:\s+([^\]]+))?\]\((.*?)\)/);
      const backgroundSrc = bgMatch ? bgMatch[2] : null;
      const backgroundFocal = bgMatch && bgMatch[1] ? bgMatch[1].trim() : null;

      const splitMatch = slide.match(/!\[split\]\((.*?)\)/);
      const splitSrc = splitMatch ? splitMatch[1] : null;

      const splitReverseMatch = slide.match(/!\[split-reverse\]\((.*?)\)/);
      const splitReverseSrc = splitReverseMatch ? splitReverseMatch[1] : null;

      let cleanContent = slide;
      if (backgroundSrc)
        cleanContent = cleanContent.replace(/!\[bg(?:\s+[^\]]+)?\]\(.*?\)/, "");
      if (splitSrc)
        cleanContent = cleanContent.replace(/!\[split\]\(.*?\)/, "");
      if (splitReverseSrc)
        cleanContent = cleanContent.replace(/!\[split-reverse\]\(.*?\)/, "");

      return {
        rawContent: slide,
        cleanContent: cleanContent.trim(),
        backgroundSrc,
        backgroundFocal,
        splitSrc,
        splitReverseSrc,
      };
    });
}
