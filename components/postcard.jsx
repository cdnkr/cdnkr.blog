"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Card_Simple as Card } from "./ui/card";

const PostCard = ({ post, className, isActive, ...rest }) => {
  const { slug, frontmatter } = post;

  const ref = useRef(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  const isElementFullyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

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
        className={cn(
          className, 
          "group relative min-h-[357px] lg:min-h-[294px]",
          "flex flex-col justify-center items-center gap-2",
          "px-4 lg:px-0 py-24 lg:py-12",
          "transition-all duration-300",
          "text-dark/70 hover:text-primary active:text-primary",
          "force-repaint",
          isFullyVisible && "text-primary lg:text-dark/70", 
          post.pattern
        )}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-title-text-bg text-text-title">{frontmatter.title}</span>
        </h3>
      </Card>
    </Link>
  );
};

export default PostCard;
