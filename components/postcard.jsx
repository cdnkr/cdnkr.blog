"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card_Simple as Card } from "./ui/card";

const PostCard = ({ post, className, isActive, ...rest }) => {
  const { slug, frontmatter } = post;

  const ref = useRef(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [key, setKey] = useState(0); // Add a key to force complete re-render

  const isElementFullyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
  };

  // useEffect(() => {
  //   const checkVisibility = () => {
  //     if (!ref.current) return;

  //     const nowVisible = isElementFullyVisible(ref.current);
  //     if (nowVisible !== isFullyVisible) {
  //       setIsFullyVisible(nowVisible);
  //       setKey((prev) => prev + 1); // Force re-render when visibility changes
  //     }
  //   };

  //   window.addEventListener("scroll", checkVisibility);
  //   checkVisibility(); // Check on mount

  //   return () => window.removeEventListener("scroll", checkVisibility);
  // }, [isFullyVisible]);

  return (
    <Link href={`/post/${slug}`} className="bg-red-500">
      <Card
        key={key} // This forces a complete re-render when visibility changes
        ref={ref}
        id={encodeURIComponent(frontmatter.title)}
        className={cn(
          className,
          "group relative min-h-[357px] lg:min-h-[360px]",
          "flex flex-col justify-center items-center",
          "px-4 lg:px-0 py-24 lg:py-12",
          "transition-all duration-300",
          "text-dark/50",
          // "hover:text-primary/70",
          "!bg-tertiary",
          "!border-dark !border-4",
          "shadow-[12px_12px_0_0_rgba(var(--color-shadow))]",
          "active:shadow-[12px_12px_0_0_rgba(var(--color-shadow))] hover:shadow-[18px_18px_0_0_rgba(var(--color-shadow))]",
          isFullyVisible && "text-primary/70 lg:text-dark/40",
          post.pattern,
        )}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-title-text-bg group-hover:bg-black text-text-title">
            {frontmatter.title}
          </span>
        </h3>
        <div className="mt-[3px] w-full flex justify-center">
          <time
            dateTime={frontmatter.date}
            className="font-mono text-xs bg-title-text-bg text-text-title px-2 py-1"
          >
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;
