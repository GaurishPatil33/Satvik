"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterPage from "./RegisterForm";
import Image from "next/image";
import { useAuthModalStore } from "@/src/store/authModal.store";
import { FlaskConical, Gift, Truck } from "lucide-react";

type Mode = "login" | "register";

export default function AuthPage() {
  const { isOpen, mode, close, openLogin, openRegister } = useAuthModalStore();

  const features = [
    { icon: <FlaskConical />, text: "100% Organic & Lab Certified" },
    { icon: <Truck/>, text: "Free delivery on orders ₹499+" },
    { icon: <Gift/>, text: "10% off on your first order" },
    { icon: "🔄", text: "7-day hassle-free returns" },
  ];

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">

      {/* BACKDROP */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />


      {/*main */}
      <div className="relative w-[900px] max-w-[95%] h-[620px] bg-white rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.25s_ease] flex">

        {/* close btn*/}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
        >
          ✕
        </button>

        {/* Left panel */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden
      bg-gradient-to-br from-green-950 via-green-900 to-green-700
      items-center justify-center p-12">

          {/* decorative circles */}
          <div className="absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -right-16 w-[280px] h-[280px] rounded-full bg-white/5" />
          <div className="absolute top-1/2 -right-10 w-[160px] h-[160px] rounded-full bg-green-400/10" />

          <div className="relative z-10 text-center max-w-sm">

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <Image alt="logo" height={260} width={200} src={"/logo.png"} />


            </div>

            <h2 className="text-3xl font-black text-white font-playfair leading-tight mb-4">
              Nature's finest,<br />at your doorstep
            </h2>

            <p className="text-green-300 text-sm leading-relaxed mb-8">
              Cold-pressed oils, pure jaggery, and natural foods — crafted with
              ancient wisdom for modern living.
            </p>

            {/* features */}
            <div className="space-y-3 text-left">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center
                bg-white/10 text-lg">
                    {f.icon}
                  </div>

                  <span className="text-green-100 text-sm">{f.text}</span>
                </div>
              ))}
            </div>

            {/* testimonial */}
            {/* <div className="mt-8 bg-white/10 border border-white/10 backdrop-blur
          rounded-xl p-5 text-left">

            <p className="text-green-100 text-sm italic mb-3">
              "Switched to Satvik groundnut oil 3 months ago. The quality is
              unmatched — you can taste the purity!"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br
              from-green-500 to-green-700 flex items-center justify-center
              text-white font-bold">
                P
              </div>

              <div>
                <div className="text-white text-sm font-semibold">
                  Priya M.
                </div>
                <div className="text-green-300 text-xs">
                  Mumbai · ★★★★★
                </div>
              </div>
            </div>

          </div> */}
          </div>
        </div>

        {/* righ panel */}
        <div className="flex flex-1 items-center justify-center p-8 overflow-y-auto">

          <div className="w-full max-w-md">

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => (m === "login" ? openLogin() : openRegister())}
                  className={`
                  flex-1 py-2 rounded-lg text-sm transition
                  ${mode === m
                      ? "bg-white text-green-900 font-semibold shadow"
                      : "text-gray-400"
                    }
                `}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {/* forms */}
            {mode === "login" ? (
              <LoginForm onSwitch={openRegister} />
            ) : (
              <RegisterPage onSwitch={openLogin} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}