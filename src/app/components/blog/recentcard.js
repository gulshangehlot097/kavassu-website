"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import constant from "../../env";


function joinUrl(base = "", path = "") {
  const b = String(base || "").replace(/\/+$/, "");
  const p = String(path || "").replace(/^\/+/, "");
  return b ? `${b}/${p}` : `/${p}`;
}

export default function BlogCard({ post = {} }) {
  const {
    id = "",
    image = "/images/placeholder.jpeg",
    title = "",
    shortdes = "",
    href = "#",
    date = "",
    author = "",
    comments = "",
  } = post;


  const rawFull = useMemo(() => {
    const s = String(image || "");
    const isAbs = /^(https?:)?\/\//i.test(s) || /^data:image\//i.test(s);
    return isAbs ? s : joinUrl(constant?.BASE_URL || "", s || "/images/placeholder.jpeg");
  }, [image]);

  const [failed, setFailed] = useState(false);
  const imageUrl = failed ? "/images/placeholder.jpeg" : rawFull;

  const isExternal =
    typeof imageUrl === "string" &&
    (/^(https?:)?\/\//i.test(imageUrl) || /^data:image\//i.test(imageUrl));

 
  const linkHref = id ? { pathname: href, query: { id } } : href;

  const safeTitle = (title || "Untitled post").toString();

  return (
    <article className="group overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-slate-200 transition hover:shadow-lg focus-within:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">

        <div className="w-full h-full relative flex items-center justify-center bg-white">
          <Image
            src={imageUrl}
            alt={safeTitle || "Blog post image"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain max-h-full max-w-full p-3"
            priority={false}
            unoptimized={isExternal}
            onError={() => setFailed(true)}
          />
        </div>

 
        <div className="flex flex-col p-6 sm:p-8 md:border-l md:border-slate-200">
          {(date || author || comments) && (
            <p className="text-xs text-slate-500 mb-2">
              {date && <time dateTime={date}>{date}</time>}
              {author && <> &nbsp; | &nbsp; By {author}</>}
              {comments && <> &nbsp; | &nbsp; {comments}</>}
            </p>
          )}


          <h3 className="text-2xl font-extrabold tracking-tight text-[#1F4C7A] line-clamp-2">
            <Link
              href={linkHref}
              className="outline-none focus-visible:ring-2 focus-visible:ring-[#31A8D8] rounded-sm"
              aria-label={`Read: ${safeTitle}`}
            >
              {safeTitle}
            </Link>
          </h3>

          {shortdes && (
            <p className="mt-3 text-slate-700  text-justify leading-relaxed line-clamp-3">
              {shortdes}
            </p>
          )}

          <div className="mt-auto pt-4">
            <Link href={linkHref} className="inline-flex items-center px-5 py-2.5 thmbtn" aria-label={`Read more: ${safeTitle}`}>
              Read More +
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    title: PropTypes.string,
    shortdes: PropTypes.string,
    href: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    comments: PropTypes.string,
  }),
};
