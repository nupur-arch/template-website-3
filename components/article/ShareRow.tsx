"use client";

import { useState } from "react";
import { site } from "@/content/site.config";
import { CopyIcon, MailIcon, ShareIcon } from "@/components/ui/Icons";

export function ShareRow({ title, slug }: { title: string; slug: string }) {
  const url = `${site.url}/article/${slug}`;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const shareText = encodeURIComponent(`${title} — ${site.name}`);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]">
        <CopyIcon />{copied ? "Copied" : "Copy link"}
      </button>
      <a
        className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShareIcon /> Share
      </a>
      <a
        className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        href={`mailto:?subject=${shareText}&body=${shareUrl}`}
      >
        <MailIcon /> Email
      </a>
    </div>
  );
}
