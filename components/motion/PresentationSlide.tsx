'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { SlideContext } from './SlideContext';

interface PresentationSlideProps {
  children: React.ReactNode;
  index: number;
  backgroundColor: string;
  hasBackground?: boolean;
}

export function PresentationSlide({
  children,
  index,
  backgroundColor,
  hasBackground = false,
}: PresentationSlideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const slideHeight = hasBackground ? '200vh' : '170vh';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contextValue =
    index === 0 ? { scrollYProgress: null } : { scrollYProgress };

  return (
    <SlideContext.Provider value={contextValue}>
      <section
        ref={sectionRef}
        id={`slide-${index + 1}`}
        data-presentation-slide="true"
        data-slide-index={index}
        style={{
          height: slideHeight,
          width: '100%',
          position: 'relative',
          zIndex: index,
          backgroundColor,
        }}
      >
        <div
          style={{
            height: '100vh',
            width: '100%',
            position: 'sticky',
            top: 0,
          }}
          className="presentation-slide__stage"
        >
          {children}
        </div>
      </section>
    </SlideContext.Provider>
  );
}
