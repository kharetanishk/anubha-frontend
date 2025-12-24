"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";
import {
  loginInitiate,
  loginComplete,
} from "@/lib/auth";
import OtpInput from "@/components/auth/OtpInput";


type LoginStep = "DETAILS" | "OTP";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [step, setStep] = useState<LoginStep>("DETAILS");
  
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    otp?: string;
    general?: string;
  }>({});

  // Cooldown effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validateDetails = () => {
    const newErrors: any = {};
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.length !== 10) newErrors.phone = "Phone must be 10 digits";
    
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitiate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateDetails()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
       await loginInitiate({ phone, email });
       setStep("OTP");
       setResendCooldown(60);
       toast.success("OTP sent to your email and phone");
    } catch (error: any) {
        const msg = error.response?.data?.message || "Failed to send OTP";
        setErrors({ general: msg });
        toast.error(msg);
    } finally {
        setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
        setErrors({ otp: "Please enter a valid OTP" });
        return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
        const response = await loginComplete({ phone, email, otp });
        if (response.userNotFound) {
             setErrors({ general: "No account found. Please Sign Up." });
             toast.error("No account found. Please Sign Up.");
             return;
        }
        
        login({
          id: response.user.id,
          name: response.user.name,
          phone: response.user.phone,
          email: response.user.email,
          role: response.user.role,
        });
        
        toast.success("Logged in successfully!");
        router.push("/");
    } catch (error: any) {
        const msg = error.response?.data?.message || "Invalid OTP";
        setErrors({ otp: msg });
        toast.error(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50/40 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40">
           <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 text-center mb-2">
             Welcome Back
           </h1>
           <p className="text-slate-600 text-center mb-6 text-sm">
             Login via dual-channel OTP
           </p>

           {step === "DETAILS" && (
             <form onSubmit={handleInitiate} className="space-y-4">
               <div>
                  <label className="text-slate-700 font-medium text-sm block mb-2">Phone Number</label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-medium">+91</span>
                     <input
                       type="tel"
                       placeholder="9876543210"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                       className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 border outline-none shadow-sm transition ${errors.phone ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'}`}
                     />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
               </div>

               <div>
                  <label className="text-slate-700 font-medium text-sm block mb-2">Email</label>
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                     <input
                       type="email"
                       placeholder="email@example.com"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border outline-none shadow-sm transition ${errors.email ? 'border-red-400' : 'border-emerald-200 focus:border-emerald-500'}`}
                     />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
               </div>
               
               {errors.general && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{errors.general}</div>}

               <motion.button
                 whileTap={{ scale: 0.96 }}
                 type="submit"
                 disabled={loading}
                 className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-800 transition disabled:opacity-70"
               >
                 {loading ? "Sending..." : "Get OTP"}
               </motion.button>
               
               <div className="text-center mt-4">
                 <Link href="/register" className="text-emerald-700 hover:underline text-sm">
                    Don't have an account? Sign Up
                 </Link>
               </div>
             </form>
           )}

           {step === "OTP" && (
             <form onSubmit={handleVerify} className="space-y-6">
                <div className="text-center">
                    <p className="text-sm text-slate-600 mb-4">
                        OTP sent to <span className="font-medium">{email}</span> and <span className="font-medium">+91 {phone}</span>
                    </p>
                    <div className="flex justify-center">
                        <OtpInput value={otp} onChange={setOtp} />
                    </div>
                     {errors.otp && <p className="text-red-500 text-xs mt-2">{errors.otp}</p>}
                </div>

                <div className="flex flex-col gap-3">
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-800 transition disabled:opacity-70"
                    >
                        {loading ? "Verifying..." : "Verify & Login"}
                    </motion.button>
                    
                     <button
                        type="button"
                        onClick={() => {
                            if (resendCooldown === 0) handleInitiate();
                        }}
                        disabled={resendCooldown > 0 || loading}
                        className="text-sm text-emerald-700 hover:underline disabled:text-slate-400"
                    >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => {
                            setStep("DETAILS");
                            setOtp("");
                            setErrors({});
                        }}
                        className="text-sm text-slate-500 hover:text-slate-700"
                    >
                        Change Details
                    </button>
                </div>
             </form>
           )}
        </div>
      </motion.div>
    </div>
  );
}
