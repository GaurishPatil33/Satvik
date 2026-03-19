"use client";

import React, { useState } from "react";
import SocialBtn from "./SocialBtn";
import InputField from "./Inputfield";

interface LoginFormProps {
  onSwitch: () => void;
}

interface LoginFormState {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!form.email || !form.password) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      <h2 className="text-[28px] font-black text-green-900 font-playfair mb-1">
        Welcome back 👋
      </h2>

      <p className="text-gray-500 text-sm mb-7 font-dmSans">
        Sign in to your Satvik account
      </p>

      {done ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>

          <h3 className="text-xl font-extrabold text-green-900 font-playfair mb-2">
            You're in!
          </h3>

          <p className="text-gray-500 text-sm font-dmSans">
            Redirecting to your dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Social Login */}
          <div className="flex gap-2.5 mb-6">
            <SocialBtn icon="G" label="Google" />
            <SocialBtn icon="f" label="Facebook" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 whitespace-nowrap font-dmSans">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <InputField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon="✉️"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon="🔒"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center -mt-2 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm((f) => ({ ...f, remember: e.target.checked }))
                }
                className="accent-green-600 w-[15px] h-[15px]"
              />

              <span className="text-[13px] text-gray-500 font-dmSans">
                Remember me
              </span>
            </label>

            <a
              href="#"
              className="text-[13px] text-green-600 font-semibold font-dmSans"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-[15px] font-dmSans tracking-[0.3px] shadow-lg transition-all
            ${
              loading
                ? "bg-green-300"
                : "bg-linear-to-br from-green-500 to-green-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          {/* Switch to Signup */}
          <p className="text-center mt-5 text-sm text-gray-500 font-dmSans">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-green-600 font-bold text-sm font-dmSans"
            >
              Create one
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginForm;