"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  fee: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  slug,
  fee,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 border border-[#dfe7dd] rounded-3xl shadow-(--shadow-soft) hover:shadow-xl transition-all p-6 flex flex-col justify-between backdrop-blur-sm"
    >
      {/* Image */}
      <div className="flex justify-center items-center h-36 mb-5 bg-[#f5f9f5] rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <p className="text-sm text-slate-500 mb-5">
          Consultation Fee:{" "}
          <span className="text-[#318a63] font-medium">{fee}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        <Link
          href={`/book-appointment?service=${slug}`}
          className="flex-1 rounded-full bg-linear-to-r from-[#7fb77e] via-[#6fbb9c] to-[#64a0c8] text-white py-2.5 md:text-sm  text-[12px] font-medium text-center shadow-lg hover:shadow-xl hover:brightness-105 transition"
        >
          Book Appointment
        </Link>
        <Link
          href={`/explore-plans/${slug}`}
          className="flex-1 rounded-full border border-[#dfe7dd] text-[#2f4f4f] py-2.5 text-sm font-medium text-center hover:bg-[#f5f9f5] transition"
        >
          Explore Plans
        </Link>
      </div>
    </motion.div>
  );
}
