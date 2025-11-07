"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { callApi } from "../../api";
import constant from "../../env";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiTag, FiChevronLeft } from "react-icons/fi";

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    (async () => {
      setLoading(true);
      try {
        const res = await callApi(constant.API.NEWS.SINGLEPRODUCTS, "POST", { id: slug });
        console.log("Single news Response:", res);

        if (res?.status && res?.data) {
          const d = res.data;
          setNews({
            id: d.id,
            title: d.title || "Untitled",
            description: d.detaildes || d.shortdes || "",
            image: d.images ? `${constant.BASE_URL}${d.images}` : "",
            category: d.category || "",
            date: d.updated_at || d.created_at || "",
          });
        } else {
          setError("News not found.");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  if (loading) return <div className="text-center py-16 text-gray-500">Loading news...</div>;
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;

  return (
    <main className="relative w-full overflow-hidden pt-10 sm:pt-8 md:pt-12 mb-16">
      <div className="mx-auto max-w-4xl px-4">

        <div className="bg-white p-4 rounded-2xl mb-4 shadow-sm ring-1 ring-black/5">
          <motion.div
            {...fadeUp}
            className="flex items-center justify-between text-xs text-slate-500"
          >
            <nav>
              <Link href="/" className="hover:text-[#1F4C7A]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/news" className="hover:text-[#1F4C7A]">News</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">{news.title}</span>
            </nav>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-50"
            >
              <FiChevronLeft /> Back
            </Link>
          </motion.div>
        </div>


        {news.image && (
          <motion.div
            {...fadeUp}
            className="rounded-[28px] bg-gradient-to-r from-sky-400/60 via-indigo-300/50 to-sky-400/60 p-[2px] shadow-sm ring-1 ring-black/5"
          >
            <div className="overflow-hidden rounded-[26px] bg-white">
              <motion.img
                src={news.image}
                alt={news.title}
                className="w-full h-[420px] md:h-[540px] object-cover"
                initial={{ scale: 1.02 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                loading="eager"
              />
            </div>
          </motion.div>
        )}

        <motion.section {...fadeUp} className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F4C7A]">
            {news.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {news.date && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                <FiCalendar /> {new Date(news.date).toLocaleDateString()}
              </span>
            )}
            {news.category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F7FE] text-[#1F4C7A] px-3 py-1">
                <FiTag /> {news.category}
              </span>
            )}
          </div>

          <motion.article
            {...fadeUp}
            className="mt-6 rounded-[28px] bg-white text-justify shadow-sm ring-1 ring-black/5 p-5 sm:p-8"
          >
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {news.description}
            </p>
          </motion.article>
        </motion.section>
      </div>
    </main>
  );
}
