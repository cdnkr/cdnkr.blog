import { cn } from "@/utils/cn";

function Card_Simple({ children, id, className, ...rest }) {
  return (
    <div
      id={id}
      className={cn("w-full transition-all duration-300", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

function Card({ children, id, className }) {
  return (
    <div
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
}

export default Card_Simple;
