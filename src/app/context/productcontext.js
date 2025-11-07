"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { callApi } from "../api";
import constant from "../env";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await callApi(constant.API.PRODUCTS.HOMEPRODUCTS, "GET");
      const data = res?.data?.categories ? res.data : res;

      if (!data?.status) return console.error("Failed to fetch products.");

      setCategories(Array.isArray(data?.categories) ? data.categories : []);
      setProducts(Array.isArray(data?.products) ? data.products : []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ categories, products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
