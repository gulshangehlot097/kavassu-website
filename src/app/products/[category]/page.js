"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { callApi } from "../../api";
import constant from "../../env";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../components/blog/pagination"; 

export default function ProductPage({ params }) {
  const { category } = params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const reqIdRef = useRef(0);
  const PER_PAGE = 1; // change if you want more/less per page

  // 🔹 Convert slug → readable category
  const formatCategoryName = (slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // 🔹 Fetch paginated products by category
  const fetchProducts = useCallback(
    async (page = 1) => {
      const id = ++reqIdRef.current;
      setLoading(true);

      try {
        const formattedCategory = formatCategoryName(category);
        const url = `${constant.API.PRODUCTS.SINGLEPRODUCTS}?page=${page}&limit=${PER_PAGE}`;
        const res = await callApi(url, "POST", { category: formattedCategory });
        console.log("📦 Product API Response:", res);

        if (id !== reqIdRef.current) return;

        if (res?.status || res?.success) {
          // Normalize data
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.results
            ? res.data.results
            : [];

          setProducts(data);

          // Pagination meta
          const total =
            res.totalPages ||
            (res.totalCount
              ? Math.ceil(Number(res.totalCount) / PER_PAGE)
              : 1);
          setTotalPages(total > 0 ? total : 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("❌ Product fetch error:", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        if (id === reqIdRef.current) setLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    if (category) fetchProducts(currentPage);
  }, [category, currentPage, fetchProducts]);

  // 🔹 Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading UI
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin" />
      </div>
    );

  // No products
  if (!loading && products.length === 0)
    return (
      <p className="text-center text-gray-600 py-10">
        No products found for {formatCategoryName(category)}.
      </p>
    );

  // Helper: make category slug
  const makeSlug = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  return (
    <main className="min-h-screen  py-14 px-6 md:px-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-bold mb-12 text-gray-900"
      >
        {formatCategoryName(category)}
        <span className="text-[#0095DA]"> Products</span>
      </motion.h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p, i) => {
          // Parse product images
          let images = [];
          try {
            const parsed = JSON.parse(p.images);
            images = Array.isArray(parsed)
              ? parsed.map((imgObj) => {
                  const key = Object.keys(imgObj)[0];
                  const path = imgObj[key];
                  return `${constant.BASE_URL}${
                    path.startsWith("/") ? path : "/" + path
                  }`;
                })
              : [];
          } catch (e) {
            console.error("Image parse error:", e);
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                {images.length > 0 ? (
                  <Image
                    src={images[0]}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-[url('/grid.png')] bg-cover opacity-0 group-hover:opacity-20 mix-blend-overlay transition-all duration-700"></div>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[#0095DA]/60 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-tr-2xl"></div>
                  <div className="absolute inset-0 bg-[#E52B2A]/60 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-bl-2xl"></div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 flex flex-col justify-between min-h-[200px] relative z-10">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0095DA] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {p.shortdes}
                  </p>
                </div>
                <Link
                  href={`/products/${makeSlug(p.category)}/${p.id}`}
                  className="mt-4 inline-block text-center w-full py-2.5 rounded-full bg-[#0095DA] text-white font-medium text-sm hover:bg-[#E52B2A] transition-all duration-300"
                >
                  View Details →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ✅ Pagination Section */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
