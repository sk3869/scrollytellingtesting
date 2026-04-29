import React from "react";

interface StatGridProps {
  children: string;
}

interface StatItem {
  value: string;
  label: string;
}

function parseStats(source: string): StatItem[] {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      if (parts.length >= 2) {
        return { value: parts[0].trim(), label: parts[1].trim() };
      }
      return null;
    })
    .filter((item): item is StatItem => item !== null);
}

export function StatGrid({ children }: StatGridProps) {
  const stats = parseStats(children);
  if (stats.length === 0) return null;

  return (
    <div className="stat-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-grid__item">
          <span className="stat-grid__value">{stat.value}</span>
          <span className="stat-grid__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
