import React from "react";
import Link from "next/link";
import { resolveRoute } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href={resolveRoute("/")} className="site-header__title">
        Alzheimer&apos;s Disease
      </Link>
      <nav aria-label="Primary">
        <ul className="site-header__nav">
          <li><span className="site-header__nav-item">Research</span></li>
          <li><span className="site-header__nav-item">Prevention</span></li>
          <li><span className="site-header__nav-item">Resources</span></li>
        </ul>
      </nav>
    </header>
  );
}
