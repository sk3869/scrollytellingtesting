"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useTransform, useInView } from "framer-motion";
import { useSlideContext } from "./SlideContext";

type Intensity = "soft" | "medium";
type Sequence = "standard" | "delayed";

interface DriftMediaProps {
  children: React.ReactNode;
  className?: string;
  intensity?: Intensity;
  sequence?: Sequence;
}

const INTENSITY_MAP = {
  soft:   { yRange: 18, scaleRange: 1.04 },
  medium: { yRange: 28, scaleRange: 1.08 },
};

function SlideDriftMedia({ children, className, intensity = "medium", sequence = "standard" }: DriftMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const slideContext = useSlideContext();
  const scrollYProgress = slideContext?.scrollYProgress;
  const { yRange, scaleRange } = INTENSITY_MAP[intensity];

  const startThreshold = sequence === "delayed" ? 0.54 : 0.08;
  const endThreshold   = sequence === "delayed" ? 0.92 : 0.82;

  const opacity = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, Math.min(startThreshold + 0.15, endThreshold)],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [yRange, 0]
  );
  const scale = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [scaleRange, 1]
  );

  const style = prefersReducedMotion ? undefined : { opacity, y, scale };

  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
}

function ViewportDriftMedia({ children, className, intensity = "medium" }: DriftMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const { yRange, scaleRange } = INTENSITY_MAP[intensity];

  if (prefersReducedMotion) {
    return <div className={className} ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yRange, scale: scaleRange }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function DriftMedia(props: DriftMediaProps) {
  const slideContext = useSlideContext();
  if (slideContext?.scrollYProgress) {
    return <SlideDriftMedia {...props} />;
  }
  return <ViewportDriftMedia {...props} />;
}
