"use client";

import { useEffect } from "react";

const ScrollUrlCleaner = () => {
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls near top and there's a hash, clean it
      if (window.scrollY < 100 && window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export default ScrollUrlCleaner;
