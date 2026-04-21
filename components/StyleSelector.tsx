"use client";

import { motion } from "framer-motion";

import type { AnimationStyle, StyleOption } from "./types";

interface StyleSelectorProps {
  selectedStyle: AnimationStyle;
  options: StyleOption[];
  onSelect: (style: AnimationStyle) => void;
}

export function StyleSelector({
  selectedStyle,
  options,
  onSelect,
}: StyleSelectorProps) {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <h2 className="mb-3 text-sm font-semibold text-[color:var(--foreground)]">Animation Style</h2>

      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isActive = option.id === selectedStyle;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              className={`relative overflow-hidden rounded-lg border px-3 py-2.5 text-left transition ${
                isActive
                  ? "btn-active"
                  : "btn-inactive border-[color:var(--border)]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-style"
                  className="absolute inset-0 rounded-lg bg-[color:var(--accent-soft)]"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}
              <span className="relative block text-sm font-semibold text-[color:var(--foreground)]">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
