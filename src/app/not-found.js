"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[120px] sm:text-[160px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-600 drop-shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?auto=format&fit=crop&w=900&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Oops!
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4"
      >
        404 - PAGE NOT FOUND
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mt-3 max-w-md"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white bg-[#0095DA] rounded-full hover:bg-[#DE231C] transition-all duration-300 font-medium shadow-md"
        >
          GO TO HOMEPAGE
        </Link>
      </motion.div>
    </section>
  );
}
