import { cn } from "@/utils/cn";
import { ChevronUp } from "./icons";

export function Block({
  children,
  className,
  _ref,
  caretPosition = "top-right",
  variant = "primary",
  showCaret = true,
}) {
  const variants = {
    primary: "bg-primary text-dark",
    secondary: "bg-secondary text-dark",
    tertiary: "bg-tertiary text-dark",
    dark: "bg-dark text-white",
    light: "bg-white text-dark",
  };

  return (
    <div
      ref={_ref}
      className={cn(
        "w-full p-4 border-2 border-dark transition-all duration-300 relative",
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
