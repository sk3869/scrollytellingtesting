"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useTransform, useInView } from "framer-motion";
import { useSlideContext } from "./SlideContext";

type Variant = "section" | "emphasis" | "cta";
type Sequence = "standard" | "delayed";

interface SceneCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  sequence?: Sequence;
}

const VARIANT_MAP: Record<Variant, { yOffset: number; scaleStart: number }> = {
  section:  { yOffset: 28, scaleStart: 0.97 },
  emphasis: { yOffset: 20, scaleStart: 0.98 },
  cta:      { yOffset: 16, scaleStart: 0.99 },
};

function SlideSceneCard({ children, className, variant = "section", delay = 0, sequence = "standard" }: SceneCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const slideContext = useSlideContext();
  const scrollYProgress = slideContext?.scrollYProgress;
  const { yOffset, scaleStart } = VARIANT_MAP[variant];

  const startThreshold =
    sequence === "delayed"
      ? 0.52
      : Math.min(0.08 + delay * 0.32, 0.46);
  const endThreshold = Math.min(startThreshold + 0.32, 0.92);

  const opacity = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [yOffset, 0]
  );
  const scale = useTransform(
    scrollYProgress ?? { get: () => 0, subscribe: () => () => {} } as never,
    [startThreshold, endThreshold],
    [scaleStart, 1]
  );

  const style = prefersReducedMotion ? undefined : { opacity, y, scale };

  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
}

function ViewportSceneCard({ children, className, variant = "section", delay = 0 }: SceneCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-8% 0px" });
  const { yOffset, scaleStart } = VARIANT_MAP[variant];

  if (prefersReducedMotion) {
    return <div className={className} ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, scale: scaleStart }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SceneCard(props: SceneCardProps) {
  const slideContext = useSlideContext();
  if (slideContext?.scrollYProgress) {
    return <SlideSceneCard {...props} />;
  }
  return <ViewportSceneCard {...props} />;
}
