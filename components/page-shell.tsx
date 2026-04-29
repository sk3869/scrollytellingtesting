import React, { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">
        <div className="shell-band">{children}</div>
      </main>
      <SiteFooter mode="standard" />
    </div>
  );
}
