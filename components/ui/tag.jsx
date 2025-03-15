"use client";

import { cn } from "@/utils/cn";

export default function Tag({ children, className, onClick }) {
  return (
    <span
      className={cn(
        "text-black font-mono py-1 px-2 text-xs font-bold inline-block uppercase cursor-pointer transition-all duration-300",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
