"use client";

import { useMemo } from "react";
import FeaturedCard from "./featuredcard";
import RecentCard from "./recentcard";
import SectionDivider from "./sectiondivider";
import Sidebar from "./sidebar";
import Pagination from "./pagination";

const PLACEHOLDER = "/images/placeholder.jpeg";
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE || "";

/* ---------------- helpers ---------------- */
function normalizeImage(input) {
  if (!input) return PLACEHOLDER;
  const s = String(input).trim();
  if (/^(https?:)?\/\//i.test(s)) return s;
  if (/^data:image\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  if (IMAGE_BASE) {
    const base = IMAGE_BASE.replace(/\/$/, "");
    const file = s.replace(/^\/+/, "");
    return `${base}/${file}`;
  }
  return `/${s}`;
}

function normalizeHref(slugOrId) {
  const seg = slugOrId ? String(slugOrId).trim() : "";
  return `/blog/${encodeURIComponent(seg || "post")}`;
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "");
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const slugify = (str = "") =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function getCategoriesFromPost(p = {}) {
  const raw = p.category ?? p.categories ?? null;
  if (!raw) return [];
  if (Array.isArray(raw))
    return raw.map((x) => String(x).trim()).filter(Boolean);
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function postKey(p = {}) {
  return (
    p?.id ||
    p?.blogId ||
    p?.blog_id ||
    p?.slug ||
    (p?.title &&
      `${p.title}:${p?.publishdate || p?.publishDate || p?.created_at || ""}`)
  );
}

function mapToFeatured(item = {}) {
  if (!item) return null;
  const dateRaw = item.created_at || item.updated_at || "";

  return {
    id: item.id || "",
    author: item.author || "",
    title: item.title || "Untitled post",
    shortdes:
      item.shortdes ||
      item.detaildes ||
      "No description available.",
    image: normalizeImage(item.images || item.image || PLACEHOLDER),
    href: normalizeHref(item.slug || item.id || ""),
    date: formatDate(dateRaw),
  };
}

function mapToRecentCard(item = {}) {
  const dateRaw = item.created_at || item.updated_at || "";
  return {
    id: item.id || "",
    title: item.title || "Untitled post",
    shortdes:
      item.shortdes ||
      item.detaildes ||
      "No description available.",
    content: item.detaildes || "",
    image: normalizeImage(item.images || item.image || PLACEHOLDER),
    href: normalizeHref(item.slug || item.id || ""),
    date: formatDate(dateRaw),
    author: item.author || "",
    comments: "",
  };
}

/* ---------------- component ---------------- */
export default function BlogSectionOne({
  blogs = [],
  recentPosts = [],
  pagination,
  sidebarCategories,
}) {
  console.log("📰 Blog data received:", blogs);

  const featured = useMemo(
    () => (blogs && blogs.length > 0 ? mapToFeatured(blogs[0]) : null),
    [blogs]
  );

  const cards = useMemo(
    () => (Array.isArray(blogs) ? blogs : []).map(mapToRecentCard),
    [blogs]
  );

  const computedCategories = useMemo(() => {
    const all = [
      ...(Array.isArray(blogs) ? blogs : []),
      ...(Array.isArray(recentPosts) ? recentPosts : []),
    ];
    const seen = new Set();
    const uniquePosts = [];
    for (const p of all) {
      const key = postKey(p);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      uniquePosts.push(p);
    }
    const map = new Map();
    for (const p of uniquePosts) {
      const perPostCats = Array.from(new Set(getCategoriesFromPost(p))).filter(
        Boolean
      );
      for (const name of perPostCats) {
        const slug = slugify(name);
        const entry = map.get(slug) || { slug, name, count: 0 };
        entry.count += 1;
        map.set(slug, entry);
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [blogs, recentPosts]);

  const categories = Array.isArray(sidebarCategories)
    ? sidebarCategories
    : [];

  const recentForSidebar = Array.isArray(recentPosts) ? recentPosts : [];

  return (
    <section className="pt-15 sm:pt-28 md:pt-8 mb-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {featured && <FeaturedCard post={featured} />}

            <SectionDivider title="Recent Blogs" />

            <div className="mt-6 space-y-6">
              {cards.length > 0 ? (
                cards.map((p, i) => (
                  <RecentCard key={`${p.href}-${p.id || i}`} post={p} />
                ))
              ) : (
                <div className="text-sm text-slate-500 py-6">
                  No posts found.
                </div>
              )}
            </div>

            {pagination?.totalPages > 1 && (
  <div className="w-full flex justify-center mt-8">
    <Pagination
      currentPage={pagination.page}
      totalPages={pagination.totalPages}
      onChange={pagination.onChange}  // 🔹 Comes from parent
    />
  </div>
)}

          </div>

          {/* SIDEBAR */}
          <Sidebar
            key={`sb-${pagination?.page}`}
            recentPosts={recentForSidebar}
            categories={categories}
          />
        </div>
      </div>
    </section>
  );
}
