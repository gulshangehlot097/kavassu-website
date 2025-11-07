"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "../../context/productcontext";

/* ---- ANIMATION PRESETS ---- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const tapBump = { scale: 0.95, transition: { type: "spring", stiffness: 500, damping: 30 } };

/* ---- BASE URL ---- */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.1.50:3000";

/* ---- COMPONENT ---- */
export default function ProductRangeSection() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(4);
  const [cardW, setCardW] = useState(0);

  // const products = Array.isArray(Dataproducts) ? Dataproducts : [];

  // console.log("products section received", products);
const { products } = useProducts();

  // measure
  useEffect(() => {
    const compute = () => {
      const vp = viewportRef.current;
      const first = trackRef.current?.querySelector("[data-card]");
      if (!vp || !first) return;

      const w = vp.clientWidth;
      let pv = 1;
      if (w >= 1024) pv = 4;
      else if (w >= 768) pv = 3;
      else if (w >= 640) pv = 2;
      setPerView(pv);

      const rect = first.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(trackRef.current).getPropertyValue("--gap")) || 28;
      setCardW(rect.width + gap);

      const max = Math.max(0, products.length - pv);
      setIdx((i) => Math.min(i, max));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [products.length]);

  // slide
  useEffect(() => {
    if (!trackRef.current) return;
    const max = Math.max(0, products.length - perView);
    const safe = Math.max(0, Math.min(idx, max));
    if (safe !== idx) setIdx(safe);
    trackRef.current.style.transform = `translate3d(${-safe * cardW}px,0,0)`;
  }, [idx, perView, cardW, products.length]);

  const canPrev = idx > 0;
  const canNext = idx < Math.max(0, products.length - perView);
  const step = 1;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeIn}
      className="relative overflow-visible py-20 
  bg-gradient-to-br from-sky-50 via-white to-teal-50 
  dark:from-[#0a0f1c] dark:via-[#0c1322] dark:to-[#0f172a]"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* header + arrows */}
        <div className="mb-10 lg:mb-14 flex items-end justify-between gap-6">
          <div className="text-center md:text-left w-full">
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold leading-[1.15] mb-3">
              <span className="inline-block pb-1 text-[#00A6F4]">Our Product Range</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto md:mx-0">
              Comprehensive solutions for all your construction chemical needs
            </motion.p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <motion.div whileTap={tapBump}>
              <GradBtn disabled={!canPrev} onClick={() => setIdx((i) => Math.max(0, i - step))} label="Previous">
                ‹
              </GradBtn>
            </motion.div>
            <motion.div whileTap={tapBump}>
              <GradBtn disabled={!canNext} onClick={() => setIdx((i) => Math.min(i + step, products.length - perView))} label="Next">
                ›
              </GradBtn>
            </motion.div>
          </div>
        </div>

        {/* carousel */}
        <div ref={viewportRef} className="overflow-hidden pb-8">
          <motion.div
            ref={trackRef}
            className="flex will-change-transform transition-transform duration-500 ease-out"
            style={{ "--gap": "28px", gap: "28px" }}
            variants={listStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products.map((p, i) => {
              // ✅ Parse image safely and prefix BASE_URL
              let parsedImage = "/placeholder.svg";
              try {
                const imgArray = JSON.parse(p.images);
                if (Array.isArray(imgArray) && imgArray.length > 0) {
                  const firstObj = imgArray[0];
                  const firstKey = Object.keys(firstObj)[0];
                  parsedImage = BASE_URL + firstObj[firstKey];
                }
              } catch (e) {
                console.warn("Invalid image format:", e);
              }

              return (
                <motion.div key={i} data-card variants={cardItem} className="shrink-0 w-[85%] sm:w-[46%] md:w-[31%] lg:w-[23%]">
                  <HoverZoomCard
                    product={{
                      title: p.title,
                      description: p.shortdes,
                      image: parsedImage,
                      href: `/products/${encodeURIComponent(p.category.toLowerCase().replace(/\s+/g, "-"))}`,
                      badge: p.category,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* mobile arrows */}
        <div className="mt-2 flex md:hidden justify-center gap-3">
          <motion.div whileTap={tapBump}>
            <GradBtn disabled={!canPrev} onClick={() => setIdx((i) => Math.max(0, i - step))} label="Previous">
              ‹
            </GradBtn>
          </motion.div>
          <motion.div whileTap={tapBump}>
            <GradBtn disabled={!canNext} onClick={() => setIdx((i) => Math.min(i + step, products.length - perView))} label="Next">
              ›
            </GradBtn>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ---- pieces ---- */

function GradBtn({ children, onClick, disabled, label }) {
  return (
    <button
      aria-label={label}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative h-10 w-10 rounded-full grid place-items-center transition
        ${disabled ? "bg-gray-200/80 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800 hover:shadow-md"}
        dark:${disabled ? "bg-gray-800/60 text-gray-500" : "bg-gray-800 text-gray-100"}
        ring-1 ring-black/5
      `}
    >
      {!disabled && <span className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#00A6F4]/80 via-[#00A6F4] to-[#008FD1]/80" />}

      <span className="relative">{children}</span>
    </button>
  );
}

/* Card: image zoom + text zoom on hover */
function HoverZoomCard({ product }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.transformStyle = "preserve-3d";
      cardRef.current.style.perspective = "1000px";
    }
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = (e) => {
    if (prefersReducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rotY = x * 10,
      rotX = -y * 10;
    if (!rafRef.current) {
      el.style.willChange = "transform";
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        rafRef.current = null;
      });
    }
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.style.willChange = "auto";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-3xl bg-white dark:bg-gray-800 
      shadow-[0_8px_20px_rgba(2,8,23,0.06)] hover:shadow-[0_14px_30px_rgba(2,8,23,0.10)] 
      overflow-hidden transition cursor-pointer h-[430px] flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ translateY: -2, transition: { type: "spring", stiffness: 300, damping: 24 } }}
    >
      {/* image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(min-width:1280px) 24vw, (min-width:1024px) 32vw, (min-width:768px) 46vw, 85vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* content */}
      <div className="relative p-6 flex-1 flex flex-col justify-between">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#07D]/80 translate-y-full group-hover:translate-y-0 
          transition-transform duration-500 ease-out z-0"
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h3
              className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 
              transition-colors duration-300 group-hover:text-white line-clamp-1"
            >
              {product.title}
            </h3>

            <p
              className="text-gray-700 dark:text-gray-300 mb-4 text-sm 
              transition-colors duration-300 group-hover:text-gray-100 line-clamp-4"
            >
              {product.description}
            </p>
          </div>

          <Link
            href={product.href}
            className="inline-flex items-center font-medium text-[#00A6F4] 
              group-hover:text-white hover:text-[#de231c] transition-colors mt-auto"
            prefetch={false}
            aria-label={`Learn more about ${product.title}`}
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* badge */}
      {product.badge && (
        <motion.div
          className="absolute top-3 right-3 bg-gradient-to-br from-[#07D] to-[#00A6F4] 
          text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md"
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {product.badge}
        </motion.div>
      )}
    </motion.div>
  );
}


/* A11y: reduced motion */
function usePrefersReducedMotion() {
  const mRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => (mRef.current = !!mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return mRef.current;
}
