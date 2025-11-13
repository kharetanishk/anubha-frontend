"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function FormNavButtons({
  backHref,
  nextHref,
  nextLabel = "Continue",
  isSubmitting = false,
}: {
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  isSubmitting?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        {backHref ? (
          <button
            onClick={() => router.push(backHref)}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            ← Back
          </button>
        ) : null}
      </div>

      <div>
        {nextHref ? (
          <button
            onClick={() => router.push(nextHref)}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:brightness-105 disabled:opacity-50"
          >
            {nextLabel} →
          </button>
        ) : null}
      </div>
    </div>
  );
}
