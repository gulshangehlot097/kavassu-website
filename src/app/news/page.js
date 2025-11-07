"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { callApi } from "../api";
import constant from "../env";
import Pagination from "../components/blog/pagination";

export default function NewsCastSection() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const reqIdRef = useRef(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 1;

  // ---------- FETCH NEWS ----------
  const fetchNews = useCallback(
    async (page = 1) => {
      const id = ++reqIdRef.current;
      setLoading(true);

      try {
        const res = await callApi(
          `${constant.API.NEWS.VIEWNEWS}?page=${page}&limit=${pageSize}`,
          "GET"
        );
        console.log("News API Response:", res);

        if (id !== reqIdRef.current) return;

        if (res?.status || res?.success) {
          const data = Array.isArray(res.data)
            ? res.data
            : res.data
            ? [res.data]
            : [];
          setNewsList(data);

          if (res?.totalPages) {
            setTotalPages(res.totalPages);
          } else if (res?.totalCount) {
            setTotalPages(Math.ceil(res.totalCount / pageSize));
          } else {
            setTotalPages(1);
          }
        } else {
          setNewsList([]);
        }
      } catch (err) {
        if (id !== reqIdRef.current) return;
        console.error("News fetch error:", err);
        setNewsList([]);
      } finally {
        if (id === reqIdRef.current) setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchNews(currentPage);
  }, [fetchNews, currentPage]);

  // ---------- DEMO DATA (if API empty) ----------
  const demoNews = [
    {
      id: 1,
      image: "/images/news1.jpg",
      category: "Project Update",
      title: "New Smart City Project Completed Ahead of Schedule",
      shortdes:
        "Our latest infrastructure milestone achieved with cutting-edge materials and eco-friendly techniques.",
      link: "/news/new-smart-city",
    },
    {
      id: 2,
      image: "/images/news2.jpg",
      category: "Innovation",
      title: "3D Printing Revolution in Modern Construction",
      shortdes:
        "Discover how 3D concrete printing is transforming architecture and reducing project timelines drastically.",
      link: "/news/3d-printing-revolution",
    },
    {
      id: 3,
      image: "/images/news3.jpg",
      category: "Safety",
      title: "Ensuring Site Safety with AI Monitoring Systems",
      shortdes:
        "How AI cameras and sensors are redefining worker safety standards on construction sites.",
      link: "/news/ai-site-safety",
    },
    {
      id: 4,
      image: "/images/news4.jpg",
      category: "Sustainability",
      title: "Building Greener Futures with Sustainable Materials",
      shortdes:
        "We explore renewable alternatives shaping the future of eco-friendly construction projects.",
      link: "/news/green-construction",
    },
    {
      id: 5,
      image: "/images/news5.jpg",
      category: "Infrastructure",
      title: "Smart Roads Initiative Launched Nationwide",
      shortdes:
        "A national movement towards intelligent road systems using IoT and green energy.",
      link: "/news/smart-roads",
    },
  ];

  const apiAvailable = newsList.length > 0;
  const listToUse = apiAvailable ? newsList : demoNews;

  const paginatedList = !apiAvailable
    ? listToUse.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : listToUse;
  console.log("hello  world", paginatedList);
  useEffect(() => {
    if (!apiAvailable) {
      setTotalPages(Math.ceil(listToUse.length / pageSize));
    }
  }, [apiAvailable, listToUse]);


  return (
    <section className="relative py-20 overflow-hidden">
      

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#000]"
          >
            Construction <span className="text-[#0095DA]">News & Updates</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 mt-3 max-w-2xl mx-auto"
          >
            Stay informed about the latest trends, technologies, and
            achievements in the construction world.
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading news...</div>
        ) : paginatedList.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No news articles found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {paginatedList.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:-translate-y-2"
                >
                  <div className="overflow-hidden relative">
                   <Image
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${constant.BASE_URL}${item.images}`
                      }
                      alt={item.title}
                      width={500}
                      height={300}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-[#0095DA] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between h-[150px]">
                    <div>
                      <h3 className="text-lg font-bold text-[#1F4C7A] line-clamp-2 group-hover:text-[#0095DA] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                        {item.shortdes}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={item.link || `/news/${item.id}`}
                        className="inline-block text-sm font-semibold text-[#1F4C7A] border border-[#1F4C7A] rounded-full px-4 py-1.5 hover:bg-[#DE231C] hover:text-white transition-all"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
