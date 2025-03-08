import { cn } from "@/utils/cn";

function Button__Pushable({
  children,
  onClick,
  className,
  outerClassName,
  variant = "primary", // default variant
}) {
  const variants = {
    primary: {
      outer: "bg-primary",
      inner: "border-primary bg-primary text-black",
    },
    light: {
      outer: "bg-white",
      inner: "border-white bg-white text-primary",
    },
    dark: {
      outer: "bg-gray-800",
      inner: "border-dark bg-gray-800 text-white",
    },
    secondary: {
      outer: "bg-primary",
      inner: "border-primary bg-white text-primary",
    },
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 block",
        selectedVariant.outer,
        outerClassName,
      )}
    >
      {variant !== "secondary" && (
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-lg bg-black/20" />
      )}
      <span
        className={cn(
          "max-h-[52px] flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] border-2",
          selectedVariant.inner,
          className,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default function Button({
  children,
  onClick,
  className,
  outerClassName,
  variant = "primary", // default variant
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "max-h-[52px] flex justify-center items-center gap-1 py-3 px-10 rounded-none border-2 bg-dark text-white border-dark shadow-[3px_3px_0_0_rgba(244,68,46,0.5)] active:shadow-[1px_1px_0_0_rgba(244,68,46,0.5)] hover:shadow-[5px_5px_0_0_rgba(244,68,46,0.5)] transition-all duration-300",
        className,
      )}
    >
      {children}
    </button>
  );
}
