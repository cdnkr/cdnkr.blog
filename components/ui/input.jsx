import { cn } from "@/utils/cn";

export default function Input({ value, onChange, placeholder, className }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className={cn(
        "w-full max-w-full px-4 py-3 rounded-lg border-0 focus:outline-none max-h-12",
        className,
      )}
    />
  );
}
