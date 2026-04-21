# ShowMe — Text Animator WebApp

A minimal, production-grade text animation playground built with Next.js 15, Framer Motion, and Tailwind CSS. Type any message, pick an animation style, tune the speed, font, and color design — all previewed live.

## Features

- **5 animation styles** — Rolling marquee, Vertical scroll, Typewriter, Wave motion, Fade + Slide
- **4 font styles** — Grotesk, Editorial, Mono, Poster
- **5 text designs** — Clean, Aurora, Sunset, Neon, Prism
- **Speed & font size** controls
- **Dark / Light theme** with localStorage persistence
- **Fullscreen preview** mode

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS v3](https://tailwindcss.com/) — styling
- [Playwright](https://playwright.dev/) — end-to-end tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright e2e tests |

## Project Structure

```
app/
  globals.css       # CSS variables, theme, utility classes
  layout.tsx        # Root layout, font loading
  page.tsx          # Main page, all state management
components/
  AnimationPreview.tsx  # Live preview canvas + all animation renderers
  StyleSelector.tsx     # Animation style picker
  TextInput.tsx         # Text input + animate button
  types.ts              # Shared TypeScript types
```

## License

BrewnCode by Himanshu Nishad
