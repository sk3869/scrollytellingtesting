import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { CallToActionGroup } from "../ui/CallToActionGroup";
import { SourceLine } from "../ui/SourceLine";
import { StatGrid } from "../visualization/StatGrid";
import { resolveRoute } from "@/lib/site-config";

type Layout = "standard" | "presentation";

interface MarkdownRendererProps {
  source: string;
  layout?: Layout;
}

function makeComponents(layout: Layout) {
  const isPresentation = layout === "presentation";

  return {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={1} {...props}>{children}</Heading>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={2} {...props}>{children}</Heading>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={3} {...props}>{children}</Heading>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={4} {...props}>{children}</Heading>
    ),
    h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={5} {...props}>{children}</Heading>
    ),
    h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <Heading level={6} {...props}>{children}</Heading>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) =>
      isPresentation ? (
        <div className="text-body" {...props}>{children}</div>
      ) : (
        <Text {...props}>{children}</Text>
      ),
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (!href) return <a {...props}>{children}</a>;
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={resolveRoute(href)} {...props}>
          {children}
        </Link>
      );
    },
    pre: ({ children }: { children?: React.ReactNode }) => {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        children?: string;
      }>;
      const lang = child?.props?.className?.replace("language-", "") ?? "";
      const content = child?.props?.children ?? "";

      if (lang === "cta") {
        return <CallToActionGroup>{String(content).trim()}</CallToActionGroup>;
      }
      if (lang === "source-line") {
        return <SourceLine>{String(content).trim()}</SourceLine>;
      }
      if (lang === "stat-grid") {
        return <StatGrid>{String(content).trim()}</StatGrid>;
      }

      return (
        <pre className={`code-block language-${lang}`}>
          {children}
        </pre>
      );
    },
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table>{children}</table>
      </div>
    ),
  };
}

export async function MarkdownRenderer({ source, layout = "standard" }: MarkdownRendererProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={makeComponents(layout)}
    />
  );
}
