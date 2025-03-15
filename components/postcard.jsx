"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import Card from "./ui/card";
import { useRef } from "react";
import useOnScreen from "@/hooks/useonscreen";

const PostCard = ({ post, className, isActive, ...rest }) => {
  const { slug, frontmatter } = post;

  const ref = useRef(null);
  const { isFullyVisible } = useOnScreen(ref);

  return (
    <Link href={`/post/${slug}`}>
      <Card
        ref={ref}
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "group flex flex-col justify-center min-h-[357px] lg:min-h-auto items-center gap-2 group relative text-dark/70 hover:text-primary active:text-primary transition-all duration-300 px-4 lg:px-0 py-24 lg:py-12", isFullyVisible && "text-primary lg:text-dark/70", post.pattern)}
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
