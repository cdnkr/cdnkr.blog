import { cn } from "@/utils/cn";

function Card_Simple({ children, id, className }) {
  return (
    <div
      id={id}
      className={cn("w-full transition-all duration-300", className)}
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
        "w-full p-4 border-2 border-dark shadow-[6px_6px_0_0_#000] active:shadow-[1px_1px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
