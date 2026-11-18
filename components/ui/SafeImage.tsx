"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Mark } from "@/components/logo/Logo";
import { cn } from "@/lib/cn";

function usable(src?: string | null) {
  if (!src) return false;
  try {
    return new URL(src).hostname === "images.unsplash.com";
  } catch {
    return false;
  }
}

export function SafeImage({
  src,
  alt,
  category,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
  className,
  ratio = "aspect-[16/10]",
}: {
  src?: string | null;
  alt: string;
  category?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ratio?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const show = usable(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-paper-deep", ratio, className)}>
      {show ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fallback-plate absolute inset-0 flex flex-col justify-between overflow-hidden p-4 sm:p-5" aria-hidden="true">
          <span className="fallback-orbit" />
          <span className="fallback-letter">{(category || "E").slice(0, 1)}</span>
          <div className="relative flex items-start justify-between">
            <Mark className="h-9 w-9" />
            <span className="rounded-full border border-current/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em]">Archive plate</span>
          </div>
          <div className="relative grid grid-cols-[auto_1fr] items-end gap-3">
            <span className="h-8 w-1 bg-ember" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">Emberline visual desk</p>
              <p className="display mt-1 text-[clamp(1.35rem,3vw,2.4rem)] leading-none">{category || "Filed without a photograph"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
