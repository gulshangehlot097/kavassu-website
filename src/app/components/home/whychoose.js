// components/HexFeatureZigzag.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HexFeatureZigzag() {
  const items = [
    {
      bottomTitle: "ISO Certified Quality",
      bottomDesc: "ISO 9001, 14001 & 45001 accredited manufacturing processes",
      img: "/home/icons/iso.png", // 👈 apna PNG path
      grad: "from-sky-500 to-blue-600",
      tick: "sky",
    },
    {
      topTitle: "Advanced Manufacturing",
      topDesc: "India's biggest plant with ultra-modern facilities and R&D lab",
      img: "/home/icons/manufacturing.png",
      grad: "from-cyan-500 to-teal-600",
      tick: "sky",
    },
    {
      bottomTitle: "GTX Technology",
      bottomDesc: "Innovative technology backed products for superior performance",
      img: "/home/icons/technology.png",
      grad: "from-green-500 to-emerald-600",
      tick: "emerald",
    },
    {
      topTitle: "Proven Track Record",
      topDesc: "Time-tested products with strong service history across India",
      img: "/home/icons/track-record.png",
      grad: "from-indigo-500 to-blue-700",
      tick: "sky",
    },
    {
      bottomTitle: "Wide Applications",
      bottomDesc: "Suitable for buildings, dams, bridges, power projects, and more",
      img: "/home/icons/wide-application.png",
      grad: "from-sky-500 to-cyan-600",
      tick: "sky",
    },
    {
      topTitle: "Nationwide Network",
      topDesc: "Available through wide distributor network across the country",
      img: "/home/icons/network.png",
      grad: "from-teal-500 to-emerald-600",
      tick: "emerald",
    },
  ];

  const Tick = ({ color = "sky" }) => (
    <div
      className={[
        "flex items-center justify-center rounded-full border-2 font-bold",
        "h-[clamp(22px,2.2vw,28px)] w-[clamp(22px,2.2vw,28px)]",
        "text-[clamp(10px,1.1vw,12px)]",
        color === "emerald"
          ? "border-emerald-500 text-emerald-500"
          : "border-sky-500 text-sky-500",
      ].join(" ")}
      aria-hidden="true"
    >
      ✓
    </div>
  );

  // Smooth motion configs
  const easeOutSoft = [0.22, 1, 0.36, 1];
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOutSoft,
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };
  const card = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOutSoft },
    },
  };

  return (
    <section className="w-full py-[clamp(28px,4vw,56px)]">
      {/* Heading */}
      <div className="text-center mx-auto max-w-3xl px-4 mb-[clamp(32px,5vw,64px)]">
        <h2 className="font-bold text-slate-900 text-[clamp(28px,3.2vw,38px)] leading-tight">
          Why Choose <span className="text-sky-500">Kavassu International</span>?
        </h2>
        <p className="mt-2 text-slate-600 text-[clamp(14px,1.5vw,18px)]">
          Leading manufacturer with <span className="font-semibold">ISO certifications</span> and
          innovative <span className="font-semibold">GTX Technology</span>
        </p>
      </div>

      {/* Grid */}
      <motion.div
        className={[
          "mx-auto px-4 max-w-screen-2xl",
          "grid gap-[clamp(8px,1.2vw,24px)]",
          "grid-cols-[repeat(auto-fit,minmax(180px,1fr))]",
        ].join(" ")}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map(({ topTitle, topDesc, bottomTitle, bottomDesc, img, grad, tick }, i) => {
          const isEven = i % 2 === 1;

          return (
            <motion.div key={i} variants={card} className="flex flex-col items-center text-center">
              {/* TOP content (even) */}
              {isEven && (
                <div className="flex flex-col items-center mb-[clamp(8px,1.4vw,16px)]">
                  <Tick color={tick} />
                  <p className="mt-1 font-semibold text-slate-900 text-[clamp(13px,1.6vw,16px)]">
                    {topTitle}
                  </p>
                  <p className="mt-1 text-slate-600 leading-snug text-[clamp(11px,1.3vw,13px)] max-w-[22ch]">
                    {topDesc}
                  </p>
                  <div className="mt-[clamp(6px,1vw,10px)] h-[clamp(24px,3vw,48px)] w-px border-l-2 border-dotted border-slate-400" />
                </div>
              )}

              {/* HEXAGON with PNG */}
              <motion.div
                className="relative h-[clamp(84px,10vw,120px)] w-[clamp(84px,10vw,120px)]"
                whileHover={{ y: -2, rotate: -0.25 }}
                transition={{ type: "spring", stiffness: 110, damping: 20 }}
              >
                <div
                  className={[
                    "absolute inset-0 grid place-items-center text-white shadow",
                    "bg-gradient-to-br",
                    grad,
                    "[clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]",
                  ].join(" ")}
                >
                 <div className="relative h-[clamp(50px,5vw,50px)] w-[clamp(50px,5vw,50px)]">
  <Image
    src={img}
    alt={topTitle || bottomTitle}
    fill
    className="object-contain"
    sizes="80px"
  />
</div>

                </div>
                <div
                  className={[
                    "absolute",
                    "inset-[clamp(3px,0.5vw,5px)]",
                    "[clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]",
                    "border-2 border-white/80",
                  ].join(" ")}
                />
              </motion.div>

              {/* BOTTOM content (odd) */}
              {!isEven && (
                <div className="flex flex-col items-center mt-[clamp(8px,1.4vw,16px)]">
                  <div className="mb-[clamp(6px,1vw,10px)] h-[clamp(24px,3vw,48px)] w-px border-l-2 border-dotted border-slate-400" />
                  <Tick color={tick} />
                  <p className="mt-1 font-semibold text-slate-900 text-[clamp(13px,1.6vw,16px)]">
                    {bottomTitle}
                  </p>
                  <p className="mt-1 text-slate-600 leading-snug text-[clamp(11px,1.3vw,13px)] max-w-[22ch]">
                    {bottomDesc}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
