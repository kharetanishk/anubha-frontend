"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, ClipboardList, Clock, CreditCard, Check } from "lucide-react";

const steps = [
  { id: "user-details", label: "User", href: "/book/user-details", icon: User },
  { id: "recall", label: "Recall", href: "/book/recall", icon: ClipboardList },
  { id: "slot", label: "Slot", href: "/book/slot", icon: Clock },
  { id: "payment", label: "Payment", href: "/book/payment", icon: CreditCard },
];

export default function MasterStepper() {
  const pathname = usePathname() || "";
  const router = useRouter();

  const currentIndex = steps.findIndex((s) => pathname.includes(s.id));

  return (
    <div className="w-full">
      {/* ==== DESKTOP / TABLET VERSION ==== */}
      <div className="hidden sm:flex w-full bg-white/70 border border-[#e6efe7] rounded-xl p-4 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between w-full gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const completed = i <= currentIndex;

            return (
              <button
                key={s.id}
                onClick={() => router.push(s.href)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${
                        completed
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-gray-300 text-slate-600"
                      }`}
                >
                  {completed ? <Check size={18} /> : <Icon size={18} />}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      completed ? "text-emerald-700" : "text-slate-600"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i === currentIndex && (
                    <span className="text-xs text-emerald-600 font-medium">
                      Current Step
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==== MOBILE VERSION ==== */}
      <div className="sm:hidden w-full bg-white border border-[#e6efe7] rounded-xl py-2 shadow-sm">
        <div className="flex items-center justify-between px-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const completed = i <= currentIndex;

            return (
              <button
                key={s.id}
                onClick={() => router.push(s.href)}
                className="flex flex-col items-center w-1/4"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all
                    ${
                      completed
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-gray-300 text-slate-600"
                    }`}
                >
                  {completed ? <Check size={14} /> : <Icon size={14} />}
                </div>

                <span
                  className={`mt-1 text-[10px] font-medium ${
                    completed ? "text-emerald-700" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
