"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import constant from "../../env";

function stripHtml(html = "") {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "");
}

function truncate(text = "", n = 220) {
  if (text == null) return "";
  const str = typeof text === "string" ? text : String(text);
  const clean = str.trim();
  return clean.length > n ? `${clean.slice(0, n).trim()}…` : clean;
}

// safe join for BASE_URL + relative path
function joinUrl(base = "", path = "") {
  const b = String(base || "").replace(/\/+$/, "");
  const p = String(path || "").replace(/^\/+/, "");
  return b ? `${b}/${p}` : `/${p}`;
}

export default function FeaturedCard({ post = {} }) {
  const {
    id = "",
    image = "/images/placeholder.jpeg",
    title = "Untitled post",
    shortdes = "",
    href = "#",
    date = "",
    author = "",
    comments = "",
  } = post;

  // compute full image url (no logic change, just safer join)
  const rawFull = useMemo(() => {
    const isAbs = /^(https?:)?\/\//i.test(image) || /^data:image\//i.test(String(image || ""));
    return isAbs ? image : joinUrl(constant?.BASE_URL || "", image || "/images/placeholder.jpeg");
  }, [image]);

  const [failed, setFailed] = useState(false);
  const fullImageUrl = failed ? "/images/placeholder.jpeg" : rawFull;

  const isExternal =
    typeof fullImageUrl === "string" &&
    (/^(https?:)?\/\//i.test(fullImageUrl) || /^data:image\//i.test(fullImageUrl));

  const safeshortdes = truncate(stripHtml(shortdes), 220);
  const safeTitle = (title || "Untitled post").toString();

  // same pattern as before
  const linkHref = id ? { pathname: href, query: { id } } : href;

  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 md:min-h-[320px]">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Image */}
        <div className="relative w-full h-full bg-white md:min-h-[320px] overflow-hidden flex items-center justify-center">
          <Image
            src={fullImageUrl || "/images/placeholder.jpeg"}
            alt={safeTitle || "Blog featured image"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-3"
            priority={false}
            unoptimized={isExternal}
            onError={() => setFailed(true)}
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 md:border-l md:border-slate-200 flex flex-col h-full">
          {(date || author || comments) && (
            <p className="text-xs  text-slate-500 mb-2">
              {date && <time dateTime={date}>{date}</time>}
              {author && <> &nbsp; | &nbsp; By {author}</>}
              {comments && <> &nbsp; | &nbsp; {comments}</>}
            </p>
          )}

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F4C7A]">
            {safeTitle}
          </h2>

          {safeshortdes && (
            <p className="mt-4 text-slate-700 text-justify  leading-relaxed whitespace-pre-line">
              {safeshortdes}
            </p>
          )}

          <div className="mt-auto pt-6 flex items-center justify-between">
            <Link
              href={linkHref}
              className="inline-flex items-center thmbtn px-5 py-2.5"
              aria-label={`Read more: ${safeTitle}`}
            >
              Read more
            </Link>
            {date && <span className="text-xs font-medium text-slate-400">{date}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

FeaturedCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    shortdes: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    href: PropTypes.string,
    date: PropTypes.string,
    comments: PropTypes.string,
  }),
};
