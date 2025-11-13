"use client";

import React, { useState } from "react";
import { useBookingForm } from "../context/BookingFormContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Video, MapPin, Clock } from "lucide-react";

export default function SlotPage() {
  const { setForm } = useBookingForm();
  const router = useRouter();

  const [mode, setMode] = useState<"In-person" | "Online">("In-person");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  /* SLOT LISTS ------------------------ */
  const offlineSlots = [
    "10:00 AM – 10:40 AM",
    "11:00 AM – 11:40 AM",
    "12:00 PM – 12:40 PM",
  ];

  const onlineSlots = [
    "2:00 PM – 2:40 PM",
    "3:00 PM – 3:40 PM",
    "4:00 PM – 4:40 PM",
    "5:00 PM – 5:40 PM",
    "6:00 PM – 6:40 PM",
    "7:00 PM – 7:40 PM",
  ];

  const activeSlots = mode === "In-person" ? offlineSlots : onlineSlots;

  /* CALENDAR ------------------------- */
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const m = currentMonth.getMonth();
  const y = currentMonth.getFullYear();

  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const startDay = new Date(y, m, 1).getDay(); // 0 = Sunday

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  function isSunday(date: Date) {
    return date.getDay() === 0;
  }

  function selectDate(day: number) {
    const d = new Date(y, m, day);
    if (isSunday(d)) return;
    setSelectedDate(d);
    setSelectedTime("");
  }

  function changeMonth(dir: "next" | "prev") {
    const newMonth = new Date(y, m + (dir === "next" ? 1 : -1), 1);
    setCurrentMonth(newMonth);
  }

  function onNext() {
    if (!selectedDate || !selectedTime) {
      alert("Select date & time slot");
      return;
    }

    setForm({
      appointmentMode: mode,
      appointmentDate: selectedDate.toISOString(),
      appointmentTime: selectedTime,
    });

    router.push("/book/payment");
  }

  return (
    <main className="max-w-lg mx-auto bg-white rounded-2xl p-5 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Pick a Date & Time
      </h2>

      {/* MODE TABS (Mobile friendly) */}
      <div className="flex rounded-xl overflow-hidden border mb-6">
        <button
          onClick={() => setMode("In-person")}
          className={`flex-1 py-3 text-sm font-medium ${
            mode === "In-person"
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-700"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <MapPin size={16} /> Clinic Visit
          </div>
        </button>

        <button
          onClick={() => setMode("Online")}
          className={`flex-1 py-3 text-sm font-medium ${
            mode === "Online"
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-700"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <Video size={16} /> Virtual Call
          </div>
        </button>
      </div>

      {/* CALENDAR — FULL WIDTH ON MOBILE */}
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <button onClick={() => changeMonth("prev")}>
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-semibold">
            {monthName} {y}
          </h3>
          <button onClick={() => changeMonth("next")}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Week names */}
        <div className="grid grid-cols-7 text-center text-xs text-slate-500 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {Array(startDay === 0 ? 6 : startDay - 1)
            .fill(null)
            .map((_, i) => (
              <div key={i} />
            ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const date = new Date(y, m, day);
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();

            const disabled = isSunday(date);

            return (
              <button
                key={day}
                onClick={() => selectDate(day)}
                disabled={disabled}
                className={`py-2 rounded-lg text-sm transition border
                  ${
                    disabled
                      ? "bg-red-100 text-red-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-700"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* TIME SLOTS — EXACT CAL.COM STYLE */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Clock size={18} /> Available Slots
        </h3>

        {!selectedDate ? (
          <p className="text-slate-500 text-sm">Select a date to continue.</p>
        ) : (
          <div className="space-y-3">
            {activeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`w-full px-4 py-4 rounded-lg border text-left text-sm transition flex items-center justify-between
                  ${
                    selectedTime === slot
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-300"
                  }
                `}
              >
                {slot}
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => router.push("/book/recall")}
          className="px-4 py-2 border rounded-lg"
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          className="px-5 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
