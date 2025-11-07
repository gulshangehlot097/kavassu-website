"use client";
import Image from "next/image";

export default function HeroMaintenance({
  bgUrl = "/home/bgcta.jpg",
  rightImgUrl = "/home/ctamen.jpg",
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] items-center">
          {/* Left content */}
          <div className="lg:col-span-7 py-12 sm:py-16 lg:py-24 text-center lg:text-left">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to Start Your Project?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Get in touch with our experts for customized construction chemical
              solutions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#get-quote"
                className="inline-flex items-center justify-center rounded-md bg-[#0077DD] px-6 py-3 text-white font-semibold hover:bg-[#de231c] active:scale-[.98] transition"
              >
                Get Quote
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-white font-semibold hover:bg-white/20 transition"
              >
                View Product
              </a>
            </div>
          </div>

          {/* Right image — hidden on screens smaller than 1024px */}
          <div className="relative lg:col-span-5 hidden lg:flex justify-center lg:justify-end">
            <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-auto">
              <Image
                src={rightImgUrl}
                alt="Technician"
                width={680}
                height={680}
                className="object-contain select-none pointer-events-none mx-auto sm:h-[340px] md:h-[380px] lg:h-[420px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
