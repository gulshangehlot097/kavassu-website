// components/Certifications.jsx
"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,        // ISO 9001
  Leaf,               // ISO 14001
  ShieldPlus,         // ISO 45001
  Building2,          // IS: 2645
  CheckCircle2,       // verified badge
} from "lucide-react";

const BLUE = "#07D";      // primary
const RED  = "#de231c";   // brand hover/accent

const items = [
  "ISO 9001:2015 – Quality Management",
  "ISO 14001:2015 – Environmental Management",
  "ISO 45001:2018 – Occupational Health & Safety",
  "IS: 2645 2003 – Construction Chemical Standards",
];

// map icons by index
const ICONS = [ShieldCheck, Leaf, ShieldPlus, Building2];

// gentle easing + stagger
const easeOutSoft = [0.22, 1, 0.36, 1];
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
};

export default function Certifications() {
  return (
    <section
      className="relative py-16 md:py-20 bg-white overflow-hidden font-sans"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* subtle background dots */}
      <div className="pointer-events-none absolute -left-8 top-8 h-64 w-64 rounded-3xl bg-[radial-gradient(rgba(0,119,221,0.10)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-10 translate-y-8 rounded-3xl bg-[radial-gradient(rgba(222,35,28,0.10)_1px,transparent_1px)] [background-size:12px_12px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOutSoft }}
          className="text-center"
        >
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-slate-600">
            Our Standards
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certifications & Standards
          </h2>
          <div
            className="mx-auto mt-3 h-1 w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, ${BLUE}, ${RED})` }}
          />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Internationally recognized certifications that validate our quality, safety and environmental stewardship.
          </p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[1fr]"
        >
          {items.map((text, i) => {
            const [code, subtitle] = text.split(" – ");
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={text}
                variants={card}
                className="relative h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
              >
                {/* left accent strip */}
                <span
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-colors"
                  style={{ background: BLUE }}
                />

                {/* verified badge */}
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 text-[12px] font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Verified
                </span>

                <div className="flex items-start gap-4">
                  {/* icon tile */}
                  <div
                    className="grid h-14 w-14 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 shadow-sm"
                    style={{ boxShadow: "0 6px 14px rgba(2,6,23,.06)" }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* text */}
                  <div className="min-h-[56px] flex flex-col justify-center">
                    <h3 className="text-[17px] md:text-lg font-semibold text-slate-900">
                      {code || text}
                    </h3>
                    {subtitle && (
                      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
                    )}
                  </div>
                </div>

                {/* bottom bar */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-3 h-1 w-12 rounded-full transition-all duration-300"
                  style={{ background: RED }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
