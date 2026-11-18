"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatClock, formatRelative } from "@/lib/format";
import type { SearchGroup, SearchHit, SearchResponse } from "@/lib/types";

const STORAGE_KEY = "emberline.recent";

function readRecent() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string").slice(0, 5) : [];
  } catch {
    return [];
  }
}

function remember(query: string) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return;
  const next = [trimmed, ...readRecent().filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  const index = text.toLowerCase().indexOf(needle.toLowerCase());
  if (needle.length < 2 || index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + needle.length)}</mark>
      {text.slice(index + needle.length)}
    </>
  );
}

export function SearchDialog() {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const [nonce, setNonce] = useState(0);

  const hits = useMemo(() => groups.flatMap((group) => group.hits), [groups]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setRecent(readRecent());
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setGroups([]);
      setStatus("idle");
      setActive(-1);
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("search failed");
        const data = (await response.json()) as SearchResponse;
        setGroups(data.groups);
        setStatus("ready");
        setActive(-1);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, nonce, open]);

  useEffect(() => {
    if (active < 0) return;
    document.getElementById(`${listId}-hit-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  function close() {
    setOpen(false);
  }

  function go(hit: SearchHit) {
    remember(query);
    setRecent(readRecent());
    close();
    router.push(`/article/${hit.slug}`);
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(hits.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (active >= 0 && hits[active]) {
        go(hits[active]);
        return;
      }
      if (query.trim().length >= 2) {
        remember(query);
        close();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  }

  let cursor = -1;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
      >
        <span>Search</span>
        <kbd className="hidden sm:inline">Ctrl K</kbd>
      </button>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close search" onClick={close} />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the desk"
            data-lenis-prevent
            className="absolute inset-0 z-10 flex flex-col bg-paper lg:inset-auto lg:right-6 lg:top-20 lg:max-h-[min(72vh,680px)] lg:w-[min(680px,calc(100%-3rem))] lg:overflow-hidden lg:rounded-[1.75rem] lg:border lg:border-[var(--rule)]"
          >
            <div className="flex items-center gap-3 border-b border-[var(--rule)] px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={active >= 0 ? `${listId}-hit-${active}` : undefined}
                aria-autocomplete="list"
                placeholder="Search the desk"
                className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-soft"
              />
              <button type="button" onClick={close} className="font-mono text-[10px] uppercase tracking-[0.16em]">
                Esc
              </button>
            </div>
            <div id={listId} role="listbox" className="min-h-0 flex-1 overflow-y-auto p-3" data-lenis-prevent>
              {query.trim().length < 2 ? (
                <div>
                  <p className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Type at least two letters</p>
                  {recent.length > 0 ? (
                    <div className="mt-2">
                      <div className="flex items-center justify-between px-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">Recent</p>
                        <button
                          type="button"
                          className="font-mono text-[10px] uppercase tracking-[0.16em]"
                          onClick={() => {
                            localStorage.removeItem(STORAGE_KEY);
                            setRecent([]);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 px-2">
                        {recent.map((item) => (
                          <button
                            key={item}
                            type="button"
                            className="rounded-full border border-[var(--rule)] px-3 py-1 text-sm"
                            onClick={() => setQuery(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {status === "loading" && groups.length === 0 ? (
                <div className="space-y-2" aria-hidden="true">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-16 animate-pulse rounded-2xl bg-paper-deep" />
                  ))}
                </div>
              ) : null}

              {status === "error" ? (
                <div className="px-2 py-6">
                  <p className="display text-3xl">The wire dropped this search.</p>
                  <button type="button" className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ember" onClick={() => setNonce((value) => value + 1)}>
                    Try again
                  </button>
                </div>
              ) : null}

              {status === "ready" && hits.length === 0 ? (
                <p className="px-2 py-8 display text-3xl">Nothing on the wire for “{query.trim()}”.</p>
              ) : null}

              {groups.map((group) => (
                <div key={group.category} className="mb-4">
                  <p className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">{group.categoryLabel}</p>
                  {group.hits.map((hit) => {
                    cursor += 1;
                    const index = cursor;
                    const selected = index === active;
                    return (
                      <Link
                        key={hit.id}
                        id={`${listId}-hit-${index}`}
                        role="option"
                        aria-selected={selected}
                        href={`/article/${hit.slug}`}
                        onClick={() => {
                          remember(query);
                          close();
                        }}
                        className={`flex items-center gap-3 rounded-2xl px-2 py-2 ${selected ? "bg-paper-deep" : ""}`}
                      >
                        <SafeImage
                          src={hit.imageSrc}
                          alt=""
                          category={hit.categoryLabel}
                          ratio=""
                          className="h-[52px] w-[88px] shrink-0 rounded-xl"
                          sizes="88px"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-[15px] leading-snug">
                            <Highlight text={hit.title} query={query} />
                          </span>
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                            {hit.categoryLabel} · {formatClock(hit.publishedAt)} · {formatRelative(hit.publishedAt)}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
