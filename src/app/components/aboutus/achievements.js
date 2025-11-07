// components/Achievements.jsx
"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const ACCENT = "#de231c"; // red
const PRIMARY = "#07D";   // blue

const stats = [
  { value: 25,  suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50,  suffix: "+", label: "Product Variants" },
  { value: 100, suffix: "%", label: "Quality Assurance" },
];

// buttery easing + stagger
const easeOutSoft = [0.22, 1, 0.36, 1];
const wrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export default function Achievements() {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden font-sans"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,119,221,0.10) 0%, rgba(0,119,221,0) 70%), linear-gradient(135deg, #f9fbff 0%, #eef5ff 60%, #e8f0ff 100%)",
        }}
      />
      <div className="pointer-events-none absolute -left-10 top-8 h-64 w-64 rounded-3xl bg-[radial-gradient(rgba(222,35,28,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-10 translate-y-8 rounded-3xl bg-[radial-gradient(rgba(14,122,223,0.14)_1px,transparent_1px)] [background-size:12px_12px]" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: easeOutSoft }}
        >
          Our Achievements
        </motion.h2>

        <motion.p
          className="mt-3 text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.08, duration: 0.7, ease: easeOutSoft }}
        >
          Decades of excellence in construction chemicals manufacturing
        </motion.p>

        {/* Stats grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[1fr]"
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="
                group relative h-full rounded-2xl border border-slate-200/80
                bg-white/80 backdrop-blur p-8 shadow-sm
                transition-all hover:shadow-lg hover:-translate-y-0.5
              "
            >
              {/* soft corner aura */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(rgba(14,122,223,0.12),transparent_60%)]" />
              {/* number */}
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #0ea5e9, #2563eb)" }}
                >
                  <CountUp
                    start={0}
                    end={s.value}
                    duration={2.2}
                    enableScrollSpy
                    scrollSpyOnce
                    formattingFn={(n) => Math.floor(n).toLocaleString()}
                  />
                </span>
                <span className="text-4xl md:text-5xl font-extrabold" style={{ color: PRIMARY }}>
                  {s.suffix}
                </span>
              </div>

              {/* label */}
              <p className="mt-3 text-slate-700 font-medium">{s.label}</p>

              {/* red accent bar */}
              <span
                className="absolute left-1/2 -translate-x-1/2 bottom-3 h-1 w-12 rounded-full transition-all duration-300"
                style={{ backgroundColor: ACCENT }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
