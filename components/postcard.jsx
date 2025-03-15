"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Card_Simple as Card } from "./ui/card";

const PostCard = ({ post, className, isActive, ...rest }) => {
  const { slug, frontmatter } = post;

  const ref = useRef(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [debug, setDebug] = useState(null);

  const isElementFullyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    setDebug({
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      viewportHeight,
      viewportWidth,
      scrollY: window.scrollY,
    })
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!ref.current) return;

      if (isElementFullyVisible(ref.current)) {
        setIsFullyVisible(() => true);
      } else {
        setIsFullyVisible(() => false);
      }
    });
  }, [ref.current]);

  return (
    <Link href={`/post/${slug}`}>
      <Card
        ref={ref}
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, `group flex flex-col justify-center min-h-[357px] lg:min-h-[294px] items-center gap-2 group relative lg:hover:text-primary transition-all duration-300 px-4 lg:px-0 py-24 lg:py-12 ${isFullyVisible ? "text-primary lg:text-dark/70" : "text-dark/70 lg:text-dark/70"}`, post.pattern)}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-title-text-bg text-text-title">{frontmatter.title}</span>
        </h3>
      </Card>
      <div className="font-mono text-xs mt-1">{debug?.top?.toFixed()}{" "}{debug?.left?.toFixed()}{" "}{debug?.bottom?.toFixed()}{" "}{debug?.right?.toFixed()}{" "}{debug?.viewportHeight}{" "}{debug?.viewportWidth}{" "}{debug?.scrollY?.toFixed()}{" "}{isFullyVisible ? "true" : "false"}</div>
    </Link>
  );
};

export default PostCard;
