import { useEffect, useState } from "react";

export default function useOnScreen(ref, options = {}) {
  const [visibility, setVisibility] = useState({
    isIntersecting: false,
    isFullyVisible: false
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  if (typeof window === "undefined") return { isIntersecting: false, isFullyVisible: false };

  const isElementFullyVisible = (entry) => {
    const rect = entry.boundingClientRect;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      setVisibility({
        isIntersecting: entry.isIntersecting,
        isFullyVisible: isElementFullyVisible(entry)
      });
    },
    { threshold: Array.from({ length: 11 }, (_, i) => i / 10), ...options }
  );

  useEffect(() => {
    if (!ref?.current) return;

    if (!pageLoaded) {
      setTimeout(() => setPageLoaded(true), 500);
    }

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, pageLoaded]);

  return visibility;
}