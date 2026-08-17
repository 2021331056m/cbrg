"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const PAGE_ORDER = [
  "/",
  "/research",
  "/projects",
  "/publications",
  "/members",
  "/alumni",
  "/funding",
  "/news",
  "/contact",
];

export default function PageScrollTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    isNavigatingRef.current = false;
    // Ensure viewport resets smoothly to top on page transition
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    let currentIndex = PAGE_ORDER.indexOf(pathname);
    if (currentIndex === -1) {
      const matchIndex = PAGE_ORDER.findIndex(
        (p) => p !== "/" && pathname.startsWith(p)
      );
      if (matchIndex !== -1) {
        currentIndex = matchIndex;
      }
    }

    if (currentIndex === -1) return;

    let wheelAccumulator = 0;
    let wheelResetTimer: NodeJS.Timeout | null = null;

    const performTransition = (targetPath: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      router.push(targetPath);
    };

    const navigateNext = () => {
      if (currentIndex < PAGE_ORDER.length - 1) {
        performTransition(PAGE_ORDER[currentIndex + 1]);
      }
    };

    const navigatePrev = () => {
      if (currentIndex > 0) {
        performTransition(PAGE_ORDER[currentIndex - 1]);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigatingRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 24;
      const isAtTop = scrollTop <= 8;

      if (isAtBottom && e.deltaY > 10) {
        wheelAccumulator += e.deltaY;
        if (wheelResetTimer) clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => {
          wheelAccumulator = 0;
        }, 350);

        // Requiring smooth sustained scroll at bottom
        if (wheelAccumulator > 120) {
          wheelAccumulator = 0;
          navigateNext();
        }
      } else if (isAtTop && e.deltaY < -10) {
        wheelAccumulator += e.deltaY;
        if (wheelResetTimer) clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => {
          wheelAccumulator = 0;
        }, 350);

        // Requiring smooth sustained scroll at top
        if (wheelAccumulator < -120) {
          wheelAccumulator = 0;
          navigatePrev();
        }
      } else {
        wheelAccumulator = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || isNavigatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;
      touchStartYRef.current = null;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 30;
      const isAtTop = scrollTop <= 8;

      if (isAtBottom && deltaY > 70) {
        navigateNext();
      } else if (isAtTop && deltaY < -70) {
        navigatePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [pathname, router]);

  return null;
}
