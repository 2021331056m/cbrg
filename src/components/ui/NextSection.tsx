"use client";

import React from "react";

export default function NextSection({ offset = 1 }: { offset?: number }) {
  const handleClick = () => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    if (!sections.length) return;
    const viewportTop = window.scrollY;
    const currentIndex = sections.findIndex((s) => s.getBoundingClientRect().top + window.scrollY >= viewportTop + 10);
    const next = sections[Math.max(0, (currentIndex === -1 ? 0 : currentIndex) + offset)];
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Next section"
      className="next-section-btn"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
