"use client";

import React from "react";
import { Reveal } from "./Reveal";

type Direction = "up" | "down" | "left" | "right" | "none";
type Sequence = "standard" | "delayed";

interface LayeredRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  sequence?: Sequence;
  stagger?: number;
}

export function LayeredRevealGroup({
  children,
  className,
  direction = "up",
  sequence = "standard",
  stagger = 0.08,
}: LayeredRevealGroupProps) {
  const validChildren = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={className}>
      {validChildren.map((child, index) => (
        <Reveal
          key={index}
          direction={direction}
          sequence={sequence}
          delay={index * stagger}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
