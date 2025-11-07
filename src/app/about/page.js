
"use client";
import WhyChooseUsSection from '../components/aboutus/whychoose'
import Certifications from '../components/aboutus/certifications'
import Achievements from '../components/aboutus/achievements'
import ReadyToWork from '../components/aboutus/readytowork'
import LegacySection from '../components/aboutus/legacysection'
import { motion } from "framer-motion";

const ACCENT = "#07D";       // brand blue
const ACCENT_HOVER = "#de231c";

export default function AboutIntro({
  title = "About Kavassu International",
  description = `All products are manufactured by India's biggest plant of its kind. 
M/s. Shalimar Seal & Tar Products Pvt. Ltd., an ISO 9001, 14001 & 45001 accredited company.`,
  tagline = "REAL REVOLUTION - JAHAN HUM HAIN... WAHAN DUM HAI",
}) {
  const easeOutSoft = [0.22, 1, 0.36, 1];

  return (
 <>
    <section className="relative overflow-hidden py-16 md:py-20 ">
      {/* Soft ambient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,119,221,0.10) 0%, rgba(0,119,221,0) 70%), linear-gradient(135deg, #f9fbff 0%, #eef5ff 60%, #e8f0ff 100%)",
        }}
      />
      {/* Decorative dots */}
      <div className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full bg-[radial-gradient(rgba(0,119,221,0.18)_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-[radial-gradient(rgba(13,122,223,0.16)_1px,transparent_1px)] [background-size:14px_14px]" />

      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeOutSoft }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.6, ease: easeOutSoft }}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{ borderColor: `${ACCENT}33`, color: ACCENT }}
        >
          About Us
          <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOutSoft }}
        >
          {title}
        </motion.h1>

        {/* Underline */}
        <motion.div
          className="mx-auto mt-3 h-1 w-24 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT} 0%, #3aa8ff 100%)`,
            boxShadow: "0 6px 14px rgba(0,119,221,0.25)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.6, ease: easeOutSoft }}
        />

        {/* Description */}
        <motion.p
          className="mx-auto mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.65, ease: easeOutSoft }}
        >
          {description}
        </motion.p>

        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: easeOutSoft }}
          className="mx-auto mt-6 inline-flex items-center rounded-full p-[1.5px]"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, #0ea5e9)`,
            boxShadow: "0 10px 22px rgba(0,119,221,0.22)",
          }}
        >
          <span className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold tracking-wide text-sky-800 md:text-sm">
            {tagline}
          </span>
        </motion.div>

        {/* CTA row (optional) */}
        {/* <div className="mt-7 flex justify-center gap-3">
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-white font-semibold transition-colors duration-300"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Our Story
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 font-semibold text-slate-800 transition-colors hover:text-white"
            style={{ borderColor: `${ACCENT}55` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Contact Us
          </a>
        </div> */}
      </motion.div>
    </section>
     < LegacySection />
     < Achievements />
    < WhyChooseUsSection />
    < Certifications />
    < ReadyToWork />
   
 </>
  );
}
