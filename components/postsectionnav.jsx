"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export default function PostSectionNav({ sectionTitles, className }) {
  const [currentSection, setCurrentSection] = useState(
    encodeURIComponent(sectionTitles[0]?.replace(/#/g, "")),
  );

  function onSectionClick(title) {
    const section = document.getElementById(
      encodeURIComponent(title.replace(/#/g, "")),
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionTitles
        .map((title) =>
          document.getElementById(encodeURIComponent(title.replace(/#/g, ""))),
        )
        .filter(Boolean);

      // check if we've reached the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        // set the last section as active
        setCurrentSection(
          encodeURIComponent(
            sectionTitles[sectionTitles.length - 1]?.replace(/#/g, ""),
          ),
        );
        return;
      }

      const viewportHeight = window.innerHeight;

      // calculate visibility for each section
      let maxVisibility = 0;
      let mostVisibleSection = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const visibleHeight =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visibility = Math.max(0, visibleHeight / sectionHeight);

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = index;
        }
      });

      setCurrentSection(
        encodeURIComponent(
          sectionTitles[mostVisibleSection]?.replace(/#/g, ""),
        ),
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionTitles]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = sectionTitles.findIndex(
        (title) =>
          encodeURIComponent(title.replace(/#/g, "")) === currentSection,
      );

      if (e.key === "ArrowDown" && currentIndex < sectionTitles.length - 1) {
        e.preventDefault();
        const nextTitle = sectionTitles[currentIndex + 1];
        if (nextTitle) onSectionClick(nextTitle);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        const prevTitle = sectionTitles[currentIndex - 1];
        if (prevTitle) onSectionClick(prevTitle);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sectionTitles, currentSection]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-2">
        {sectionTitles
          .filter((title) => !title.includes("<Block"))
          .map((title, i) => (
            <span
              onClick={() => onSectionClick(title)}
              key={i}
              className={cn(
                "px-4 py-1 block truncate transition-all duration-200 cursor-pointer text-muted hover:text-dark text-sm",
                currentSection ===
                  encodeURIComponent(title.replace(/#/g, "")) &&
                  "text-dark font-bold",
              )}
            >
              {title?.replace(/#|(\*\*)|`/g, "")?.split(":")?.[0]}
            </span>
          ))}
      </div>
    </div>
  );
}
