"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BookingForm = {
  // Step 1 - Personal
  fullName?: string;
  mobile?: string;
  email?: string;
  dob?: string; // ISO date
  age?: number;
  gender?: string;
  address?: string;

  // Step 2 - Measurements
  weight?: string;
  height?: string;
  neck?: string;
  waist?: string;
  hip?: string;

  // Step 3 - Medical
  medicalHistory?: string;
  reports?: File[]; // uploaded files
  appointmentConcerns?: string;

  // Step 4 - Lifestyle
  bowel?: string;
  dailyFood?: string;
  waterIntake?: string;
  wakeUpTime?: string;
  sleepTime?: string;
  sleepQuality?: string;

  // meta
  planSlug?: string;
  planName?: string;
  planPrice?: string;
};

type ContextType = {
  form: BookingForm;
  setForm: (s: Partial<BookingForm>) => void;
  resetForm: () => void;
};

const BookingFormContext = createContext<ContextType | undefined>(undefined);

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [form, setFormState] = useState<BookingForm>({});

  function setForm(partial: Partial<BookingForm>) {
    setFormState((prev) => ({ ...prev, ...partial }));
  }

  function resetForm() {
    setFormState({});
  }

  return (
    <BookingFormContext.Provider value={{ form, setForm, resetForm }}>
      {children}
    </BookingFormContext.Provider>
  );
}

export function useBookingForm() {
  const ctx = useContext(BookingFormContext);
  if (!ctx)
    throw new Error("useBookingForm must be used inside BookingFormProvider");
  return ctx;
}
