"use client";

import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Block } from "./block";

function Popover({
  children,
  className,
  popoverContent,
  offset = 24,
  position = "right",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  function handleClickOutside(event) {
    if (
      !triggerRef.current?.contains(event.target) &&
      !popoverRef.current?.contains(event.target)
    ) {
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
      <Block
        _ref={popoverRef}
        className={cn(
          "min-w-xs lg:min-w-xl",
          "hidden absolute",
          "bg-primary",
          position === "left" && "-left-2",
          position === "right" && "-right-2",
          isOpen && "opacity-100 block",
          className,
        )}
        caretPosition={
          position === "right"
          ? "top-right"
          : "top-left"
        }
      >
          {popoverContent}
        </Block>
    </div>
  );
}

export default Popover;
