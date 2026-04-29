"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

interface SlideContextType {
  scrollYProgress: MotionValue<number> | null;
}

export const SlideContext = createContext<SlideContextType | null>(null);

export function useSlideContext(): SlideContextType | null {
  return useContext(SlideContext);
}
