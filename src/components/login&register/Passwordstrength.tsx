import React from "react";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;

  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Special char", pass: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.pass).length;

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const textColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-600",
  ];

  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="-mt-3 mb-5">
      {/* Strength bar */}
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-[4px] rounded transition-all
              ${
                i < score
                  ? colors[score - 1]
                  : "bg-gray-200"
              }`}
          />
        ))}
      </div>

      {/* Checks */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 flex-wrap">
          {checks.map((c) => (
            <span
              key={c.label}
              className={`text-[10px] flex items-center gap-1
                ${
                  c.pass
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
            >
              {c.pass ? "✓" : "○"} {c.label}
            </span>
          ))}
        </div>

        {score > 0 && (
          <span
            className={`text-[11px] font-bold ${textColors[score - 1]}`}
          >
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;