"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { AnimationSpeed, AnimationStyle, FontStyle, TextDesign } from "./types";

interface AnimationPreviewProps {
  text: string;
  style: AnimationStyle;
  speed: AnimationSpeed;
  fontSize: number;
  fontClassName: string;
  fontStyle: FontStyle;
  textDesign: TextDesign;
  textDesignClassName: string;
}

const speedMultiplier: Record<AnimationSpeed, number> = {
  slow: 1.45,
  medium: 1,
  fast: 0.7,
};

const sampleFallback = "Animate your ideas in motion";

export function AnimationPreview({
  text,
  style,
  speed,
  fontSize,
  fontClassName,
  fontStyle,
  textDesign,
  textDesignClassName,
}: AnimationPreviewProps) {
  const displayText = text.trim() || sampleFallback;
  const letters = useMemo(() => Array.from(displayText), [displayText]);
  const durationScale = speedMultiplier[speed];
  const previewCanvasRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewFontSize = `clamp(${isFullscreen ? "3rem" : "2rem"}, ${isFullscreen ? "10vw" : "8vw"}, ${fontSize}px)`;
  const previewVerticalFontSize = `clamp(${isFullscreen ? "2rem" : "1.5rem"}, ${isFullscreen ? "8vw" : "6vw"}, ${Math.max(
    28,
    fontSize * 0.72,
  )}px)`;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === previewCanvasRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!previewCanvasRef.current) {
      return;
    }

    if (document.fullscreenElement === previewCanvasRef.current) {
      await document.exitFullscreen();
      return;
    }

    await previewCanvasRef.current.requestFullscreen();
  };

  return (
    <div className="glass-panel min-w-0 overflow-hidden rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-[color:var(--muted)]">Preview</p>
          <h3 className="text-sm font-semibold text-[color:var(--foreground)]">Live Output</h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <span
            data-testid="selected-style-badge"
            className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs uppercase tracking-wide text-[color:var(--muted)]"
          >
            {style}
          </span>
          <span className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs uppercase tracking-wide text-[color:var(--muted)]">
            {fontStyle}
          </span>
          <span className="rounded-md border border-[color:var(--border)] px-2 py-1 text-xs uppercase tracking-wide text-[color:var(--muted)]">
            {textDesign}
          </span>
          <motion.button
            type="button"
            onClick={() => void toggleFullscreen()}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md border border-[color:var(--accent-border)] bg-[color:var(--accent-soft)] px-2 py-1 text-xs font-medium text-[color:var(--accent)] transition hover:opacity-80"
          >
            {isFullscreen ? "Exit" : "Fullscreen"}
          </motion.button>
        </div>
      </div>

      <div
        ref={previewCanvasRef}
        data-testid="preview-canvas"
        className={`preview-grid relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-6 ${isFullscreen ? "min-h-screen rounded-none border-0 px-8 py-12" : "min-h-[220px] sm:min-h-[300px] lg:min-h-[360px]"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${style}-${displayText}-${speed}-${fontSize}-${fontStyle}-${isFullscreen ? "fs" : "windowed"}`}
            initial={{ opacity: 0, filter: "blur(8px)", scale: 0.985 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.985 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center"
          >
            {style === "rolling" && (
              <RollingText
                text={displayText}
                fontSize={previewFontSize}
                durationScale={durationScale}
                fontClassName={fontClassName}
                textDesignClassName={textDesignClassName}
              />
            )}
            {style === "vertical" && (
              <VerticalScrollText
                text={displayText}
                fontSize={previewVerticalFontSize}
                durationScale={durationScale}
                fontClassName={fontClassName}
                textDesignClassName={textDesignClassName}
              />
            )}
            {style === "typing" && (
              <TypingText
                text={displayText}
                fontSize={previewFontSize}
                durationScale={durationScale}
                fontClassName={fontClassName}
                textDesignClassName={textDesignClassName}
              />
            )}
            {style === "wave" && (
              <WaveText
                letters={letters}
                fontSize={previewFontSize}
                durationScale={durationScale}
                fontClassName={fontClassName}
                textDesignClassName={textDesignClassName}
              />
            )}
            {style === "fade" && (
              <FadeSlideText
                letters={letters}
                fontSize={previewFontSize}
                durationScale={durationScale}
                fontClassName={fontClassName}
                textDesignClassName={textDesignClassName}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function RollingText({
  text,
  fontSize,
  durationScale,
  fontClassName,
  textDesignClassName,
}: {
  text: string;
  fontSize: string;
  durationScale: number;
  fontClassName: string;
  textDesignClassName: string;
}) {
  const repeated = Array.from({ length: 4 }, () => text);
  const textClassName = `${fontClassName} ${textDesignClassName}`;

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="marquee-track flex items-center gap-12 whitespace-nowrap font-semibold uppercase tracking-[0.18em]"
        style={{ fontSize }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 10 * durationScale,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className={textClassName}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function VerticalScrollText({
  text,
  fontSize,
  durationScale,
  fontClassName,
  textDesignClassName,
}: {
  text: string;
  fontSize: string;
  durationScale: number;
  fontClassName: string;
  textDesignClassName: string;
}) {
  const repeated = Array.from({ length: 5 }, () => text);
  const textClassName = `${fontClassName} ${textDesignClassName}`;

  return (
    <div className="relative flex h-[260px] items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--surface-strong)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--surface-strong)] to-transparent" />
      <motion.div
        className="flex flex-col items-center gap-8 font-medium uppercase tracking-[0.22em]"
        style={{ fontSize }}
        animate={{ y: ["100%", "-100%"] }}
        transition={{
          duration: 12 * durationScale,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className={textClassName}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function TypingText({
  text,
  fontSize,
  durationScale,
  fontClassName,
  textDesignClassName,
}: {
  text: string;
  fontSize: string;
  durationScale: number;
  fontClassName: string;
  textDesignClassName: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setIsDone(false);

    const step = Math.max(40, 85 * durationScale);
    const interval = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= text.length) {
          window.clearInterval(interval);
          setIsDone(true);
          return current;
        }
        return current + 1;
      });
    }, step);

    return () => window.clearInterval(interval);
  }, [text, durationScale]);

  return (
    <div
      className={`flex min-w-0 max-w-full items-center justify-center text-center font-semibold tracking-tight ${fontClassName}`}
      style={{ fontSize }}
    >
      <span className={`${textDesignClassName} break-words [overflow-wrap:anywhere]`}>
        {text.slice(0, visibleCount)}
      </span>
      {!isDone && (
        <motion.span
          aria-hidden
          className="ml-1 inline-block h-[1.05em] w-[3px] rounded-full bg-[color:var(--accent)]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </div>
  );
}

function WaveText({
  letters,
  fontSize,
  durationScale,
  fontClassName,
  textDesignClassName,
}: {
  letters: string[];
  fontSize: string;
  durationScale: number;
  fontClassName: string;
  textDesignClassName: string;
}) {
  return (
    <div
      className={`flex max-w-full flex-wrap items-center justify-center gap-y-3 break-words text-center font-semibold tracking-tight [overflow-wrap:anywhere] ${fontClassName}`}
      style={{ fontSize }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className={`wave-letter ${textDesignClassName}`}
          animate={{ y: [0, -16, 0, 10, 0] }}
          transition={{
            duration: 1.6 * durationScale,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.05,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}

function FadeSlideText({
  letters,
  fontSize,
  durationScale,
  fontClassName,
  textDesignClassName,
}: {
  letters: string[];
  fontSize: string;
  durationScale: number;
  fontClassName: string;
  textDesignClassName: string;
}) {
  return (
    <div
      className={`flex max-w-full flex-wrap items-center justify-center gap-y-3 break-words text-center font-semibold tracking-tight [overflow-wrap:anywhere] ${fontClassName}`}
      style={{ fontSize }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6 * durationScale,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.045 * durationScale,
          }}
          className={`wave-letter ${textDesignClassName}`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
