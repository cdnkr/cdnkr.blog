import { cn } from "@/utils/cn";
import { forwardRef } from "react";

const Card_Simple = forwardRef(({ children, id, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      id={id}
      className={cn("w-full transition-all duration-300", className)}
      {...rest}
    >
      {children}
    </div>
  );
});

Card_Simple.displayName = "Card_Simple";

const Card = forwardRef(({ children, id, className }, ref) => {
  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "w-full p-4 border-2 border-dark shadow-[6px_6px_0_0_rgba(var(--color-shadow))] active:shadow-[1px_1px_0_0_rgba(var(--color-shadow))] hover:shadow-[8px_8px_0_0_rgba(var(--color-shadow))] transition-all duration-300",
        "bg-dotted",
        className,
      )}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export { Card_Simple, Card };
