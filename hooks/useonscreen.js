import { useEffect, useState } from "react";

export default function useOnScreen(ref, options = {}) {
  const [visibility, setVisibility] = useState({
    isIntersecting: false,
    isFullyVisible: false
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  if (typeof window === "undefined") return { isIntersecting: false, isFullyVisible: false };

  // Create observer with threshold options to detect different levels of visibility
  const observer = new IntersectionObserver(
    ([entry]) => {
      setVisibility({
        isIntersecting: entry.isIntersecting,
        isFullyVisible: entry.intersectionRatio === 1
      });
    },
    { threshold: [0, 1], ...options }
  );

  useEffect(() => {
    if (ref && ref.current === null) return;

    if (!pageLoaded) {
      setTimeout(() => {
        setPageLoaded(() => true);
      }, 500);
    }

    if (ref && ref.current) observer.observe(ref.current);
    if (ref && !ref.current && typeof ref === typeof HTMLElement)
      observer.observe(ref);

    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref, pageLoaded]);

  return visibility;
}
