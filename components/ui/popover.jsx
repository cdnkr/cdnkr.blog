"use client";

import { useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { ChevronUp } from "./icons";

function Popover({ children, className, popoverContent, offset = 24, position = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  function handleClickOutside(event) {
    if (!triggerRef.current?.contains(event.target) && !popoverRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  }

  function handleClick() {
    if (!isOpen) {
      const triggerHeight = triggerRef.current.offsetHeight;
      popoverRef.current.style.top = `${triggerHeight + offset}px`;
    }
    setIsOpen(!isOpen);

    document.body.addEventListener("click", handleClickOutside);
  }

  return (
    <div className="relative z-10">
      <div ref={triggerRef} onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      <div
        ref={popoverRef}
        className={cn(
          "min-w-sm lg:min-w-xl hidden absolute w-full p-4 border-2 border-dark transition-all duration-300",
          "bg-primary",
          position === "left" && "-left-2",
          position === "right" && "-right-2",
          isOpen && "opacity-100 block",
          className,
        )}
      >
        <ChevronUp
          strokeWidth={1}
          className={cn(
            "absolute -top-[2rem] stroke-dark fill-primary size-12",
            position === "left" && "-left-2",
            position === "right" && "-right-2",
          )}
        />
        <div className={cn(
          "absolute -top-[1px] h-[1px] w-7 bg-primary",
          position === "left" && "left-0",
          position === "right" && "right-0.5",
          )}/>
        {popoverContent}
      </div>
    </div>
  );
}

export default Popover;
