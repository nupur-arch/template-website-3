import Link from "next/link";

export default function NotFound() {
  return (
    <div className="desk py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">404</p>
      <h1 className="display mt-3 text-5xl">Not in this edition.</h1>
      <p className="mt-4 max-w-md text-ink-soft">The slug does not match a story, a section, or a page on the desk.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-ink px-4 py-2 text-paper">
        Back to the cylinder
      </Link>
    </div>
  );
}
