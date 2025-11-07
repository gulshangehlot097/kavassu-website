"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const list = [
  "Buildings & Factories",
  "Harbors & Dams",
  "Canals & Bridges",
  "Atomic & Thermal Projects",
  "Hydel Power & Tunnels",
  "Sub-way Boxes & Tube Railways",
  "Roadways & NHAI",
  "More Diverse Applications",
];

const contentStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const dropFromTop = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function OurLegacy() {
  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Image: slide in from left */}
          <motion.div
            className="relative w-full max-w-4xl h-[450px]"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/aboutus/lagency.png"
              alt="Our Legacy"
              fill
              className="object-cover"
            />
          </motion.div>

         
          <motion.div variants={contentStagger}>
            <motion.p
              variants={dropFromTop}
              className="text-[#07D] uppercase tracking-wide font-semibold mb-2 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-[#de231c] inline-block" />
              Our Legacy
            </motion.p>

            <motion.h2
              variants={dropFromTop}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              Building Trust With Quality &amp; Innovation
            </motion.h2>

            <motion.p variants={dropFromTop} className="text-gray-600 leading-relaxed mb-4">
              All products are manufactured by India&apos;s biggest plant of its kind —{" "}
              <span className="font-semibold">M/s. Shalimar Seal &amp; Tar Products Pvt. Ltd.</span>,
              an ISO 9001, 14001 &amp; 45001 accredited company with an in-house R&amp;D lab.
            </motion.p>

            <motion.p variants={dropFromTop} className="text-gray-600 leading-relaxed mb-4">
              Guided by <span className="font-semibold">Shalimar Seal &amp; Tar</span> and{" "}
              <span className="font-semibold">M/s. Kavassu International</span>, products use GTX
              Technology and are time-tested across India.
            </motion.p>

            <motion.p variants={dropFromTop} className="text-gray-600 leading-relaxed">
              Proven across applications:
            </motion.p>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-gray-700"
              variants={contentStagger}
            >
              {list.map((item) => (
                <motion.li key={item} className="flex items-start" variants={dropFromTop}>
                  <span className="text-[#de231c] mt-1">✔</span>
                  <span className="ml-2">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
