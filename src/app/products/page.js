"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { callApi } from "../api";
import constant from "../env";
import { showError } from "../components/toaster";

export default function ProductsIndex() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { key: "all", label: "All Products" },
  ]);
  const [activeTab, setActiveTab] = useState("all");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await callApi(constant.API.PRODUCTS.VIEWPRODUCTS, "GET");

      // Handle different API response structures
      const data = res?.data?.categories ? res.data : res;
      if (!data?.status) {
        showError(data?.message || "Failed to fetch products.");
        return;
      }

      const allProducts = data?.allproduct?.results || [];
      let categoryArray = [];
      const categoryTabs = [{ key: "all", label: "All Products" }];

      if (data?.categories && typeof data.categories === "object") {
        for (const key in data.categories) {
          const cat = data.categories[key];
          categoryTabs.push({ key, label: key });
          if (Array.isArray(cat?.results)) categoryArray.push(...cat.results);
        }
      }

      const uniqueProducts = [
        ...new Map([...allProducts, ...categoryArray].map((p) => [p.id, p])).values(),
      ];

      setProducts(uniqueProducts);
      setCategories(categoryTabs);
    } catch (err) {
      console.error("Error fetching products:", err);
      showError("Unexpected error occurred while loading products.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts =
    activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

  // Convert category to URL-safe slug (spaces → hyphens)
  const makeSlug = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  return (
  <main className="container mx-auto px-6 py-12">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900"
  >
    Discover Our{" "}
    <span className="text-[#0095DA]">Products</span>
  </motion.h1>

  {/* Category Tabs */}
  <div className="flex flex-wrap justify-center gap-3 mb-12">
    {categories.map((cat) => (
     <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-5 py-2.5 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 border ${
              activeTab === cat.key
                ? "bg-[#0095DA] text-white shadow-lg border-transparent"
                : "bg-white border-gray-200 text-gray-700 hover:border-[#0095DA] hover:text-[#0095DA]"
            }`}
          >
            {cat.label}
          </button>
    ))}
  </div>

  {/* Product Grid */}
  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((p, i) => {
        let imageUrl = "/home/crousel-three-one.jpg";
        try {
          const parsed = JSON.parse(p.images);
          if (Array.isArray(parsed) && parsed[0]?.image) {
            const cleanPath = parsed[0].image.startsWith("/")
              ? parsed[0].image
              : `/${parsed[0].image}`;
            imageUrl = `${constant.BASE_URL}${cleanPath}`;
          }
        } catch (e) {
          console.error("Image parse error:", e);
        }

        return (
<motion.div
  key={p.id}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.05 }}
>
  <Link
    href={`/products/${makeSlug(p.category)}/${p.id}`}
    className="group relative block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 "
  >
    {/* Image Collage Effect */}
    <div className="relative h-56 overflow-hidden">
     <Image
  src={imageUrl}
  alt={p.title}
  fill 
  className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

      {/* Top-Left Slice */}
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-cover opacity-0 group-hover:opacity-20 mix-blend-overlay transition-all duration-700"></div>

      {/* Split Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0095DA]/60 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-tr-2xl"></div>
        <div className="absolute inset-0 bg-[#E52B2A]/60 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-bl-2xl"></div>
      </div>
    </div>

    {/* Info Section */}
    <div className="p-5 pb-14 relative z-10">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0095DA] transition-colors">
        {p.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
        {p.shortdes}
      </p>
    </div>

    {/* View Button — always visible */}
    <div className="absolute pl-5 bottom-4 z-10 transition-all duration-500">
      <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#0095DA] text-white rounded-full shadow hover:bg-[#E52B2A] transition-colors">
        View Details
      </span>
    </div>
  </Link>
</motion.div>


        );
      })
    ) : (
      <p className="text-gray-500 text-center col-span-full">
        No products found in this category.
      </p>
    )}
  </div>
</main>

  );
}
