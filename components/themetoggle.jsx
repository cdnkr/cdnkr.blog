"use client";

import { cn } from "@/utils/cn";
import useLocalStorage from "@/hooks/uselocalstorage";
import { useEffect } from "react";

export default function ThemeToggle({
    className,
}) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme])

  return (
    <span className={cn("cursor-pointer text-text", className)} onClick={toggleTheme}>
        {theme === "light" ? "dark" : "light"}
    </span>
  );
}
