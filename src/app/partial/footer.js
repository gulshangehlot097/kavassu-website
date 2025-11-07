"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiInfo,
  FiBox,
  FiPhoneCall,
  FiChevronRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiDroplet,
  FiShield,
} from "react-icons/fi";
import { TbFlask2, TbTool } from "react-icons/tb";
import { GiBrickWall } from "react-icons/gi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const BLUE = "#0d7adf";
const RED = "#de231c";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-800 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-10 items-start">
        
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/home/logo.png"
                alt="Kavassu Logo"
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 max-w-[360px]">
              Leading manufacturer of high-performance waterproofing and
              construction solutions across India.
            </p>

            <div className="flex flex-wrap gap-2">
              {["ISO 9001", "ISO 14001", "ISO 45001"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] text-emerald-700"
                  style={{
                    borderColor: "rgba(2,6,23,0.10)",
                    background: "rgba(2,6,23,0.03)",
                  }}
                >
                  <FiShield className="h-3.5 w-3.5" /> {b}
                </span>
              ))}
            </div>

        
            <div className="flex gap-3 pt-1">
              <Social href="#" label="Facebook">
                <FaFacebookF className="h-4 w-4" />
              </Social>
              <Social href="#" label="Twitter">
                <FaTwitter className="h-4 w-4" />
              </Social>
              <Social href="#" label="LinkedIn">
                <FaLinkedinIn className="h-4 w-4" />
              </Social>
              <Social href="#" label="Instagram">
                <FaInstagram className="h-4 w-4" />
              </Social>
            </div>
          </div>

          {/* ===== Quick Links ===== */}
          <div className="space-y-4">
            <SectionHeader title="Quick Links" />
            <ul className="space-y-1">
              <ListLink href="/" icon={<FiHome />}>Home</ListLink>
              <ListLink href="/about" icon={<FiInfo />}>About Us</ListLink>
              <ListLink href="/products" icon={<FiBox />}>Products</ListLink>
              <ListLink href="/contactus" icon={<FiPhoneCall />}>Contact</ListLink>
            </ul>
          </div>

          {/* ===== Products ===== */}
          <div className="space-y-4">
            <SectionHeader title="Products" />
            <ul className="space-y-1">
              <ListLink href="/products/admixtures" icon={<TbFlask2 />}>
                Admixtures
              </ListLink>
              <ListLink href="/products/curing-compounds" icon={<FiDroplet />}>
                Curing Compounds
              </ListLink>
              <ListLink href="/products/joint-sealants" icon={<TbTool />}>
                Joint Sealants
              </ListLink>
              <ListLink
                href="/products/waterproofing-membrane"
                icon={<FiShield />}
              >
                Waterproofing Membrane
              </ListLink>
              <ListLink href="/products/epoxy-grouts" icon={<GiBrickWall />}>
                Epoxy Grouts
              </ListLink>
            </ul>
          </div>

        
          <div className="space-y-6 lg:col-span-2">
            <SectionHeader title="Contact" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* --- India --- */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 text-base">India</h4>
                <ul className="space-y-4">
                  <ContactRow
                    icon={<FiMapPin />}
                    text={`Registered Address\n148, Masarkhedi, Benada Mode, Bassi,\nJaipur, Rajasthan – 303301`}
                  />
                  <ContactRow
                    icon={<FiPhone />}
                    text={["+91 98290 65184", "+91 75681 77777"].join("\n")}
                    href="tel:+919829065184"
                  />
                  <ContactRow
                    icon={<FiMail />}
                    text={`sales@shalimartar.com\nkmd@shalimartar.com\nocrd@shalimartar.com`}
                    href="mailto:sales@shalimartar.com"
                  />
                </ul>
              </div>

              {/* --- Dubai --- */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 text-base">Dubai</h4>
                <ul className="space-y-4">
                  <ContactRow icon={<FiMapPin />} text="Dubai" />
                  <ContactRow
                    icon={<FiPhone />}
                    text="+971 5015 94756"
                    href="tel:+971501594756"
                  />
                  <ContactRow
                    icon={<FiMail />}
                    text="dubai@shalimartar.com"
                    href="mailto:dubai@shalimartar.com"
                  />
                  <div className="pt-2">
                    <Link
                      href="/contactus"
                      className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors"
                      style={{ backgroundColor: BLUE }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = RED)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = BLUE)
                      }
                    >
                      Enquire Now
                      <FiChevronRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Kavassu International. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <BottomLink href="/privacy">Privacy</BottomLink>
            <BottomLink href="/terms">Terms</BottomLink>
            <BottomLink href="/sitemap">Sitemap</BottomLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reusable Components ---------- */
function SectionHeader({ title }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="h-[3px] w-8 rounded-full" style={{ background: BLUE }} />
      </div>
    </div>
  );
}

function ListLink({ href, icon, children }) {
  return (
    <li className="rounded-md hover:text-[#de231c]">
      <Link
        href={href}
        className="flex items-center gap-3 px-2 py-2 text-sm text-slate-700"
      >
        <span className="text-slate-500">{icon}</span>
        {children}
      </Link>
    </li>
  );
}

function ContactRow({ icon, text, href }) {
  const body = (
    <div className="grid grid-cols-[32px_1fr] items-start gap-3 px-2 py-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-50 ring-1 ring-slate-200 text-slate-700">
        {icon}
      </span>
      <span className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
        {text}
      </span>
    </div>
  );
  return (
    <li className="rounded-md hover:text-[#de231c]">
      {href ? <a href={href}>{body}</a> : body}
    </li>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200 shadow-sm text-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {children}
    </a>
  );
}

function BottomLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-slate-600 hover:text-slate-900 transition-colors"
    >
      {children}
    </Link>
  );
}
