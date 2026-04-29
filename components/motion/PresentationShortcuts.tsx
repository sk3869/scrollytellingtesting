"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  firstSlide,
  getActiveSlideIndex,
  goToSlide,
  lastSlide,
  nextSlide,
  prevSlide,
} from "./presentation-nav";

interface PresentationShortcutsProps {
  slidesCount: number;
}

type Shortcut = { keys: string[]; description: string };

const SHORTCUTS: Shortcut[] = [
  { keys: ["→", "↓", "j", "Space", "PgDn"], description: "Next slide" },
  { keys: ["←", "↑", "k", "PgUp"], description: "Previous slide" },
  { keys: ["Home", "g"], description: "Jump to first slide" },
  { keys: ["End", "G"], description: "Jump to last slide" },
  { keys: ["1–9", "then Enter"], description: "Jump to slide number" },
  { keys: ["/"], description: "Open command palette" },
  { keys: ["?"], description: "Show this help" },
  { keys: ["Esc"], description: "Close overlay" },
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function PresentationShortcuts({ slidesCount }: PresentationShortcutsProps) {
  const [overlay, setOverlay] = useState<"none" | "help" | "palette">("none");
  const [paletteValue, setPaletteValue] = useState("");
  const [numberBuffer, setNumberBuffer] = useState("");
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const bufferTimer = useRef<number | null>(null);

  const closeOverlay = useCallback(() => {
    setOverlay("none");
    setPaletteValue("");
  }, []);

  const openPalette = useCallback(() => {
    setOverlay("palette");
    setPaletteValue("");
    requestAnimationFrame(() => paletteInputRef.current?.focus());
  }, []);

  const pushBuffer = useCallback((ch: string) => {
    setNumberBuffer((prev) => (prev + ch).slice(-3));
    if (bufferTimer.current) window.clearTimeout(bufferTimer.current);
    bufferTimer.current = window.setTimeout(() => setNumberBuffer(""), 1200);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (overlay !== "none") {
        if (event.key === "Escape") { event.preventDefault(); closeOverlay(); }
        return;
      }
      if (isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      switch (event.key) {
        case "?": event.preventDefault(); setOverlay("help"); return;
        case "/": event.preventDefault(); openPalette(); return;
        case "Escape": closeOverlay(); return;
        case "ArrowRight": case "ArrowDown": case "PageDown": case "j": case " ":
          event.preventDefault(); nextSlide(); return;
        case "ArrowLeft": case "ArrowUp": case "PageUp": case "k":
          event.preventDefault(); prevSlide(); return;
        case "Home": event.preventDefault(); firstSlide(); return;
        case "End": event.preventDefault(); lastSlide(); return;
        case "g": event.preventDefault(); firstSlide(); return;
        case "G": event.preventDefault(); lastSlide(); return;
        case "Enter":
          if (numberBuffer) {
            event.preventDefault();
            const n = parseInt(numberBuffer, 10);
            if (!Number.isNaN(n)) goToSlide(n);
            setNumberBuffer("");
          }
          return;
      }
      if (/^[0-9]$/.test(event.key)) { event.preventDefault(); pushBuffer(event.key); }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [overlay, numberBuffer, closeOverlay, openPalette, pushBuffer]);

  const submitPalette = () => {
    const trimmed = paletteValue.trim();
    if (!trimmed) { closeOverlay(); return; }
    const asNumber = parseInt(trimmed, 10);
    if (!Number.isNaN(asNumber)) { goToSlide(asNumber); closeOverlay(); return; }
    const lower = trimmed.toLowerCase();
    if (lower === "first" || lower === "home" || lower === "top") firstSlide();
    else if (lower === "last" || lower === "end") lastSlide();
    else if (lower === "next") nextSlide();
    else if (lower === "prev" || lower === "previous" || lower === "back") prevSlide();
    else if (lower === "help" || lower === "?") {
      setOverlay("help"); setPaletteValue(""); return;
    }
    closeOverlay();
  };

  return (
    <>
      {numberBuffer && (
        <div className="presentation-number-buffer" aria-live="polite">
          Jump to slide <strong>{numberBuffer}</strong>{" "}
          <span>— press Enter</span>
        </div>
      )}

      {overlay === "palette" && (
        <div
          className="presentation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={(e) => { if (e.target === e.currentTarget) closeOverlay(); }}
        >
          <div className="presentation-palette">
            <label className="presentation-palette__label" htmlFor="palette-input">
              Jump to slide
            </label>
            <input
              id="palette-input"
              ref={paletteInputRef}
              className="presentation-palette__input"
              value={paletteValue}
              onChange={(e) => setPaletteValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); submitPalette(); }
                else if (e.key === "Escape") { e.preventDefault(); closeOverlay(); }
              }}
              placeholder={`Slide number (1–${slidesCount}), or: first, last, next, prev`}
              autoComplete="off"
              spellCheck={false}
            />
            <div className="presentation-palette__hint">
              Current: {String(getActiveSlideIndex()).padStart(2, "0")} / {String(slidesCount).padStart(2, "0")} · Enter to go · Esc to close
            </div>
          </div>
        </div>
      )}

      {overlay === "help" && (
        <div
          className="presentation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          onClick={(e) => { if (e.target === e.currentTarget) closeOverlay(); }}
        >
          <div className="presentation-help">
            <div className="presentation-help__header">
              <h2 className="presentation-help__title">Keyboard shortcuts</h2>
              <button
                type="button"
                className="presentation-help__close"
                onClick={closeOverlay}
                aria-label="Close"
              >×</button>
            </div>
            <dl className="presentation-help__list">
              {SHORTCUTS.map((shortcut) => (
                <div key={shortcut.description} className="presentation-help__row">
                  <dt className="presentation-help__keys">
                    {shortcut.keys.map((k) => <kbd key={k}>{k}</kbd>)}
                  </dt>
                  <dd className="presentation-help__desc">{shortcut.description}</dd>
                </div>
              ))}
            </dl>
            <p className="presentation-help__footnote">
              Click the slide counter on the right edge to edit it inline.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
