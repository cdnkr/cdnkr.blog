"use client";

import { useEffect, useState, useRef } from "react";
import PostCard from "./postcard";

export default function PostList({ posts }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const postRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport
      rootMargin: "-35% 0px -65% 0px", // Triggers when 35% from the top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = postRefs.current.indexOf(entry.target);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    postRefs.current.forEach((post) => {
      if (post) observer.observe(post);
    });

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 5) {
        // User reached the bottom
        setActiveIndex(posts.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

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
          ref={(el) => (postRefs.current[i] = el)}
        />
      ))}
    </>
  );
}
