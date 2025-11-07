// components/WhyChooseUsSection.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MdPrecisionManufacturing, // Advanced Manufacturing
  MdMemory,                 // GTX Technology
} from "react-icons/md";
import {
  RiGlobalLine,
  RiMedalLine,
  RiShieldCheckLine,
  RiUserStarLine,
} from "react-icons/ri"; // Network, Track Record, Certifications, Expert Team

const ACCENT = "#de231c";
const TEXT_DARK = "#0f172a";

/* ---- Your exact content mapped to icons (ordered row-wise for 2-col grid) ---- */
const FEATURES = [
  {
    title: "Advanced Manufacturing",
    desc:
      "State-of-the-art manufacturing facility with ultra-modern equipment and in-house R&D laboratory",
    Icon: MdPrecisionManufacturing,
  },
  {
    title: "Expert Team",
    desc:
      "Experienced professionals providing technical guidance and customer support nationwide",
    Icon: RiUserStarLine,
  },
  {
    title: "Quality Certifications",
    desc:
      "ISO 9001, 14001 & 45001 certified ensuring highest quality standards and processes",
    Icon: RiShieldCheckLine,
  },
  {
    title: "Proven Track Record",
    desc:
      "Successfully completed 500+ projects across various sectors including infrastructure and industrial",
    Icon: RiMedalLine,
  },
  {
    title: "Wide Network",
    desc:
      "Products available through extensive distributor network across India and international markets",
    Icon: RiGlobalLine,
  },
  {
    title: "GTX Technology",
    desc:
      "Innovative GTX Technology backed products providing superior performance and cost-effective solutions",
    Icon: MdMemory,
  },
];

/* ---- Smooth, slow motion ---- */
const easeOutSoft = [0.22, 1, 0.36, 1];
const leftCol = {
  hidden: { opacity: 0, x: -44 },
  show: { opacity: 1, x: 0, transition: { duration: 1.0, ease: easeOutSoft } },
};
const rightCol = {
  hidden: { opacity: 0, x: 44 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.05, ease: easeOutSoft, delay: 0.08 },
  },
};
const cardsWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
};

export default function WhyChooseUsSection({ imageSrc = "/aboutus/whychoose.jpg" }) {
  return (
    <section
      className="relative bg-white py-12 md:py-16 lg:py-20 overflow-hidden font-sans"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* dotted ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-8 h-64 w-64 rounded-3xl bg-[radial-gradient(rgba(222,35,28,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-10 translate-y-8 rounded-3xl bg-[radial-gradient(rgba(14,122,223,0.14)_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 lg:gap-10">
          {/* Left image card */}
          <motion.div
            className="lg:col-span-4"
            variants={leftCol}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,6,23,0.06)] overflow-hidden">
              <div className="relative w-full aspect-[4/5]">
                <Image src={imageSrc} alt="Why choose us" fill className="object-cover" priority />
              </div>
              {/* bottom red bar */}
              <span className="absolute left-4 bottom-3 h-1.5 w-24 rounded-full" style={{ backgroundColor: ACCENT }} />
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            className="lg:col-span-8"
            variants={rightCol}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* eyebrow */}
            <p className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-rose-900/90 flex items-center gap-2">
              Why choose us <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            </p>

            {/* heading */}
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold" style={{ color: TEXT_DARK }}>
              Reason for chosen us
            </h2>

            {/* underline */}
            <div
              className="mt-3 h-[3px] w-24 rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, #ff7a70)` }}
            />

            {/* subheading */}
            <p className="mt-4 max-w-2xl text-slate-600">
              Certified quality, advanced manufacturing and nationwide support—powered by GTX Technology.
            </p>

            {/* FEATURES GRID — single grid => aligned rows, equal height */}
            <motion.div
              className="
                mt-8 grid grid-cols-1 md:grid-cols-2 gap-5
                auto-rows-[1fr] items-stretch
              "
              variants={cardsWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {FEATURES.map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, Icon }) {
  return (
    <motion.div
      variants={card}
      className="
        group relative grid grid-cols-[56px_1fr] items-center gap-4
        rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur
        p-4 sm:p-5 shadow-sm transition-all hover:shadow-md h-full
      "
    >
      {/* icon tile */}
      <div className="relative">
        <div
          className="
            grid h-14 w-14 place-items-center rounded-lg
            bg-gradient-to-br from-slate-50 to-slate-100
            border border-slate-200 text-slate-800
          "
        >
          <Icon className="h-6 w-6" />
        </div>
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-12"
          style={{ backgroundColor: ACCENT }}
        />
      </div>

      {/* text */}
      <div className="min-h-[56px] flex flex-col justify-center">
        <h3 className="font-semibold text-[15px] md:text-base" style={{ color: TEXT_DARK }}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>

      {/* subtle hover glow */}
      <span
        className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 10px 28px rgba(222,35,28,0.10)` }}
      />
    </motion.div>
  );
}
