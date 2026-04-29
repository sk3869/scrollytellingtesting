import React from "react";
import { getSource } from "@/lib/sources";

interface SourceLineProps {
  children: string;
}

export function SourceLine({ children }: SourceLineProps) {
  const ids = children
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const sources = ids
    .map((id) => getSource(id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  if (sources.length === 0) return null;

  return (
    <aside className="source-line" aria-label="Sources">
      {sources.map((source, i) => (
        <React.Fragment key={source.id}>
          {i > 0 && "; "}
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              title={source.date}
            >
              {source.label}
            </a>
          ) : (
            <span>{source.label}</span>
          )}
        </React.Fragment>
      ))}
    </aside>
  );
}
