"use client";
import PropTypes from "prop-types";


export default function Pagination({ currentPage = 1, totalPages = 1, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const clamp = (n) => Math.min(Math.max(1, n), totalPages);
  const goTo = (n) => {
    const next = clamp(n);
    if (next !== currentPage && typeof onChange === "function") onChange(next);
  };

  const buildPages = () => {
    const delta = 1;
    const set = new Set([1, totalPages]);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i >= 1 && i <= totalPages) set.add(i);
    }
    if (currentPage <= 2 && totalPages >= 2) set.add(2);
    if (currentPage >= totalPages - 1 && totalPages >= 2) set.add(totalPages - 1);

    const sorted = Array.from(set).sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      out.push(a);
      if (b && b - a > 1) out.push("ellipsis");
    }
    return out;
  };

  const pages = buildPages();


  const baseBtn =
    "inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full text-sm md:text-base " +
    "font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7998F4] " +
    "active:scale-95";
  const inactive =
    "bg-white/90 ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50 hover:shadow-sm";
  const active =
    "bg-[#7998F4] text-white shadow-md ring-0";
  const ellipsisCls =
    "h-10 w-10 md:h-11 md:w-11 inline-flex items-center justify-center text-slate-400";

  return (
    <div className="w-full flex justify-center mt-8">
      <nav
        className="flex items-center gap-2 md:gap-3 select-none rounded-full bg-white/60 backdrop-blur px-2 py-2 ring-1 ring-slate-200 shadow-sm"
        aria-label="Pagination"
      >
        {/* Prev */}
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${baseBtn} ${inactive} ${currentPage <= 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Previous page"
          title="Previous"
        >
          <span aria-hidden="true">‹</span>
        </button>


        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`e-${idx}`} className={ellipsisCls} aria-hidden="true">
              …
            </span>
          ) : (
           <button
  key={`p-${p}`}
  type="button"
  onClick={() => goTo(p)}
  className={`${baseBtn} ${
    p === currentPage ? active : inactive
  } cursor-pointer`}
  aria-current={p === currentPage ? "page" : undefined}
  aria-label={`Page ${p}`}
  title={`Page ${p}`}
>
  {p}
</button>

          )
        )}

        {/* Next */}
       <button
  type="button"
  onClick={() => goTo(currentPage + 1)}
  disabled={currentPage >= totalPages}
  className={`${baseBtn} ${inactive} ${
    currentPage >= totalPages
      ? "opacity-40 cursor-not-allowed"
      : "cursor-pointer"
  }`}
  aria-label="Next page"
  title="Next"
>
  <span aria-hidden="true">›</span>
</button>

      </nav>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChange: PropTypes.func,
};
