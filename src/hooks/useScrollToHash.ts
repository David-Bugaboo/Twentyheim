import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to handle scrolling to hash anchors in React.
 * Fixes the issue where the browser scrolls before content is fully rendered.
 *
 * Usage: Call useScrollToHash() at the top of your component.
 *
 * This hook:
 * 1. Waits for content to render (100ms delay)
 * 2. Finds the element by ID from the URL hash
 * 3. Scrolls smoothly to the element with a small top offset
 */
export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
          // Smooth scroll to element with offset
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });

          // Add offset by scrolling back up a bit
          setTimeout(() => {
            window.scrollBy({
              top: -80, // 80px offset from top
              behavior: "smooth",
            });
          }, 100);
        } else {
          console.warn(`Element with id "${id}" not found`);
        }
      }, 150); // 150ms delay to ensure rendering

      return () => clearTimeout(timeoutId);
    } else {
      // No hash: scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]); // Re-run when path or hash changes
}
