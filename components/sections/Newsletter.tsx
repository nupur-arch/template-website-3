"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MailIcon } from "@/components/ui/Icons";

const KEY = "emberline.list";

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const open = Boolean(reduce) || inView;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [filed, setFiled] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("That doesn't look like an address.");
      setFiled(false);
      return;
    }
    let previous: unknown = [];
    try {
      previous = JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      previous = [];
    }
    const list = Array.isArray(previous) ? previous.filter((item): item is string => typeof item === "string") : [];
    const next = [email, ...list.filter((item) => item.toLowerCase() !== email.toLowerCase())].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(next));
    setFiled(true);
    setMessage("Filed on this desk, in this browser. No server took a copy.");
  }

  return (
    <section ref={ref} id="evening-list" className="newsletter-stage border-b border-[var(--rule)] py-20 sm:py-28">
      <div className="desk grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
       <div>
        <SectionHeading
        numeral="09"
        kicker="Evening list"
        title="One note after the last edition."
        aside="The envelope opens when you arrive. The address stays in this browser and nowhere else."
        />
        <p className="mt-8 max-w-md border-l border-ember pl-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink-soft">One concise briefing · no noise · filed at dusk</p>
       </div>
      <div className="envelope mx-auto mt-10 lg:mt-16">
        <motion.div
          className="envelope-flap"
          initial={false}
          animate={{ rotateX: open ? -180 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.form
          onSubmit={submit}
          className="envelope-letter p-5"
          initial={false}
          animate={{ y: open ? -78 : 8 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">The evening note</p>
          <label className="mt-3 block text-sm" htmlFor="evening-email">
            Email address
          </label>
          <input
            id="evening-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@desk.test"
            className="mt-2 w-full border-b border-[var(--rule)] bg-transparent py-2 outline-none"
          />
          <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-sm text-white">
            <MailIcon />{filed ? "Filed" : "File me"}
          </button>
          <p className="mt-3 min-h-10 text-sm text-ink-soft" role="status">
            {message}
          </p>
        </motion.form>
        <div className="envelope-pocket" />
      </div>
      </div>
    </section>
  );
}
