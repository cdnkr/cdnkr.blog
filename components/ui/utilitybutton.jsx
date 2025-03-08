"use client";

import { cn } from "@/utils/cn";

export default function UtilityButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-none px-2 py-1 text-sm bg-white text-black border-2 border-white shadow-[3px_3px_0_0_rgba(244,68,46,0.5)] active:shadow-[1px_1px_0_0_rgba(244,68,46,0.5)] hover:shadow-[5px_5px_0_0_rgba(244,68,46,0.5)] transition-all duration-300 cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
}
