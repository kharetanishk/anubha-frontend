"use client";

import React from "react";
import { useBookingForm } from "../context/BookingFormContext";

export default function ReviewStep() {
  const { form } = useBookingForm();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Review your details</h3>
      <div className="bg-white p-4 rounded-xl border border-[#eef7ee]">
        <pre className="text-sm text-slate-700 whitespace-pre-wrap">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        If everything looks good, continue to slot selection.
      </p>
    </div>
  );
}
