"use client";
import Link from "next/link";
import PropTypes from "prop-types";

const RAW_CATEGORY_BASE =
  process.env.NEXT_PUBLIC_BLOG_CATEGORY_BASE || "/blog/category";

function joinPath(base = "", seg = "") {
  const b = String(base || "").replace(/\/+$/, "");
  const s = String(seg || "").replace(/^\/+/, "");
  return s ? `${b}/${s}` : b || "#";
}

function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

/* ---------------- normalize: categories ---------------- */
function normalizeCategories(input) {
  const arr = Array.isArray(input) ? input : [];
  const out = [];

  for (const item of arr) {
    const nameRaw = item?.name ?? item?.category ?? "";
    const name = String(nameRaw || "").trim() || "Uncategorized";
    const countRaw = item?.count ?? item?.total;
    const count = Number.isFinite(Number(countRaw)) ? Number(countRaw) : "";

    const slug = item?.slug || (name ? slugify(name) : "uncategorized");
    out.push({ name, slug, count });
  }

  const seen = new Set();
  return out.filter((c) => {
    if (!c.slug) return false;
    if (seen.has(c.slug)) return false;
    seen.add(c.slug);
    return true;
  });
}

/* ---------------- normalize: recent posts ---------------- */
function normalizeRecentPosts(input) {
  const arr = Array.isArray(input) ? input : [];
  const out = [];

  for (const it of arr) {

    if (it && (it.href || it.title || it.date)) {

      const id = it.id ?? it.blogId ?? it.blog_id ?? it._id ?? null;
      const title = (it.title || "").trim() || "Untitled post";
      const dateRaw =
        it.date ||
        it.publishdate ||
        it.publishDate ||
        it.created_at ||
        it.updated_at ||
        "";
      const date = formatDate(dateRaw);
      const href =
        typeof it.href === "string" && it.href
          ? it.href
          : buildPostHref(it.slug || id || title);

      out.push({ id, title, date, href });
      continue;
    }

    const id = it?.id ?? it?.blogId ?? it?.blog_id ?? it?._id ?? null;
    const title = (it?.title || it?.name || "").trim() || "Untitled post";
    const dateRaw =
      it?.publishdate ||
      it?.publishDate ||
      it?.created_at ||
      it?.updated_at ||
      it?.date ||
      "";
    const date = formatDate(dateRaw);

    const slug = it?.slug || (title ? slugify(title) : "");
    const href = buildPostHref(slug || id || title);

    out.push({ id, title, date, href });
  }

  const seen = new Set();
  const deduped = [];
  for (const p of out) {
    const key = `${p.href}::${p.id ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(p);
    if (deduped.length >= 6) break;
  }
  return deduped;
}

function buildPostHref(slugOrId) {
  const seg = slugOrId ? String(slugOrId).trim() : "";
  return `/blog/${encodeURIComponent(seg || "post")}`;
}

export default function Sidebar({ recentPosts = [], categories = [] }) {
  const CATEGORY_BASE = RAW_CATEGORY_BASE;

  const normCats = normalizeCategories(categories);
  const normRecent = normalizeRecentPosts(recentPosts);
  console.log(categories);
  return (
    <aside className="mt-8 lg:mt-0 space-y-6">
      {/* Search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
      >
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#31A8D8]"
        />
      </form>

      {/* Recent posts */}
      <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h4 className="text-lg font-extrabold text-slate-900">Recent Posts</h4>
        {normRecent.length > 0 ? (
          <ul className="mt-4 space-y-5">
            {normRecent.map((p, i) => {
              const linkHref = p?.id
                ? { pathname: p.href, query: { id: p.id } }
                : p.href;
              return (
                <li
                  key={`${p.href}-${p.id ?? i}`}
                  className="border-b border-slate-200/70 pb-5 last:border-0 last:pb-0"
                >
                  {p.date && (
                    <div className="text-[10px] font-semibold tracking-[.08em] text-slate-400">
                      {p.date}
                    </div>
                  )}
                  <Link
                    href={linkHref}
                    className="mt-1 block text-[15px] font-semibold leading-snug text-slate-800 hover:text-[#1F4C7A]"
                    aria-label={`Open: ${p.title}`}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-3 text-sm text-slate-500">Nothing here yet.</div>
        )}
      </div>

      {/* Categories */}
      <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h4 className="text-lg font-extrabold text-slate-900">Categories</h4>
        {normCats.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {normCats.map((c, i) => {
              const href = joinPath(CATEGORY_BASE, c.slug);
              return (
                <li key={c.slug || `${c.name}-${i}`}>
                  <Link
                    href={href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1F4C7A]"
                    aria-label={`Category: ${c.name}`}
                  >
                    <span>{c.name}</span>
                    {c.count !== "" && (
                      <span className="text-xs text-slate-400">{c.count}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-3 text-sm text-slate-500">No categories yet.</div>
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  recentPosts: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        href: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
      }),
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        slug: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        publishdate: PropTypes.any,
        publishDate: PropTypes.any,
        created_at: PropTypes.any,
        updated_at: PropTypes.any,
      }),
    ])
  ),
  categories: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ category: PropTypes.any, total: PropTypes.number }),
      PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        count: PropTypes.number,
      }),
    ])
  ),
};
