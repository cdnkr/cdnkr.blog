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
    <div className={cn("text-text flex gap-1", className)}>
        <span className={theme === "light" ? "line-through decoration-2" : "hover:text-primary cursor-pointer"} onClick={() => setTheme("light")}>{"light"}</span>
        <span className={theme === "dark" ? "line-through decoration-2" : "hover:text-primary cursor-pointer"} onClick={() => setTheme("dark")}>{"dark"}</span>
    </div>
  );
}
