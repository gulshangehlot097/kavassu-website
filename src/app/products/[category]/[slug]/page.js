"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ProductHero from "../../../components/products/producthero";
import ProductBody from "../../../components/products/productbody";
import Link from "next/link";
import { callApi } from "../../../api";
import constant from "../../../env";

export default function ProductPage() {
  const params = useParams();
  const { category, slug } = params || {};
  const id = slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const url = constant.API.PRODUCTS.SINGLEPRODUCTS;
      const res = await callApi(url, "POST", { id });

      console.log("API Response:", res);

      // Flexible structure handling
      const apiData =
        res?.data?.data || // {data: {...}}
        res?.data || // {...}
        res; // direct response

      if (!apiData || !apiData.id) {
        console.warn("Invalid product data", apiData);
        return;
      }

      // Parse fields safely
      let parsedImages = [];
      let parsedTechnical = [];

      try {
        parsedImages = JSON.parse(apiData.images || "[]");
      } catch (e) {}
      try {
        parsedTechnical = JSON.parse(apiData.technicalData || "[]");
      } catch (e) {}

      const mappedProduct = {
        id: apiData.id,
        title: apiData.title?.trim(),
        category: apiData.category,
        summary: apiData.shortdes,
        description: apiData.content,
        pdf: apiData.datasheet
          ? `${constant.BASE_URL}${apiData.datasheet.startsWith("/") ? apiData.datasheet : "/" + apiData.datasheet}`
          : null,
        technicalData: parsedTechnical,
        images: parsedImages.map((imgObj) => {
          const key = Object.keys(imgObj)[0];
          const path = imgObj[key];
          return {
            [key]: `${constant.BASE_URL}${path.startsWith("/") ? path : "/" + path}`,
          };
        }),
      };

      setProduct(mappedProduct);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id, fetchProduct]);

  // Loading state
  if (loading)
    return (
      <div className="p-10 text-center text-lg font-semibold text-gray-600">
        Loading product details...
      </div>
    );

  // Not found
  if (!product)
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Product not found
        </h1>
        <Link href="/products" className="text-blue-600 underline">
          Back to Products
        </Link>
      </div>
    );

  // ✅ Show Product
  return (
    <main className="relative mx-auto px-6 py-12">
     {/* <div className="absolute top-0 left-[-20%] w-[300px] h-[300px] bg-gradient-to-br from-blue-100/70 to-pink-100/60 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-[-20%] w-[350px] h-[350px] bg-gradient-to-tl from-indigo-100/70 to-blue-50/70 rounded-full blur-3xl"></div> */}

      <ProductHero product={product} />
      <ProductBody product={product} />
    </main>
  );
}
