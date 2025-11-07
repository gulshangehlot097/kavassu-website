"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react";

export default function GalleryPage() {
    const images = [
    { src: "/aboutus/lagency.png", title: "Agency", subtitle: "Our main agency" },
    { src: "/aboutus/whychoose.jpg", title: "Why Choose Us", subtitle: "Our advantages" },
    { src: "/home/aboutus.png", title: "About Home", subtitle: "Our story" },
    { src: "/aboutus/lagency.png", title: "Agency", subtitle: "Our main agency" },
    { src: "/aboutus/whychoose.jpg", title: "Why Choose Us", subtitle: "Our advantages" },
    { src: "/home/aboutus.png", title: "About Home", subtitle: "Our story" },
    { src: "/aboutus/lagency.png", title: "Agency", subtitle: "Our main agency" },
    { src: "/aboutus/whychoose.jpg", title: "Why Choose Us", subtitle: "Our advantages" },
    { src: "/home/aboutus.png", title: "About Home", subtitle: "Our story" },
    { src: "/aboutus/lagency.png", title: "Agency", subtitle: "Our main agency" },
    { src: "/aboutus/whychoose.jpg", title: "Why Choose Us", subtitle: "Our advantages" },
    { src: "/home/aboutus.png", title: "About Home", subtitle: "Our story" },
  ];

  const IMAGES_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const currentImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "auto";
  }, [selectedIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight" && selectedIndex !== null)
        setSelectedIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft" && selectedIndex !== null)
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, selectedIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`inline-flex items-center cursor-pointer justify-center h-10 w-10 md:h-11 md:w-11 rounded-full font-semibold transition-all duration-200 ${
            i === currentPage
              ? "bg-[#0095DA] text-white shadow-md"
              : "bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="w-full flex justify-center mt-10">
        <nav
          className="flex items-center gap-2 md:gap-3 select-none rounded-full bg-white/60 backdrop-blur px-2 py-2 ring-1 ring-slate-200 shadow-sm"
          aria-label="Pagination"
        >

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`inline-flex items-center cursor-pointer justify-center h-10 w-10 rounded-full text-sm font-semibold ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed bg-white ring-1 ring-slate-200"
                : "bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            ‹
          </button>

          {pages}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center cursor-pointer justify-center h-10 w-10 rounded-full text-sm font-semibold ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed bg-white ring-1 ring-slate-200"
                : "bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            ›
          </button>
        </nav>
      </div>
    );
  };

  return (
    <section className="py-12  pt-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#000]"
        >
          Our <span className="text-[#0095DA]">Gallery</span>
        </motion.h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentImages.map((img, index) => (
            <motion.div
              key={startIndex + index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedIndex(startIndex + index)}
            >
              <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={400}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#07D]/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <div className="relative z-10 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Plus size={50} className="mx-auto mb-2" />
                  <h3 className="text-xl font-semibold">{img.title}</h3>
                  <p className="text-sm mt-1">{img.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {renderPagination()}
      </div>


      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full px-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fixed top-6 right-6 z-[60] text-white p-2 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-6 text-white text-4xl font-bold hover:text-gray-300 cursor-pointer"
              onClick={() =>
                setSelectedIndex(
                  (selectedIndex - 1 + images.length) % images.length
                )
              }
            >
              <ChevronLeft size={40} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
                <h3 className="text-2xl font-semibold">
                  {images[selectedIndex].title}
                </h3>
                <p className="text-sm mt-1">{images[selectedIndex].subtitle}</p>
              </div>
            </motion.div>

            <button
              className="absolute right-6 text-white text-4xl font-bold hover:text-gray-300 cursor-pointer"
              onClick={() =>
                setSelectedIndex((selectedIndex + 1) % images.length)
              }
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
