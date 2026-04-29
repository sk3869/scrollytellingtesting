export interface DepthPageSection {
  id: string;
  title: string;
  content: string;
}

export interface DepthPageStructure {
  intro: string;
  sections: DepthPageSection[];
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function splitDepthPageContent(content: string): DepthPageStructure {
  const lines = content.split("\n");
  const sections: DepthPageSection[] = [];
  let intro = "";
  let currentTitle = "";
  let currentContent: string[] = [];
  let inSection = false;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inSection && currentTitle) {
        sections.push({
          id: slugifyHeading(currentTitle),
          title: currentTitle,
          content: currentContent.join("\n").trim(),
        });
      }
      currentTitle = line.replace(/^## /, "").trim();
      currentContent = [];
      inSection = true;
    } else if (!inSection) {
      intro += line + "\n";
    } else {
      currentContent.push(line);
    }
  }

  if (inSection && currentTitle) {
    sections.push({
      id: slugifyHeading(currentTitle),
      title: currentTitle,
      content: currentContent.join("\n").trim(),
    });
  }

  return {
    intro: intro.trim(),
    sections: sections.filter((s) => s.content.length > 0),
  };
}

export function extractKeyPoints(
  sectionContent: string,
  max = 3
): string[] {
  const lines = sectionContent.split("\n");
  const points: string[] = [];
  for (const line of lines) {
    const match = line.match(/^-\s+(.+)/);
    if (match) {
      points.push(match[1].trim());
      if (points.length >= max) break;
    }
  }
  return points;
}
