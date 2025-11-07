"use client";

import { motion } from "framer-motion";
import ProductSpecs from "./productspaces";
import Link from "next/link";
import { useMemo } from "react";
import constant from "../../env";

const toAbs = (url = "") => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${constant.BASE_URL}${clean}`;
};

function sanitizeAndAbsolutize(html = "") {
  if (!html) return "";
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  html = html.replace(
    /\s(src|href)\s*=\s*(['"])\s*\/(?!\/)([^'"]+)\2/gi,
    (m, a, q, p) => ` ${a}=${q}${toAbs("/" + p)}${q}`
  );
  html = html.replace(
    /\s(src|href)\s*=\s*(['"])(?!https?:\/\/|\/)([^'"]+)\2/gi,
    (m, a, q, p) => ` ${a}=${q}${toAbs("/" + p)}${q}`
  );
  html = html.replace(
    /url\((['"]?)\/(?!\/)([^'")]+)\1\)/gi,
    (m, q, p) => `url(${q}${toAbs("/" + p)}${q})`
  );
  html = html.replace(
    /url\((['"]?)(?!https?:\/\/|\/)([^'")]+)\1\)/gi,
    (m, q, p) => `url(${q}${toAbs("/" + p)}${q})`
  );
  return html;
}

export default function ProductBody({ product }) {
  console.log(product)
  const safeHtml = useMemo(
    () => sanitizeAndAbsolutize(product?.description || ""),
    [product?.description]
  );

  return (
    <section className="mt-28 px-4 sm:px-8 ">
      

      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-3 relative z-10">
        {/* ---------- MAIN CONTENT ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-2 space-y-10"
        >
          <div className="relative rounded-3xl bg-white/80 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl p-10 hover:shadow-[0_12px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
          

            {/* ---------- IMAGE GALLERY ---------- */}
            {product.images?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {product.images.map((imgObj, i) => {
                  const img = imgObj.image || imgObj.image1;
                  return (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500 object-cover w-full h-64"
                    />
                  );
                })}
              </div>
            )}

            {/* ---------- RICH DESCRIPTION ---------- */}
            <div
              className="prose prose-slate max-w-none text-gray-800 leading-relaxed 
              prose-img:rounded-xl prose-headings:scroll-mt-28 
              prose-a:text-blue-600 hover:prose-a:text-blue-700 
              prose-h2:border-l-4 prose-h2:border-blue-400 prose-h2:pl-3
              [&_p]:mb-5 [&_ul]:list-disc [&_ul]:ml-6 [&_h3]:text-lg [&_h3]:font-semibold [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </div>
        </motion.div>

        {/* ---------- SIDEBAR ---------- */}
        <motion.aside
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* TECHNICAL DATA CARD */}
          <div className="sticky top-24 rounded-3xl bg-white/80 border border-gray-100 backdrop-blur-xl shadow-[0_8px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
<div className="p-6">
  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
    ⚙️ Technical Specifications
  </h3>

  <ul className="divide-y divide-gray-100">
    {(product.technicalData || []).map((item, i) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      return (
        <li
          key={i}
          className="flex justify-between py-2 text-sm text-gray-700"
        >
    <span className="flex items-center gap-2 font-medium text-gray-900">
  <span className="w-2 h-2 bg-[#0095DA] rounded-full"></span>
  {key.trim()}
</span>

          <span className="text-gray-600 text-right">{value.trim()}</span>
        </li>
      );
    })}
  </ul>
</div>





            {/* CTA AREA */}
            <div className="border-t border-gray-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-b-3xl p-6 flex flex-col gap-3">
              {product.pdf && (
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  href={product.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center font-semibold rounded-xl py-2.5 
                    border border-blue-200 bg-white text-blue-700 
                    hover:bg-blue-50 hover:shadow-md transition-all duration-300"
                >
                  📘 Download Datasheet
                </motion.a>
              )}

              <motion.div whileHover={{ scale: 1.04 }}>
                <Link
                  href="/contact"
                  className="block w-full text-center text-white font-semibold rounded-xl py-2.5 
                    bg-[#0095DA] text-white shadow hover:bg-[#E52B2A] transition-all duration-300"
                >
                  ✨ Request a Quote
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
