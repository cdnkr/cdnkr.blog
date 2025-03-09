import { cn } from "@/utils/cn";

export default function Input({
  value,
  onChange,
  placeholder,
  className,
  variant = "primary",
}) {
  const variants = {
    primary: "border-b-2 border-dark",
    secondary: "border-2 border-dark",
  };
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className={cn(
        "w-full max-w-full px-4 py-3 border-0 focus:outline-none max-h-12",
        variants[variant],
        className,
      )}
    />
  );
}
