import React from "react";
import { PageData } from "../../lib/content/schema";
import { PageShell } from "../page-shell";
import { MarkdownRenderer } from "../markdown/MarkdownRenderer";
import { splitDepthPageContent } from "@/lib/content/depth-page";
import { Heading } from "../ui/heading";

interface LayoutProps {
  page: PageData;
}

export function StandardLayout({ page }: LayoutProps) {
  const { intro, sections } = splitDepthPageContent(page.content);

  return (
    <PageShell>
      <div className="standard-layout">
        <div className="standard-layout__hero">
          <Heading level={1}>{page.frontmatter.title}</Heading>
          {intro && (
            <div style={{ marginTop: "1.5rem" }}>
              <MarkdownRenderer source={intro} layout="standard" />
            </div>
          )}
        </div>

        <div className="standard-layout__body">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="standard-layout__section">
              <Heading level={2}>{section.title}</Heading>
              <div style={{ marginTop: "1rem" }}>
                <MarkdownRenderer source={section.content} layout="standard" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
