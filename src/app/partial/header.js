"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useProducts } from "../context/productcontext";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Globe,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#de231c";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Management", href: "/about/management" },
      { label: "R&D Division", href: "/about/rd-division" },
    ],
  },
  { label: "Products", href: "/products", children: [] },
  { label: "News Cast", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contactus" },
];

export default function Header() {
  const topRef = useRef(null);
  const navRef = useRef(null);
  const [topH, setTopH] = useState(0);
  const [navH, setNavH] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { categories } = useProducts();

  useEffect(() => {
    const recalc = () => {
      const topHeight = topRef.current?.offsetHeight ?? 0;
      const navHeight = navRef.current?.offsetHeight ?? 0;
      setTopH(topHeight);
      setNavH(navHeight);
      document.documentElement.style.setProperty("--header-offset", `${topHeight + navHeight}px`);
    };
    recalc();
    const ro1 = new ResizeObserver(recalc);
    const ro2 = new ResizeObserver(recalc);
    if (topRef.current) ro1.observe(topRef.current);
    if (navRef.current) ro2.observe(navRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro1.disconnect();
      ro2.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpenDropdown(null);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Dynamic Product Dropdown
  const dynamicProductsMenu = {
    label: "Products",
    href: "/products",
    children: categories.map((cat) => ({
      label: cat.category,
      href: `/products/${cat.category.toLowerCase().replace(/\s+/g, "-")}`,
      desc: `Explore ${cat.category} solutions.`,
      children: cat.products.map((p) => ({
        label: p.title,
        href: `/products/${cat.category
          .toLowerCase()
          .replace(/\s+/g, "-")}/${p.id}`,
      })),
    })),
  };

  const finalNav = NAV.map((item) =>
    item.label === "Products" ? dynamicProductsMenu : item
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        {/* Top Bar */}
        <div
          ref={topRef}
          className="bg-[#0d7adf] text-white text-[13px]"
        >
          <div className="mx-auto max-w-7xl flex flex-wrap justify-between items-center px-4 py-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Jaipur, Rajasthan
              </span>
              <a href="tel:+919829065184" className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> +91 98290 65184
              </a>
              <a
                href="mailto:sales@shalimartar.com"
                className="flex items-center gap-1.5"
              >
                <Mail className="h-4 w-4" /> sales@shalimartar.com
              </a>
            </div>

            <div className="hidden xl:flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Dubai
              </span>
              <a
                href="mailto:dubai@shalimartar.com"
                className="flex items-center gap-1.5"
              >
                <Mail className="h-4 w-4" /> dubai@shalimartar.com
              </a>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div
          ref={navRef}
          className="bg-white border-t border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/home/logo.png"
                alt="Kavassu Logo"
                width={150}
                height={50}
                className="object-contain h-10 sm:h-12 md:h-14 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex flex-1 justify-center gap-6"
              style={{ "--accent": ACCENT }}
            >
               {finalNav.map((item, idx) =>
              item.children?.length ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href ?? "#"}
                    className="group relative inline-flex items-center gap-1 pb-1.5 text-[15px] font-medium text-slate-800 transition-colors hover:text-[var(--accent)]"
                    onClick={() => setOpenDropdown((v) => (v === idx ? null : idx))}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-[1px]" />
                    <span
                      className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: ACCENT }}
                    />
                  </Link>

                  {openDropdown === idx && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <div
                        role="menu"
                        className="relative w-[280px] overflow-visible rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
                      >
                        <ul className="py-2">
                          {item.children.map((c) => (
                            <li key={c.href || c.label} className="relative group">
                              <Link
                                href={c.href ?? "#"}
                                className="flex items-center justify-between gap-2 px-4 py-2.5 text-[14.5px] font-medium 
                                  text-slate-700 transition-all  hover:text-[var(--accent)] hover:bg-[#fff4f4]
                                  hover:shadow-[inset_3px_0_0_#de231c]"
                              >
                                <div className="flex items-center gap-2">
                                  <FaCircle className="h-1.5 w-1.5 text-[#0d7adf] transition-all group-hover:text-[var(--accent)]" />
                                  {c.label}
                                </div>
                                {c.children && (
                                  <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-slate-400 group-hover:text-[var(--accent)] transition-all" />
                                )}
                              </Link>

                              {c.children && (
                                <ul
                                  className="absolute rounded-2xl left-full top-0 z-50 hidden min-w-[320px]
                                  rounded-2xl border border-slate-200 bg-white
                                  shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                                  group-hover:flex group-hover:flex-col animate-fadeInSlide"
                                >
                                  {c.children.map((sub) => (
                                    <li key={sub.href || sub.label}>
                                      <Link
                                        href={sub.href}
                                        className="flex  items-center justify-between gap-2 px-4 py-2.5 text-[14.5px] font-medium 
                                          text-slate-700 transition-all hover:text-[var(--accent)] hover:bg-[#fff4f4]
                                          hover:shadow-[inset_3px_0_0_#de231c] rounded-lg"
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="group relative pb-1.5 text-[15px] font-medium text-slate-800 transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                  <span
                    className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: ACCENT }}
                  />
                </Link>
              )
            )}
            </nav>

            {/* Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-700 hover:bg-[#DE231C] hover:text-white">
                <Globe className="h-4 w-4" /> English
              </button>
              <Link
                href="/contactus"
                className="rounded-lg bg-[#DE231C] hover:bg-[#039FDF] px-4 py-2.5 text-sm font-semibold text-white shadow hover:scale-[1.03] transition-transform"
              >
                Inquiry
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-md  hover:bg-slate-100 text-slate-700"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden bg-white border-t border-slate-100 shadow-md overflow-hidden"
              >
                <div className="mx-4 my-3 rounded-xl border border-slate-100 bg-white p-2 space-y-1">
                  {finalNav.map((item) =>
                    item.children?.length ? (
                      <MobileDropdown
                        key={item.label}
                        item={item}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href ?? "#"}
                        className="block rounded-lg px-3 py-2 text-[15px] text-slate-800 hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}

                  <div className="my-2 h-px bg-slate-200" />

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/become-a-dealer"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 hover:bg-[var(--accent)] hover:text-white"
                    >
                      Dealer
                    </Link>
                    <a
                      href="/brochure.pdf"
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Brochure <ExternalLink className="h-4 w-4" />
                    </a>
                    <button className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-[var(--accent)] hover:text-white">
                      <Globe className="h-4 w-4" /> English
                    </button>
                    <Link
                      href="/contactus"
                      className="col-span-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-center text-sm font-semibold text-white"
                    >
                      Inquiry
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>


      <div className="h-[calc(var(--header-offset))]" />
    </>
  );
}

function MobileDropdown({ item, onNavigate }) {
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div className="rounded-md">
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        onClick={() => setSubOpen((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <FaCircle className="h-1.5 w-1.5 text-[#0d7adf]" />
          {item.label}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            subOpen ? "rotate-180 text-[var(--accent)]" : "text-slate-400"
          }`}
        />
      </button>

      <AnimatePresence>
        {subOpen && (
          <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            className="pl-5"
          >
            {item.children.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block rounded-md px-3 py-1.5 text-[13.5px] text-slate-700 hover:bg-[#fff4f4] hover:text-[var(--accent)]"
                onClick={onNavigate}
              >
                • {sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
