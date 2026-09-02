"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_SLIDES = [
  "/images/bgphoto1.jpg",
  "/images/bgphoto2.jpg",
];

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <AnimatePresence mode="sync">
        <motion.div
          key={HERO_SLIDES[activeIndex]}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={HERO_SLIDES[activeIndex]}
            alt=""
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}