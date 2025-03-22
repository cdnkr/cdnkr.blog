"use client";

import { cn } from "@/utils/cn";

export default function Tag({ children, className, onClick }) {
  return (
    <span
      className={cn(
        "py-1 px-2 inline-block",
        "font-mono text-xs lg:text-lg font-bold text-text-secondary uppercase",
        "transition-all duration-300",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
