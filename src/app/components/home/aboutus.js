// components/AboutKavassuSection.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ACCENT = "#07D"; // #0077DD

// buttery-smooth easing
const easeOutSoft = [0.22, 1, 0.36, 1];

// left column (image) enters from left
const leftVariants = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easeOutSoft }
  },
};

// right column (content) enters from right
const rightVariants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: easeOutSoft, delay: 0.08 }
  },
};

// small elements inside right column fade up gently
const child = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutSoft }
  },
};

export default function AboutKavassuSection() {
  return (
    <section className="relative py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN (Image) */}
          <motion.div
            className="space-y-6"
            variants={leftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Big image with clipped top-right corner */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.2] overflow-hidden rounded-2xl">
              <div className="clipped-corner absolute inset-0 overflow-hidden">
                <Image
                  fill
                  alt="Kavassu manufacturing & application"
                  src="/home/aboutus.png" // 🔁 replace
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Paragraph + CTA */}
            <div className="grid sm:grid-cols-[1fr_auto] items-center gap-6">
              <p className="text-gray-600">
                All products are manufactured by India&apos;s biggest plant of its kind —
                M/s. Shalimar Seal &amp; Tar Products Pvt. Ltd., an ISO 9001, 14001 &amp; 45001
                accredited company.
              </p>

              <motion.a
                 href="/about"
  className="
    inline-flex items-center justify-center gap-2
    text-white font-semibold px-6 py-3 rounded-md
    shadow-[0_6px_16px_rgba(0,119,221,0.35)]
    transition-colors duration-300 ease-in-out
    bg-[#07D] hover:bg-[#de231c]
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#de231c]/40
  "
              >
                Learn More About Us
                <svg  width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" />
                  <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN (Content) */}
          <motion.div
            className="space-y-8"
            variants={rightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Eyebrow */}
            <motion.div
              className="text-xs tracking-widest font-semibold uppercase"
              style={{ color: ACCENT }}
              variants={child}
            >
              About Kavassu International <span className="align-middle ml-1">›</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-extrabold text-gray-900"
              variants={child}
            >
              We build solutions that last
            </motion.h2>

            {/* Lead */}
            <motion.p className="text-gray-600 max-w-prose" variants={child}>
              Products are backed by innovative <strong>GTX Technology</strong> and have been
              time-tested across varying climatic conditions throughout India. Our solutions
              provide cost-effective remedies for construction challenges in buildings,
              factories, harbors, dams, canals, bridges, power projects, tunnels, and more.
            </motion.p>

            {/* Bullets */}
            <motion.ul className="space-y-3" variants={child}>
              <Bullet color={ACCENT}>
                Manufactured at India&apos;s biggest plant of its kind (Shalimar Seal &amp; Tar
                Products Pvt. Ltd.).
              </Bullet>
              <Bullet color={ACCENT}>
                GTX Technology—reliable performance proven across India’s climates.
              </Bullet>
            </motion.ul>

            {/* Certifications / Badges */}
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={child}>
              {[
                "ISO 9001:2015 Certified",
                "ISO 14001:2015 Certified",
                "ISO 45001:2018 Certified",
                "Eco-friendly Products",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
                  style={{
                    borderColor: `${ACCENT}33`,
                    background: `${ACCENT}0D`,
                    color: "#1f2937",
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Bottom visual (video thumb) */}
            <motion.div
              className="relative w-full aspect-[16/9] overflow-hidden rounded-xl"
              variants={child}
            >
              <Image
                fill
                alt="Kavassu applications"
                src="/modern-chemical-manufacturing-plant-with-quality-c.jpg" // 🔁 replace
                className="object-cover"
              />
              <motion.button
                aria-label="Play video"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group absolute inset-0 m-auto h-14 w-14 rounded-full bg-white/95 text-black shadow-xl grid place-items-center ring-1 ring-black/5"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={ACCENT}>
                  <path d="M8 5v14l11-7-11-7Z" />
                </svg>
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: `${ACCENT}33` }}
                />
              </motion.button>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-200 rotate-45" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* dotted deco on right side */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[22%] bg-[radial-gradient(#eaeaea_1px,transparent_1px)] [background-size:14px_14px]" />
    </section>
  );
}

function Bullet({ children, color }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 inline-grid place-content-center h-3.5 w-3.5 rounded-full ring-2"
        style={{ ringColor: color }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      </span>
      <span className="text-gray-700">{children}</span>
    </li>
  );
}
