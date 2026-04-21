export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-lg rounded-[32px] p-8 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
          This canvas drifted out of view
        </h1>
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
          Head back to the text animator to keep experimenting with motion, typography, and
          fullscreen previews.
        </p>
      </div>
    </main>
  );
}
