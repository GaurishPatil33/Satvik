import React, { ReactNode } from "react";

interface SocialBtnProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex-1 flex items-center justify-center gap-2
        py-[11px]
        rounded-[10px]
        border-[1.5px] border-gray-200
        bg-white
        text-[13px] font-semibold text-gray-700
        transition-all duration-200
        hover:border-green-600 hover:bg-green-50
        cursor-pointer
      "
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

export default SocialBtn;