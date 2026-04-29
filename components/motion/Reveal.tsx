"use client";

import React from "react";
import { motion, useReducedMotion, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useSlideContext } from "./SlideContext";

type Direction = "up" | "down" | "left" | "right" | "none";
type Sequence = "standard" | "delayed";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  sequence?: Sequence;
}

function getOffset(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case "up":    return { y: 24 };
    case "down":  return { y: -24 };
    case "left":  return { x: 24 };
    case "right": return { x: -24 };
    default:      return {};
  }
}

function SlideReveal({ children, className, direction = "up", delay = 0, sequence = "standard" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const slideContext = useSlideContext();
  const scrollYProgress = slideContext?.scrollYProgress;

  const startThreshold =
    sequence === "delayed"
      ? 0.52 + delay * 0.04
      : Math.min(0.08 + delay * 0.32, 0.46);
  const endThreshold = Math.min(startThreshold + 0.28, 0.95);

  const opacity = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [0, 1]
  );
  const offset = getOffset(direction);
  const y = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [offset.y ?? 0, 0]
  );
  const x = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [offset.x ?? 0, 0]
  );

  const style = prefersReducedMotion || direction === "none" ? undefined : { opacity, x, y };

  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
}

function ViewportReveal({ children, className, direction = "up", delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });
  const offset = getOffset(direction);

  if (prefersReducedMotion || direction === "none") {
    return <div className={className} ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal(props: RevealProps) {
  const slideContext = useSlideContext();
  if (slideContext?.scrollYProgress) {
    return <SlideReveal {...props} />;
  }
  return <ViewportReveal {...props} />;
}
