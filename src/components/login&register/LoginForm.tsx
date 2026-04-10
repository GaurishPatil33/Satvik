"use client";

import React, { useState } from "react";
import SocialBtn from "./SocialBtn";
import InputField from "./Inputfield";
import { useAuth } from "@/src/hooks/useAuth";
import { CiLock, CiMail } from "react-icons/ci";
import { CheckCircle, Facebook } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { GrGoogle } from "react-icons/gr";
import { useAuthModalStore } from "@/src/store/authModal.store";

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

  const [errors, setErrors] = useState<Partial<LoginFormState>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormState, boolean>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const { loading, login } = useAuth()
  const { close } = useAuthModalStore();


  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Enter a valid email";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Minimum 6 characters required";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async () => {
    setApiError(null);

    const isValid = validateForm();
    if (!isValid) return;

    try {
      await login(form.email, form.password);

      setDone(true);
      setTimeout(() => close(), 1500);

    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password";

      setApiError(message);
    }
  };
  return (
    <div className="animate-[fadeIn_0.4s_ease]">
      <h2 className="text-[28px] font-black text-green-900 font-playfair mb-1">
        Welcome back
      </h2>

      <p className="text-gray-500 text-sm mb-7 font-dmSans">
        Sign in to your Satvik account
      </p>

      {done ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4 flex items-center justify-center p-2"><CheckCircle className=" size-14 text-forest-500" /></div>

          <h3 className="text-xl font-extrabold text-green-900 font-playfair mb-2">
            Login Successful!
          </h3>

          {/* <p className="text-gray-500 text-sm font-dmSans">
            Redirecting to your dashboard...
          </p> */}
        </div>
      ) : (
        <>

          {apiError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
              {apiError}
            </div>
          )}

          {/* Social Login */}
          <div className="flex gap-2.5 mb-6">
            <SocialBtn icon={<GrGoogle />} label="Google" />
            <SocialBtn icon={<FaFacebook />} label="Facebook" />
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
            icon={<CiMail />}
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          {errors.email && (
            <p className="text-red-500 text-xs -mt-3 mb-2">{errors.email}</p>
          )}

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<CiLock />}
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs -mt-3 mb-2">{errors.password}</p>
          )}
          
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
            disabled={loading || done}
            className={`w-full py-3 rounded-xl text-white  font-bold text-[15px] font-dmSans tracking-[0.3px] shadow-lg transition-all
            ${loading
                ? "bg-green-300"
                : " bg-gradient-to-br from-green-500 to-green-700 hover:scale-[1.02]"
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