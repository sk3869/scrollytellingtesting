"use client";

import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useSlideContext } from "./SlideContext";
import { resolveRoute } from "@/lib/site-config";

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  mode?: "standard" | "opening";
  focal?: string | null;
}

export function ParallaxBackground({
  src,
  alt,
  mode = "standard",
  focal,
}: ParallaxBackgroundProps) {
  const slideContext = useSlideContext();
  const fallbackProgress = useMotionValue(0.5);
  const { scrollY } = useScroll();
  const scrollYProgress = slideContext?.scrollYProgress ?? fallbackProgress;

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(
    scrollYProgress,
    mode === "opening" ? [0, 0.35, 1] : [0, 1],
    mode === "opening" ? [1.12, 1.08, 1.02] : [1.16, 1.08]
  );

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityBlur = useTransform(smoothVelocity, [-1000, 0, 1000], [8, 0, 8]);
  const cinematicBlur = useTransform(
    scrollYProgress,
    mode === "opening" ? [0, 0.45, 0.75, 1] : [0, 1],
    mode === "opening" ? [0, 0, 1.5, 2] : [0, 0.8]
  );
  const blurValue = useTransform(() => velocityBlur.get() + cinematicBlur.get());
  const brightness = useTransform(
    scrollYProgress,
    mode === "opening" ? [0, 0.32, 0.68, 1] : [0, 1],
    mode === "opening" ? [1, 1, 0.72, 0.64] : [0.96, 0.78]
  );
  const contrast = useTransform(
    scrollYProgress,
    mode === "opening" ? [0, 0.65, 1] : [0, 1],
    mode === "opening" ? [1, 1.02, 1.08] : [1.02, 1.06]
  );
  const saturation = useTransform(
    scrollYProgress,
    mode === "opening" ? [0, 0.65, 1] : [0, 1],
    mode === "opening" ? [1, 0.92, 0.82] : [0.94, 0.86]
  );
  const tonalOverlayOpacity = useTransform(
    scrollYProgress,
    mode === "opening" ? [0.28, 0.62, 1] : [0.15, 1],
    mode === "opening" ? [0, 0.22, 0.4] : [0.1, 0.28]
  );
  const vignetteOpacity = useTransform(
    scrollYProgress,
    mode === "opening" ? [0.25, 0.7, 1] : [0.2, 1],
    mode === "opening" ? [0, 0.38, 0.55] : [0.18, 0.32]
  );
  const filter = useMotionTemplate`brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) blur(${blurValue}px)`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <motion.img
        className="gpu-accelerated"
        style={{
          y,
          filter,
          scale,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focal ?? "center",
          opacity: 1,
          transformOrigin: "center",
        }}
        src={resolveRoute(src)}
        alt={alt}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.14) 42%, rgba(10,10,10,0.4) 100%)",
          opacity: tonalOverlayOpacity,
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 36%, rgba(0,0,0,0.16) 62%, rgba(0,0,0,0.52) 100%)",
          opacity: vignetteOpacity,
        }}
      />
    </div>
  );
}
