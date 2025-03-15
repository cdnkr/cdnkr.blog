"use client";

import { useEffect, useState, useRef } from "react";
import PostCard from "./postcard";

export default function PostList({ posts }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const postRefs = useRef([]);

  useEffect(() => {
    // Ensure postRefs is clean
    postRefs.current = postRefs.current.slice(0, posts.length);

    const observerOptions = {
      root: null, // Viewport
      rootMargin: "-35% 0px -65% 0px", // Adjusted for better cross-browser support
      threshold: 0, // Trigger as soon as it enters the viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = postRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    postRefs.current.forEach((post) => {
      if (post) observer.observe(post);
    });

    const handleScroll = () => {
      const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
      const pageHeight = Math.ceil(document.documentElement.scrollHeight);

      console.log("Scroll Position:", scrollPosition);
      console.log("Page Height:", pageHeight);

      if (scrollPosition >= pageHeight - 2) {
        setActiveIndex(posts.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts]);

  return (
    <>
      {posts?.map((post, i) => (
        <PostCard
          key={i}
          post={post}
          isActive={i === activeIndex}
          ref={(el) => {
            if (el) postRefs.current[i] = el;
          }}
        />
      ))}
    </>
  );
}
