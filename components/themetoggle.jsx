"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

export default function ThemeToggle({
    className,
}) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");

    if (mode === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <span className={cn("cursor-pointer text-text", className)} onClick={toggleMode}>
        {mode === "light" ? "dark" : "light"}
    </span>
  );
}
