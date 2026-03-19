"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterPage from "./RegisterForm";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");

  const features = [
    { icon: "🌱", text: "100% Organic & Lab Certified" },
    { icon: "🚚", text: "Free delivery on orders ₹499+" },
    { icon: "🎁", text: "10% off on your first order" },
    { icon: "🔄", text: "7-day hassle-free returns" },
  ];

  return (
    <div className="min-h-screen flex bg-[#fffdf8] font-dmSans">

      {/* LEFT PANEL */}
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
            <div className="w-12 h-12 flex items-center justify-center text-2xl
            bg-white/20 rounded-xl backdrop-blur">
              🌿
            </div>

            <div className="text-left">
              <div className="text-2xl font-black text-white font-playfair">
                Satvik
              </div>
              <div className="text-[10px] tracking-widest uppercase text-green-300">
                Pure & Natural
              </div>
            </div>
          </div>

          {/* hero */}
          <div className="text-7xl mb-6 animate-bounce">🫒</div>

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
          <div className="mt-8 bg-white/10 border border-white/10 backdrop-blur
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

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center p-8 overflow-y-auto">

        <div className="w-full max-w-md">

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
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
            <LoginForm onSwitch={() => setMode("register")} />
          ) : (
            <RegisterPage onSwitch={() => setMode("login")} />
          )}

        </div>
      </div>
    </div>
  );
}