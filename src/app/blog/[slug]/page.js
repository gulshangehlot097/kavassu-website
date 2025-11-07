"use client";

import Seo from "../../components/seo";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation"; // ✅ For slug + query params
import Head from "next/head";
import Link from "next/link";
import { callApi } from "../../api";
import constant from "../../env";
import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiTag,
  FiShare2,
  FiCopy,
  FiChevronLeft,
  FiCheck,
} from "react-icons/fi";

// ---------- Helper Functions ----------
const toAbs = (url = "") => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${constant.BASE_URL}${clean}`;
};

const stripHtml = (s = "") =>
  s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const calcReadingTime = (html = "") =>
  Math.max(
    1,
    Math.ceil(stripHtml(html).split(/\s+/).filter(Boolean).length / 200)
  );

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

const pickTitle = (b) =>
  b?.metatitle ||
  (b?.title && b.title !== "Untitled post") ||
  stripHtml(b?.content || "").slice(0, 80) ||
  b?.slug ||
  "Blog";

// ---------- Main Component ----------
export default function BlogDetail() {
  const { slug } = useParams();
  const searchParams = useSearchParams(); 
  const id = searchParams.get("id"); 

  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await callApi(constant.API.SINGLEBLOG, "POST", { id }); 
        console.log("Single Blog Response:", res);

        if (!cancelled) {
          const b =
            res?.status && (res?.data || res?.blog)
              ? res.data || res.blog
              : null;

          if (b && typeof b === "object") {
            setPost({
              id: b.id,
              slug: b.slug,
              title: pickTitle(b),
              content: b.content || "",
              image: b.image || b.featured_image_url || b.featuredImage || "",
              date:
                b.publishdate ||
                b.publishDate ||
                b.created_at ||
                b.updated_at ||
                "",
              author: b.author || b.created_by || "",
              meta: {
                description: b.metadescription || "",
                keywords: b.keywords || "",
              },
              category: b.category || "",
              tags: b.tags || "",
            });
          } else {
            setErr(res?.message || "Post not found.");
          }
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        if (!cancelled) setErr("Failed to load the post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const safeHtml = useMemo(
    () => sanitizeAndAbsolutize(post?.content || ""),
    [post?.content]
  );
  const title = post ? post.title : "Blog";
  const hero = toAbs(post?.image || "");
  const readMins = post ? calcReadingTime(post.content) : null;

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" },
  };

  return (
    <>
      <Seo
        title={`${title} | DigiBima Blog`}
        description={
          post?.meta?.description ||
          stripHtml(post?.content || "").slice(0, 150) ||
          "Read this blog on DigiBima for insights, tips, and updates."
        }
        keywords={post?.meta?.keywords || post?.tags || ""}
        image={hero}
      />

      <main className="relative w-full overflow-hidden pt-10 sm:pt-8 md:pt-12 mb-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* ---------- Breadcrumb ---------- */}
          <div className="bg-white p-4 rounded-2xl mb-4">
            <motion.div
              {...fadeUp}
              className="flex items-center justify-between text-xs text-slate-500 mb-4"
            >
              <nav>
                <Link href="/" className="hover:text-[#1F4C7A]">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-[#1F4C7A]">
                  Blogs
                </Link>
                {post?.slug && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{post.slug}</span>
                  </>
                )}
              </nav>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-50"
              >
                <FiChevronLeft /> Back
              </Link>
            </motion.div>
          </div>

          {/* ---------- Hero Image ---------- */}
          {hero && (
            <motion.div
              {...fadeUp}
              className="rounded-[28px] bg-gradient-to-r from-sky-400/60 via-indigo-300/50 to-sky-400/60 p-[2px] shadow-sm ring-1 ring-black/5"
            >
              <div className="overflow-hidden rounded-[26px] bg-white">
                <motion.img
                  src={hero}
                  alt={title}
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

          {/* ---------- Blog Content ---------- */}
          <motion.section {...fadeUp} className="mt-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F4C7A]">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              {post?.author && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  <FiUser /> {post.author}
                </span>
              )}
              {post?.date && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  <FiCalendar />
                  <time dateTime={post.date} className="ml-1">
                    {post.date}
                  </time>
                </span>
              )}
              {readMins && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  <FiClock /> {readMins} min read
                </span>
              )}
              {post?.category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F7FE] text-[#1F4C7A] px-3 py-1">
                  <FiTag /> {post.category}
                </span>
              )}
            </div>

            <motion.article
              {...fadeUp}
              className="mt-6 rounded-[28px] bg-white text-justify shadow-sm ring-1 ring-black/5 p-5 sm:p-8"
            >
              <div
                className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:scroll-mt-28 prose-a:text-[#1F4C7A] hover:prose-a:text-sky-600 prose-h2:border-l-4 prose-h2:border-sky-400 prose-h2:pl-2"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />

              {post?.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags
                    .split(",")
                    .filter(Boolean)
                    .map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700"
                      >
                        {t.trim()}
                      </span>
                    ))}
                </div>
              )}
            </motion.article>

            {!loading && err && (
              <p className="py-10 text-center text-red-600">{err}</p>
            )}
          </motion.section>
        </div>

        <Head>
          <title>{title} | Blog</title>
          {hero ? <meta property="og:image" content={hero} /> : null}
          <meta name="description" content={post?.meta?.description || title} />
          {post?.meta?.keywords ? (
            <meta name="keywords" content={post.meta.keywords} />
          ) : null}
        </Head>
      </main>
    </>
  );
}
