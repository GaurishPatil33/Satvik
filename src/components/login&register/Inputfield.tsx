"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState, ChangeEvent, ReactNode } from "react";

interface InputFieldProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  hint?: string;
  error?: string;
  maxlength?: number;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  icon,
  hint,
  error,
  maxlength,
  autoComplete,
  required,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold text-forest-700 mb-1.5"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div className="relative">
        {icon && (
          <span
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-base transition-colors ${
              focused ? "text-green-600" : "text-gray-400"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={isPassword && showPwd ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          maxLength={maxlength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full text-sm text-forest-900
            rounded-[10px] border-2 outline-none
            transition-all duration-200
            ${error
              ? "border-red-500 bg-red-50"
              : focused
              ? "border-forest-600/50 bg-green-50"
              : "border-cream-300 bg-gray-50"}
            ${icon ? "pl-10" : "pl-3.5"}
            ${isPassword ? "pr-11" : "pr-3.5"}
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            py-3
          `}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            aria-label={showPwd ? "Hide password" : "Show password"}
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base cursor-pointer"
          >
            {showPwd ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>

      {/* Error / Hint */}
      {error ? (
        <p className="text-[11px] text-red-500 mt-1">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-gray-400 mt-1">{hint}</p>
      ) : null}
    </div>
  );
};

export default InputField;