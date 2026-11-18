"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error.digest;
  return (
    <div className="desk py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">01 — The wire dropped</p>
      <h1 className="display mt-3 text-5xl">This page missed the edition.</h1>
      <p className="mt-4 max-w-md text-ink-soft">The desk could not finish the page. The copy is still on the spike.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-ember px-4 py-2 text-white">
        Try the desk again
      </button>
    </div>
  );
}
