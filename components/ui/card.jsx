import { cn } from "@/utils/cn";

function Card({ children, id, className }) {
  return (
    <div
      id={id}
      className={cn(
        "w-full p-4 rounded-none border-2 border-dark shadow-[6px_6px_0_0_rgba(244,68,46,0.5)] active:shadow-[1px_1px_0_0_rgba(244,68,46,0.5)] hover:shadow-[8px_8px_0_0_rgba(244,68,46,0.5)] transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Card_Simple({ children, id, className }) {
  return (
    <div
      id={id}
      className={cn(
        "w-full rounded-none transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
