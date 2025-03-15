"use client";

import { cn } from "@/utils/cn";
import Tag from "./ui/tag";

export default function TagSelection({ tags, selectedTag, setSelectedTag }) {
  return (
    <>
      {tags.map((tag, i) => (
        <Tag
          key={tag + i}
          className={cn(
            "cursor-pointer",
            "hover:text-primary",
            selectedTag === tag && "text-primary",
          )}
          onClick={() => setSelectedTag(tag)}
        >
          {tag}
        </Tag>
      ))}
    </>
  );
}
