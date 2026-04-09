"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState, ChangeEvent, ReactNode } from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  hint?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  hint,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className={`absolute  left-3.5 top-1/2 -translate-y-1/2 text-base transition-colors ${
              focused ? "text-green-600" : "text-gray-400"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          type={isPassword && showPwd ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full text-sm text-gray-900
            rounded-[10px] border-2 outline-none
            transition-all duration-200
            ${focused ? "border-green-600 bg-green-50" : "border-gray-200 bg-gray-50"}
            ${icon ? "pl-10" : "pl-3.5"}
            ${isPassword ? "pr-11" : "pr-3.5"}
            py-3
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base cursor-pointer"
          >
            {showPwd ?<EyeOff/> :<Eye/>}
          </button>
        )}
      </div>

      {hint && (
        <p className="text-[11px] text-gray-400 mt-1">
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;