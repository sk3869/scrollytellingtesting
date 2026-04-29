import React from "react";
import Link from "next/link";
import { resolveRoute } from "@/lib/site-config";

interface ContextualLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  returnTo?: string;
}

export function ContextualLink({ href, children, className, returnTo }: ContextualLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  const resolvedHref = resolveRoute(
    returnTo ? `${href}?returnTo=${encodeURIComponent(returnTo)}` : href
  );

  return (
    <Link href={resolvedHref} className={className}>
      {children}
    </Link>
  );
}
