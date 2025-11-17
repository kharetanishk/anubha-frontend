"use client";

import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    img: "/images/testi1.jpg",
    name: "Client One",
    text: "Amazing experience! I feel more energetic and healthier than ever.",
  },
  {
    img: "/images/testi2.jpg",
    name: "Client Two",
    text: "Lost weight safely with sustainable plans. Highly recommended!",
  },
  {
    img: "/images/testi3.jpg",
    name: "Client Three",
    text: "Great guidance and personalized diet. Visible results in weeks.",
  },
];

// SUPER smooth card entry animation
const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 120,
    scale: 0.8,
  },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: i * 0.12,
      ease: [0.15, 0.75, 0.35, 1.0], // buttery-smooth ease-out curve
    },
  }),
};

export default function Testimonials() {
  return (
    <section className="w-full py-24 px-6 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-emerald-800 mb-5">
          Client Transformations ✨
        </h2>

        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto text-base">
          Real stories. Real changes. Personalized nutrition that actually
          works.
        </p>

        <div className="grid gap-14 md:gap-12 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={index}
              whileHover={{
                y: -10,
                scale: 1.04,
                boxShadow: "0 25px 70px rgba(15,118,110,0.35)",
                transition: { duration: 0.25 },
              }}
              className="rounded-3xl p-6 shadow-[0_18px_60px_rgba(15,118,110,0.15)]
              border border-white/40 bg-white/30 backdrop-blur-2xl
              flex flex-col items-center text-center transition-all"
            >
              {/* FLOATING smooth animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 4.5 + index,
                  ease: "easeInOut",
                }}
                className="w-full flex flex-col items-center "
              >
                {/* BIG IMAGE HERE */}
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-64 h-64 sm:w-68 sm:h-68 md:w-78 md:h-78 rounded-3xl 
                  object-cover shadow-xl border border-white/70 mb-6"
                />

                {/* TEXT */}
                <p className="text-slate-700 italic text-lg mb-4 leading-relaxed">
                  “{t.text}”
                </p>

                {/* NAME */}
                <h3 className="text-xl font-semibold text-emerald-800">
                  {t.name}
                </h3>

                {/* STARS */}
                <div className="text-yellow-500 text-2xl mt-2">★★★★★</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
