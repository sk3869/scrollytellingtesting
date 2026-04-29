"use client";

import { useEffect } from "react";

export function PresentationFooterGate({ slidesCount }: { slidesCount: number }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    let frameId = 0;

    const update = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-presentation-slide='true']")
      );
      if (sections.length === 0) return;
      const vh = window.innerHeight;
      let active = 0;
      for (let i = 1; i < sections.length; i += 1) {
        const top = sections[i].getBoundingClientRect().top;
        if (top <= vh / 2) active = i;
      }
      const isFirst = active === 0;
      const isLast = active === sections.length - 1;
      body.classList.toggle("is-first-slide", isFirst);
      body.classList.toggle("is-last-slide", isLast);
      body.classList.toggle("is-middle-slide", !isFirst && !isLast);
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) cancelAnimationFrame(frameId);
      body.classList.remove("is-first-slide", "is-last-slide", "is-middle-slide");
    };
  }, [slidesCount]);

  return null;
}
