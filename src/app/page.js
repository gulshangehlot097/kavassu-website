"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import HeroRoofingCarousel from "./components/home/herosection";
import FeatureSection from "./components/home/whychoose";
import AboutSection from "./components/home/aboutus";
import ProductRangeSection from "./components/home/productcard";
import CTASection from "./components/home/ctasection";
import { callApi } from "./api";
import constant from "./env";
import { showSuccess, showError } from "./components/toaster";

export default function Home() {
  // const [categories, setCategories] = useState([]); 
  // const [products, setProducts] = useState([]); 

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const res = await callApi(constant.API.PRODUCTS.HOMEPRODUCTS, "GET");

  //     // normalize structure
  //     const data = res?.data?.categories ? res.data : res;

  //     if (!data?.status) {
  //       showError(data?.message || "Failed to fetch products.");
  //       return;
  //     }


  //     // console.log("Fetched categories:", data?.categories);
  //     // console.log("Fetched products:", data?.products);

  //     setCategories(Array.isArray(data?.categories) ? data.categories : []);
  //     setProducts(Array.isArray(data?.products) ? data.products : []);
  //   } catch (err) {
  //     console.error("Error fetching products:", err);
  //     showError("Unexpected error occurred while loading products.");
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);


  return (
   <div className="min-h-screen">
      <HeroRoofingCarousel />

<FeatureSection />

      <ProductRangeSection  />


      <AboutSection />

   
      <CTASection />
    </div>
  );
}
