"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { resolveRoute } from "@/lib/site-config";

interface CallToActionGroupProps {
  children: string;
}

function parseLinks(source: string): Array<{ text: string; href: string }> {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: Array<{ text: string; href: string }> = [];
  let match;
  while ((match = regex.exec(source)) !== null) {
    links.push({ text: match[1], href: match[2] });
  }
  return links;
}

export function CallToActionGroup({ children }: CallToActionGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const links = parseLinks(children);
  if (links.length === 0) return null;

  const getReturnAnchor = (): string => {
    if (typeof document === "undefined") return "";
    const el = containerRef.current?.closest("[data-presentation-slide='true']");
    if (!el) return "";
    const idx = el.getAttribute("data-slide-index");
    return idx ? `#slide-${parseInt(idx, 10) + 1}` : "";
  };

  return (
    <div className="cta-group" ref={containerRef}>
      {links.map((link, i) => {
        const isExternal = link.href.startsWith("http");
        const isPrimary = i === 0;
        const className = `cta-link ${isPrimary ? "cta-link--primary" : ""}`.trim();

        const inner = (
          <>
            {link.text}
            <span className="cta-link__arrow" aria-hidden="true"> →</span>
          </>
        );

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {isExternal ? (
              <a
                href={link.href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <Link
                href={resolveRoute(link.href)}
                className={className}
                onClick={() => { void getReturnAnchor(); }}
              >
                {inner}
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
