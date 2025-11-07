"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductHero({ product }) {
  const firstImage =
    product?.images?.[0]?.image ||
    product?.images?.[0]?.image1 ||
    "/placeholder.png";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f9fbff] to-[#eef3ff] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
    >
      {/* Image Section */}
      <div className="w-full md:w-1/3 relative">
        <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-500">
          <Image
            src={firstImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            unoptimized
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 relative z-10">
        {/* Accent gradient line */}
        <div className="h-1 w-16 bg-gradient-to-r from-[#0095DA] to-[#E52B2A] rounded-full mb-3"></div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          {product.title}
        </h1>
        <p className="mt-3 text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
          {product.summary ||
            "Discover unmatched quality and innovation with our premium product range — engineered to deliver performance and reliability."}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {product.pdf && (
            <a
              href={product.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              📄 Download PDF
            </a>
          )}
          <button className="px-6 py-2.5 cursor-pointer text-sm font-medium rounded-full bg-[#0095DA] text-white shadow hover:bg-[#E52B2A] transition-all duration-300">
            🚀 Request Quote
          </button>
        </div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-[#0095DA]/10 to-[#E52B2A]/10 blur-3xl rounded-full"></div>
    </motion.section>
  );
}
