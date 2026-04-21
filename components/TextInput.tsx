"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";

interface TextInputProps {
  draftText: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
}

export function TextInput({
  draftText,
  onDraftChange,
  onSubmit,
}: TextInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className="glass-panel relative overflow-hidden rounded-2xl p-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="text-input"
            className="mb-1.5 block text-xs font-medium text-[color:var(--muted)]"
          >
            Live Text
          </label>
          <input
            id="text-input"
            type="text"
            value={draftText}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Enter your text..."
            className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--foreground)] outline-none transition duration-200 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent-border)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[color:var(--accent)] py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Animate
        </motion.button>
      </div>
    </motion.form>
  );
}
