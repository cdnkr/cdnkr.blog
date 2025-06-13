"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card_Simple as Card } from "./ui/card";

const PostCard = ({ post, className, isActive, ...rest }) => {
  const { slug, frontmatter } = post;

  const ref = useRef(null);

  return (
    <Link href={`/post/${slug}`}>
      <Card
        ref={ref}
        id={encodeURIComponent(frontmatter.title)}
        className={cn(
          className,
          "group relative min-h-[357px] lg:min-h-[360px]",
          "flex flex-col justify-center items-center",
          "px-4 lg:px-0 py-24 lg:py-12",
          "transition-all duration-300",
          "text-dark/40",
          post.pattern,
        )}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-title-text-bg group-hover:bg-black text-text-title transition-colors duration-300">
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
