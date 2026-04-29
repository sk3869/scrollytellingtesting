import React from "react";
import Link from "next/link";
import { resolveRoute } from "@/lib/site-config";

interface SiteFooterProps {
  mode?: "standard" | "presentation";
}

const PRESENTATION_LINKS = [
  { label: "Alzheimer's Association", href: "https://www.alz.org", external: true },
  { label: "NIH Alzheimer's", href: "https://www.nia.nih.gov/health/alzheimers-and-dementia", external: true },
  { label: "WHO Dementia", href: "https://www.who.int/news-room/fact-sheets/detail/dementia", external: true },
  { label: "Home", href: "/", external: false },
];

const STANDARD_LINKS = [
  { label: "Home", href: "/", external: false },
  { label: "Alzheimer's Association", href: "https://www.alz.org", external: true },
  { label: "NIH National Institute on Aging", href: "https://www.nia.nih.gov/health/alzheimers-and-dementia", external: true },
  { label: "WHO Dementia Fact Sheet", href: "https://www.who.int/news-room/fact-sheets/detail/dementia", external: true },
  { label: "Lancet Commission 2020", href: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30367-6/fulltext", external: true },
];

export function SiteFooter({ mode = "standard" }: SiteFooterProps) {
  const links = mode === "presentation" ? PRESENTATION_LINKS : STANDARD_LINKS;

  return (
    <footer className={`site-footer site-footer--${mode}`}>
      <div className="site-footer__inner">
        {mode === "presentation" ? (
          <span className="site-footer__folio">
            Alzheimer&apos;s Disease / Understanding the Causes
          </span>
        ) : (
          <div>
            <p className="site-footer__folio">Alzheimer&apos;s Disease: Understanding the Causes</p>
          </div>
        )}

        <div>
          <p className="site-footer__eyebrow">
            {mode === "presentation" ? "Resources" : "Further reading"}
          </p>
          <ul className="site-footer__links">
            {links.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    className="site-footer__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={resolveRoute(link.href)}
                    className="site-footer__link"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
