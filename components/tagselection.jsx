"use client";

import { cn } from "@/utils/cn";

export default function TagSelection({
    tags,
    selectedTag,
    setSelectedTag
}) {
    return (
        <>
            {tags.map((tag, i) => (
                <span
                    key={tag + i}
                    className={cn(
                        "cursor-pointer text-sm uppercase transition-all duration-300 font-bold hover:text-primary",
                        selectedTag === tag && "text-primary"
                    )}
                    onClick={() => setSelectedTag(tag)}
                >
                    {tag}
                </span>
            ))}
        </>
    )
}
