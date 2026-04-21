"use client";

import { useEffect, useState, startTransition } from "react";
import { motion } from "framer-motion";

import { AnimationPreview } from "@/components/AnimationPreview";
import { StyleSelector } from "@/components/StyleSelector";
import { TextInput } from "@/components/TextInput";
import type {
  AnimationSpeed,
  AnimationStyle,
  FontOption,
  FontStyle,
  StyleOption,
  TextDesign,
  TextDesignOption,
} from "@/components/types";

const STYLE_OPTIONS: StyleOption[] = [
  { id: "rolling", label: "Rolling Text" },
  { id: "vertical", label: "Vertical Scroll" },
  { id: "typing", label: "Typewriter" },
  { id: "wave", label: "Wave Motion" },
  { id: "fade", label: "Fade + Slide" },
];

const FONT_OPTIONS: FontOption[] = [
  {
    id: "display",
    label: "Grotesk",
    description: "Modern SaaS headline energy.",
    className: "[font-family:var(--font-display)]",
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Elegant serif with dramatic contrast.",
    className: "[font-family:var(--font-playfair)]",
  },
  {
    id: "mono",
    label: "Mono",
    description: "Precision terminal-inspired rhythm.",
    className: "[font-family:var(--font-mono)]",
  },
  {
    id: "poster",
    label: "Poster",
    description: "Bold, expressive hero typography.",
    className: "[font-family:var(--font-syne)]",
  },
];

const TEXT_DESIGN_OPTIONS: TextDesignOption[] = [
  {
    id: "default",
    label: "Clean",
    description: "Crisp neutral text for minimal looks.",
    className: "text-design-default",
    swatchClassName: "design-swatch-default",
  },
  {
    id: "aurora",
    label: "Aurora",
    description: "Cool cyan-to-pink spectral gradient.",
    className: "text-design-aurora",
    swatchClassName: "design-swatch-aurora",
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Warm orange, coral, and gold blend.",
    className: "text-design-sunset",
    swatchClassName: "design-swatch-sunset",
  },
  {
    id: "neon",
    label: "Neon",
    description: "Electric glow with luminous edge light.",
    className: "text-design-neon",
    swatchClassName: "design-swatch-neon",
  },
  {
    id: "prism",
    label: "Prism",
    description: "High-energy multicolor poster effect.",
    className: "text-design-prism",
    swatchClassName: "design-swatch-prism",
  },
];

export default function Home() {
  const [draftText, setDraftText] = useState("Build motion that feels alive");
  const [animatedText, setAnimatedText] = useState("Build motion that feels alive");
  const [selectedStyle, setSelectedStyle] = useState<AnimationStyle>("rolling");
  const [speed, setSpeed] = useState<AnimationSpeed>("medium");
  const [fontSize, setFontSize] = useState(64);
  const [fontStyle, setFontStyle] = useState<FontStyle>("display");
  const [textDesign, setTextDesign] = useState<TextDesign>("aurora");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("text-animator-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    window.localStorage.setItem("text-animator-theme", theme);
  }, [theme]);

  const speedOptions = [
    { id: "slow" as const, label: "Slow" },
    { id: "medium" as const, label: "Medium" },
    { id: "fast" as const, label: "Fast" },
  ];

  const handleAnimate = () => {
    startTransition(() => {
      setAnimatedText(draftText);
    });
  };

  const activeFont = FONT_OPTIONS.find((option) => option.id === fontStyle) ?? FONT_OPTIONS[0];
  const activeTextDesign =
    TEXT_DESIGN_OPTIONS.find((option) => option.id === textDesign) ?? TEXT_DESIGN_OPTIONS[0];

  return (
    <main className="overflow-hidden">

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--accent)]">
              Textmorph
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            className="shrink-0 inline-flex items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:border-[color:var(--accent-border)] hover:text-[color:var(--foreground)]"
          >
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-4">
          <AnimationPreview
            text={animatedText}
            style={selectedStyle}
            speed={speed}
            fontSize={fontSize}
            fontClassName={activeFont.className}
            fontStyle={fontStyle}
            textDesign={textDesign}
            textDesignClassName={activeTextDesign.className}
          />

          <div className="grid items-start gap-4 xl:grid-cols-2">
            <TextInput
              draftText={draftText}
              onDraftChange={setDraftText}
              onSubmit={handleAnimate}
            />

            <StyleSelector
              selectedStyle={selectedStyle}
              options={STYLE_OPTIONS}
              onSelect={setSelectedStyle}
            />

            <div className="glass-panel rounded-2xl p-4">
              <h2 className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Speed & Size</h2>

              <div className="mb-3">
                <p className="mb-2 text-xs font-medium text-[color:var(--muted)]">Animation Speed</p>
                <div className="grid grid-cols-3 gap-2">
                  {speedOptions.map((option) => {
                    const active = option.id === speed;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => setSpeed(option.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-lg border py-2 text-sm font-medium transition ${
                          active
                            ? "btn-active text-[color:var(--foreground)]"
                            : "btn-inactive border-[color:var(--border)] text-[color:var(--muted)]"
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[color:var(--muted)]">Font Size</p>
                  <span className="text-xs text-[color:var(--muted)] [font-family:var(--font-mono)]">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={36}
                  max={104}
                  step={2}
                  value={fontSize}
                  onChange={(event) => setFontSize(Number(event.target.value))}
                  className="range-track h-2 w-full cursor-pointer appearance-none rounded-full accent-[color:var(--accent)]"
                />
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <h2 className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Font & Design</h2>

              <div className="mb-3">
                <p className="mb-2 text-xs font-medium text-[color:var(--muted)]">Font Style</p>
                <div className="grid grid-cols-2 gap-2">
                  {FONT_OPTIONS.map((option) => {
                    const active = option.id === fontStyle;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        data-testid={`font-style-${option.id}`}
                        onClick={() => setFontStyle(option.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-lg border px-2 py-2 text-center transition ${
                          active ? "btn-active" : "btn-inactive border-[color:var(--border)]"
                        }`}
                      >
                        <span className={`block text-sm font-semibold text-[color:var(--foreground)] ${option.className}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-[color:var(--muted)]">Text Design</p>
                <div className="grid grid-cols-3 gap-2">
                  {TEXT_DESIGN_OPTIONS.map((option) => {
                    const active = option.id === textDesign;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        data-testid={`text-design-${option.id}`}
                        onClick={() => setTextDesign(option.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-lg border px-2 py-2 text-center transition ${
                          active ? "btn-active" : "btn-inactive border-[color:var(--border)]"
                        }`}
                      >
                        <span className={`design-swatch ${option.swatchClassName}`} />
                        <span className={`mt-1.5 block text-xs font-semibold text-[color:var(--foreground)] ${option.className}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
