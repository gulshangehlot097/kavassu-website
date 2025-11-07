// components/ReadyToWork.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PRIMARY = "#07D";
const HOVER = "#de231c";

const easeOutSoft = [0.22, 1, 0.36, 1];

export default function ReadyToWork({
  title = "Ready to Work With Us?",
  subtitle = "Experience the difference of working with India's leading construction chemicals manufacturer",
  primaryHref = "/contact",
  secondaryHref = "/products",
}) {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 font-sans bg-[#EFF2F5]"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* subtle ambient bg */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,119,221,0.10) 0%, rgba(0,119,221,0) 70%), linear-gradient(135deg, #f9fbff 0%, #eef5ff 60%, #e8f0ff 100%)",
        }}
      />
      {/* soft dotted corners */}
      <div className="pointer-events-none absolute -left-10 top-8 h-64 w-64 rounded-3xl bg-[radial-gradient(rgba(222,35,28,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-10 translate-y-8 rounded-3xl bg-[radial-gradient(rgba(14,122,223,0.14)_1px,transparent_1px)] [background-size:12px_12px]" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: easeOutSoft }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="mt-3 text-slate-600 text-base md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ delay: 0.08, duration: 0.7, ease: easeOutSoft }}
        >
          {subtitle}
        </motion.p>

        {/* underline */}
        <motion.div
          className="mx-auto mt-4 h-1 w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${HOVER})`, boxShadow: "0 6px 14px rgba(0,119,221,0.25)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: easeOutSoft }}
        />

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.18, duration: 0.65, ease: easeOutSoft }}
        >
          {/* Primary button: #07D -> hover #de231c (smooth) */}
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-white font-semibold shadow-[0_10px_22px_rgba(0,119,221,0.25)] transition-colors"
            style={{ backgroundColor: PRIMARY }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = PRIMARY;
            }}
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Secondary button */}
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 font-semibold text-slate-800 bg-white transition-colors hover:text-white"
            style={{ borderColor: "rgba(2,6,23,0.12)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = PRIMARY;
              e.currentTarget.style.borderColor = "transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.borderColor = "rgba(2,6,23,0.12)";
            }}
          >
            View Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
