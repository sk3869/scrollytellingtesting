import React from "react";
import { PageData } from "../../lib/content/schema";
import { MarkdownRenderer } from "../markdown/MarkdownRenderer";
import { DriftMedia } from "../motion/DriftMedia";
import { LayeredRevealGroup } from "../motion/LayeredRevealGroup";
import { splitMarkdownIntoSlides, SlideNode } from "../../lib/content/parser";
import { ParallaxBackground } from "../motion/ParallaxBackground";
import { PresentationProgress } from "../motion/PresentationProgress";
import { PresentationShortcuts } from "../motion/PresentationShortcuts";
import { PresentationFooterGate } from "../motion/PresentationFooterGate";
import { PresentationSlide } from "../motion/PresentationSlide";
import { SceneCard } from "../motion/SceneCard";
import { SiteFooter } from "../site-footer";
import { resolveRoute } from "@/lib/site-config";

interface LayoutProps {
  page: PageData;
}

const SplitLayoutBlock = ({
  slide,
  textWrapperClass,
}: {
  slide: SlideNode;
  textWrapperClass: string;
}) => {
  const mediaSrc = slide.splitSrc || slide.splitReverseSrc || undefined;
  const isLogo = !!mediaSrc && /logo|_icon\./i.test(mediaSrc);
  return (
    <>
      <div className="ambient-glow" />
      <div
        className={`split-layout-wrapper ${slide.splitReverseSrc ? "split-layout--reversed" : ""}`}
      >
        <div className="split-layout">
          <div className="split-layout__content">
            <LayeredRevealGroup direction="up" sequence="standard" stagger={0.1}>
              <div className={textWrapperClass}>
                <MarkdownRenderer source={slide.cleanContent} layout="presentation" />
              </div>
            </LayeredRevealGroup>
          </div>
          <div
            className={`split-layout__media gpu-accelerated ${isLogo ? "split-layout__media--logo" : ""}`}
          >
            <DriftMedia intensity="medium" sequence="standard" className="h-full">
              <img
                src={mediaSrc ? resolveRoute(mediaSrc) : mediaSrc}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: isLogo ? "contain" : "cover",
                }}
              />
            </DriftMedia>
          </div>
        </div>
      </div>
    </>
  );
};

const StandardLayoutBlock = ({
  slide,
  textWrapperClass,
  hasBackground,
}: {
  slide: SlideNode;
  textWrapperClass: string;
  hasBackground: boolean;
}) => {
  return (
    <div
      className={`presentation-copy-frame ${
        hasBackground
          ? "presentation-copy-frame--background"
          : "presentation-copy-frame--standard"
      }`}
    >
      <SceneCard variant="section" sequence="standard">
        <div
          className={`${textWrapperClass} ${
            hasBackground
              ? "presentation-background-panel"
              : "presentation-standard-panel"
          }`.trim()}
        >
          <MarkdownRenderer source={slide.cleanContent} layout="presentation" />
        </div>
      </SceneCard>
    </div>
  );
};

export function PresentationLayout({ page }: LayoutProps) {
  const slides: SlideNode[] = splitMarkdownIntoSlides(page.content);

  return (
    <main className="presentation-main" style={{ width: "100%", position: "relative" }}>
      <PresentationProgress slidesCount={slides.length} />
      <PresentationShortcuts slidesCount={slides.length} />
      <PresentationFooterGate slidesCount={slides.length} />

      {slides.map((slide, index) => {
        const hasBackground = !!slide.backgroundSrc;
        const textWrapperClass = hasBackground
          ? "theme-dark glass-panel glass-panel--dark"
          : "";

        return (
          <PresentationSlide
            key={index}
            index={index}
            backgroundColor={hasBackground ? "#000" : "#f5f1ea"}
            hasBackground={hasBackground}
          >
            {slide.backgroundSrc && (
              <ParallaxBackground
                src={slide.backgroundSrc}
                alt={`Slide ${index + 1} background`}
                mode={index === 0 ? "opening" : "standard"}
                focal={slide.backgroundFocal}
              />
            )}

            <div
              style={{
                width: "100%",
                zIndex: 10,
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {slide.splitSrc || slide.splitReverseSrc ? (
                <SplitLayoutBlock
                  slide={slide}
                  textWrapperClass={textWrapperClass}
                />
              ) : (
                <StandardLayoutBlock
                  slide={slide}
                  textWrapperClass={textWrapperClass}
                  hasBackground={hasBackground}
                />
              )}
            </div>
          </PresentationSlide>
        );
      })}

      <SiteFooter mode="presentation" />
    </main>
  );
}
