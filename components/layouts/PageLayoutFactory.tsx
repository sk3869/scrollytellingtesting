import React from "react";
import { PageData } from "../../lib/content/schema";
import { StandardLayout } from "./StandardLayout";
import { PresentationLayout } from "./PresentationLayout";

interface FactoryProps {
  page: PageData;
}

export function PageLayoutFactory({ page }: FactoryProps) {
  switch (page.frontmatter.layout) {
    case "presentation":
      return <PresentationLayout page={page} />;
    case "standard":
    default:
      return <StandardLayout page={page} />;
  }
}
