"use client";

import React, { useEffect, useRef, useState } from "react";
import { goToSlide } from "./presentation-nav";

interface PresentationProgressProps {
  slidesCount: number;
}

const VISIBLE_DOTS = 6;

export function PresentationProgress({ slidesCount }: PresentationProgressProps) {
  const [reelPosition, setReelPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updatePosition = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-presentation-slide='true']")
      );
      if (sections.length === 0) return;

      const viewportHeight = window.innerHeight;
      let nextPosition = 0;

      for (let index = 1; index < sections.length; index += 1) {
        const top = sections[index].getBoundingClientRect().top;
        if (top <= viewportHeight) {
          const normalizedTop = Math.min(Math.max(top, 0), viewportHeight);
          nextPosition = Math.max(nextPosition, index - normalizedTop / viewportHeight);
        }
      }

      const clampedPosition = Math.min(sections.length - 1, Math.max(0, nextPosition));
      const snappedIndex = Math.round(clampedPosition);

      setReelPosition((current) =>
        Math.abs(current - clampedPosition) < 0.001 ? current : clampedPosition
      );
      setActiveIndex((current) => (current === snappedIndex ? current : snappedIndex));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updatePosition);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [slidesCount]);

  const dots = Array.from({ length: slidesCount }, (_, index) => index);
  const viewportOffset = (Math.min(VISIBLE_DOTS, slidesCount) - 1) / 2;
  const visibleDots = Math.min(VISIBLE_DOTS, slidesCount);
  const maxWindowStart = Math.max(0, slidesCount - visibleDots);
  const clampedWindowStart = Math.min(
    Math.max(reelPosition - viewportOffset, 0),
    maxWindowStart
  );
  const renderedWindowStart = Math.floor(clampedWindowStart);
  const fractionalOffset = clampedWindowStart - renderedWindowStart;
  const markerOffset = reelPosition - clampedWindowStart;
  const visibleDotIndices = dots.slice(
    renderedWindowStart,
    renderedWindowStart + visibleDots
  );

  const handleDotClick = (index: number) => goToSlide(index + 1);

  const beginEdit = () => {
    setDraft(String(activeIndex + 1));
    setIsEditing(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const commitEdit = () => {
    const parsed = parseInt(draft, 10);
    if (!Number.isNaN(parsed)) goToSlide(parsed);
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  return (
    <div
      className="presentation-progress"
      aria-label={`Slide ${activeIndex + 1} of ${slidesCount}`}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={slidesCount}
      aria-valuenow={activeIndex + 1}
    >
      <div
        className={`presentation-progress__count${isEditing ? " presentation-progress__count--editing" : ""}`}
        onClick={() => { if (!isEditing) beginEdit(); }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (!isEditing && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            beginEdit();
          }
        }}
        aria-label={`Slide ${activeIndex + 1} of ${slidesCount}. Click to jump.`}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            className="presentation-progress__count-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={slidesCount}
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); commitEdit(); }
              else if (e.key === "Escape") { e.preventDefault(); cancelEdit(); }
            }}
            aria-label="Jump to slide number"
          />
        ) : (
          <span className="presentation-progress__count-current">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
        )}
        <span className="presentation-progress__count-separator">/</span>
        <span className="presentation-progress__count-total">
          {String(slidesCount).padStart(2, "0")}
        </span>
      </div>

      <div className="presentation-progress__window">
        <div
          className="presentation-progress__track"
          style={{
            transform: `translate(-50%, calc(${fractionalOffset * -1} * var(--presentation-progress-pitch)))`,
          }}
        >
          {visibleDotIndices.map((index) => {
            const distance = Math.abs(index - reelPosition);
            const opacity = Math.max(0.42, 1 - distance * 0.18);
            const scale = Math.max(0.82, 1.12 - distance * 0.06);
            const isLocked = Math.abs(index - reelPosition) < 0.04;
            return (
              <button
                key={`dot-${index}`}
                type="button"
                className={`presentation-progress__dot${isLocked ? " presentation-progress__dot--locked" : ""}`}
                style={{ opacity, transform: `scale(${scale})` }}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={activeIndex === index}
              />
            );
          })}
        </div>

        <div
          className="presentation-progress__marker"
          aria-hidden="true"
          style={{
            transform: `translate(-50%, calc(${markerOffset} * var(--presentation-progress-pitch)))`,
          }}
        >
          <div className="presentation-progress__active-dot" />
        </div>
      </div>
    </div>
  );
}
