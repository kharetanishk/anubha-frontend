"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import FAQSection from "@/components/FAQSection";
import HowItWorks from "@/components/HowItWorks";
import OnlineProgram from "@/components/OnlineProgram";

export default function Hero() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const howItWorksRef = useRef<HTMLDivElement | null>(null);
  const onlineProgramRef = useRef<HTMLDivElement | null>(null);
  const scrollToSection = (hash: string) => {
    let target: HTMLDivElement | null = null;
    if (hash === "#about") target = aboutRef.current;
    if (hash === "#faq") target = faqRef.current;
    if (hash === "#how-it-works") target = howItWorksRef.current;
    if (hash === "#online-program") target = onlineProgramRef.current;
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  useEffect(() => {
    const handleScroll = () => scrollToSection(window.location.hash);
    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* --- Background --- */}
      {/* <div className="absolute inset-0 bg-[url('/images/heroposter.png')] bg-cover bg-center opacity-10" /> */}
      <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/75 to-transparent" />

      {/* --- Hero Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-slate-900 leading-tight tracking-tight mb-4"
        >
          Heal with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7fb77e] via-[#82c6a8] to-[#6aa6d9]">
            Nutrition
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
        >
          Personalized nutrition & lifestyle guidance designed to help you feel
          better, live stronger, and achieve lasting wellness — simply and
          scientifically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/services?from=hero"
            className="inline-block rounded-full bg-linear-to-r from-[#7fb77e] via-[#6fbb9c] to-[#64a0c8] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl hover:brightness-105 active:scale-95 transition-all duration-200"
          >
            Book an Appointment
          </Link>
        </motion.div>
      </div>

      {/* --- About Section --- */}
      <motion.div
        id="about"
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-20 mt-20 w-full max-w-4xl mx-auto px-6"
      >
        <div className="bg-white/90 rounded-3xl shadow-(--shadow-soft) px-6 sm:px-10 py-10 sm:py-14 border border-[#dfe7dd] backdrop-blur-lg flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900 text-center">
            Meet Dr. Anubha
          </h2>
          <div className="text-slate-600 text-lg leading-relaxed max-w-2xl w-full">
            <p className="mb-4 text-center">
              Dt. Anubha Issac is a highly qualified and experienced nutrition
              expert with a Master’s degree in{" "}
              <strong>Dietetics &amp; Food Service Management</strong>. Over the
              past <strong>15 years</strong>, she has helped countless
              individuals achieve better health and sustainable lifestyle
              transformations through scientific, personalized nutrition
              guidance.
            </p>
            <p className="mb-2 text-center">
              <strong>She holds multiple certifications, including:</strong>
            </p>
            <ul className="list-disc list-inside my-4 mx-auto text-left max-w-md pl-5 marker:text-emerald-500">
              <li>Specialist in Weight Management</li>
              <li>Advanced Clinical Dietetics</li>
              <li>Sports Nutrition</li>
              <li>Child Nutrition and Health Education</li>
              <li>Renal Nutrition</li>
            </ul>
            <p className="text-center">
              With deep clinical knowledge and a compassionate approach, Dt.
              Anubha designs holistic diet plans that align with each
              individual’s medical condition, fitness goals, and lifestyle. Her
              focus goes beyond diet charts — she builds lasting, mindful eating
              habits that empower people to take charge of their own well-being.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="how-it-works"
        ref={howItWorksRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-20 w-full mt-32"
      >
        <HowItWorks />
      </motion.div>

      {/* --- FAQ Section --- */}
      <motion.div
        id="faq"
        ref={faqRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-20 w-full mt-32"
      >
        <FAQSection />
      </motion.div>

      <motion.div
        id="online-program"
        ref={onlineProgramRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-20 w-full mt-32"
      >
        <OnlineProgram />
      </motion.div>

      <div className="h-24 sm:h-36 md:h-40" />
    </section>
  );
}
