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
        <div className="paper-fiber absolute inset-0 flex flex-col justify-between p-4" aria-hidden="true">
          <div className="flex items-start justify-between">
            <Mark className="h-8 w-8" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em]">No plate</span>
          </div>
          <div>
            <div className="mb-3 h-px w-14 bg-current opacity-40" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]">{category || "Emberline"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
