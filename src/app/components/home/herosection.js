// components/HeroRoofingCarousel.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroRoofingCarousel({
  autoPlayMs = 4500,
  slides = [
    {
      heroImg: "/home/crousel-one-one.jpg",
      hexImg: "/home/crousel-one-two.jpg",
      kicker: "INNOVATION AT WORK",
      titleLines: [
        "Professional Construction Chemicals",
        "Rest Is With Our",
        "Roofing",
      ],
      desc: "Leading manufacturer of high-performance waterproofing and construction solutions, providing top–notch services to our clients and building a strong track record in the industry.",
    },
    {
      heroImg: "/home/crousel-two-one.jpg",
      hexImg: "/home/crousel-two-two.jpg",
      kicker: "BUILT TO LAST",
      titleLines: ["Precision. Safety.", "Performance. That’s", "Our Promise"],
      desc: "From installation to maintenance, our certified team delivers durable, time-tested roofing solutions for every site condition.",
    },
    {
      heroImg: "/home/crousel-three-one.jpg",
      hexImg: "/home/crousel-three-two.jpg",
      kicker: "QUALITY YOU CAN TRUST",
      titleLines: ["Strong Roofs", "Stronger Support", "For Your Projects"],
      desc: "Trusted by leading contractors and facility managers—on-time delivery, clean execution, and post-project support.",
    },
  ],
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlayMs, total]);

  const current = useMemo(() => slides[index], [slides, index]);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => setHasAnimated(true), []);

  const go = (i) => setIndex((i + total) % total);

  const entryVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section
      className="
        relative w-full overflow-hidden bg-[#f5f7fb]
        min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[600px]
        flex items-center
      "
    >
    
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0">
          <Image
            src={current.heroImg}
            alt=""
            fill
            sizes="(min-width:1280px) 50vw, (min-width:1024px) 56vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 45% at 88% 12%, rgba(125,211,252,.55) 0%, rgba(125,211,252,.18) 35%, rgba(125,211,252,0) 70%)",
          }}
        />

        <div
          className="hidden sm:block absolute top-0 left-0 h-full w-[60%] lg:w-[58%]"
          style={{
            background: "#F5F7FB",
            clipPath: "polygon(0 0, 72% 0, 50% 0%, 0% 100%)",
          }}
        />

      
        <HexagonFrame
          img={current.hexImg}
          size={150}
          className="absolute left-4 top-4 block sm:hidden"
        />
        <HexagonFrame
          img={current.hexImg}
          size={200}
          className="hidden sm:block md:hidden absolute left-6 top-6"
        />
        <HexagonFrame
          img={current.hexImg}
          size={240}
          className="hidden md:block lg:hidden absolute left-6 top-8"
        />
        <HexagonFrame
          img={current.hexImg}
          size={280}
          className="hidden lg:block absolute -left-10 top-10"
        />
      </div>

  
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-8">
          <div className="lg:col-span-6 py-10 sm:py-14 lg:py-20">
            <motion.div
              initial={!hasAnimated ? "initial" : false}
              animate="animate"
              variants={entryVariants}
            >
            
              <p
                className="
                  tracking-[.25em] text-xs sm:text-sm font-semibold uppercase
                  text-white lg:text-slate-700
                "
              >
                {current.kicker}
              </p>

              {/* title */}
              <h1
                className="
                  mt-3 sm:mt-4
                  text-[24px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                  font-extrabold leading-[1.2] sm:leading-[1.1]
                  text-white lg:text-slate-900
                "
              >
                {current.titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* description */}
              <p
                className="
                  mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-[50ch]
                  text-white/90 lg:text-slate-600
                "
              >
                {current.desc}
              </p>

              {/* buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#get-quote"
                  className="
                    inline-flex items-center justify-center rounded-md
                    px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-white shadow
                    transition-colors duration-300
                    bg-[#07D] hover:bg-[#de231c]
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#de231c]/50
                  "
                >
                  Get Quote
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#view-products"
                  className="
                    inline-flex items-center justify-center rounded-md
                    border border-slate-300 bg-white
                    px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-slate-900
                    transition-colors duration-300
                    hover:bg-[#fff5f4] hover:text-[#de231c] hover:border-[#de231c]
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#de231c]/40
                  "
                >
                  View Products
                </motion.a>
              </div>

     
              <div className="mt-7 sm:mt-9 flex items-center gap-2.5 sm:gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "bg-white lg:bg-slate-900 w-6"
                        : "bg-white/50 lg:bg-slate-300 w-2.5"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

    
        <div className="hidden sm:flex absolute inset-x-0 bottom-5 sm:bottom-6 justify-center gap-6 lg:gap-8">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => go(index - 1)}
            className="rounded-full bg-white/90 backdrop-blur px-4 py-2 text-slate-900 font-semibold shadow transition-colors hover:bg-white"
            aria-label="Previous slide"
          >
            ‹
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => go(index + 1)}
            className="rounded-full bg-white/90 backdrop-blur px-4 py-2 text-slate-900 font-semibold shadow transition-colors hover:bg-white"
            aria-label="Next slide"
          >
            ›
          </motion.button>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function HexagonFrame({ img, size = 240, className = "" }) {
  const outer = size + 60;
  return (
    <div className={className}>
      <div
        className="relative"
        style={{
          width: outer,
          height: outer,
          background: "white",
          clipPath:
            "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
          boxShadow: "0 18px 40px rgba(0,0,0,.18)",
        }}
      >
        <div
          className="absolute inset-0 m-5"
          style={{
            background: "#0f172a",
            clipPath:
              "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
          }}
        >
          <div
            className="absolute inset-0 m-5 overflow-hidden"
            style={{
              clipPath:
                "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            }}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
