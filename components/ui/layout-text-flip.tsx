
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  words = ["Design", "Create", "Deploy", "Invent"],
  duration = 3000,
  onIndexChange,
  className,
}: {
  words: string[];
  duration?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorSchemes = [
    {
      bg: "bg-gradient-to-t from-cyan-50 to-blue-100",
      text: "text-blue-700",
      border: "border-blue-400/20",
    },
    {
      bg: "bg-gradient-to-t from-emerald-50 to-teal-100",
      text: "text-green-700",
      border: "border-emerald-400/20",
    },
    {
      bg: "bg-gradient-to-t from-pink-50 to-rose-100",
      text: "text-pink-700",
      border: "border-pink-400/20",
    },
    {
      bg: "bg-gradient-to-t from-purple-50 to-indigo-100",
      text: "text-purple-700",
      border: "border-purple-400/20",
    },
  ];

  useEffect(() => {
    let interval: any;

    const start = async () => {
      // ✅ Prevent font-swap jump on real mobile devices
      if (document?.fonts?.ready) {
        await document.fonts.ready;
      }

      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % words.length;
          onIndexChange?.(newIndex);
          return newIndex;
        });
      }, duration);
    };

    start();
    return () => clearInterval(interval);
  }, [words.length, duration, onIndexChange]);

  const currentColors = colorSchemes[currentIndex % colorSchemes.length];

  return (
    <motion.span
      className={cn(
        // ✅ fixed container size (no reflow = no jump)
        "relative inline-flex mt-2 items-center justify-center",
        "overflow-hidden whitespace-nowrap leading-none",
        "rounded-full border shadow-lg",
        "w-[140px] md:w-[220px]",
        "h-[44px] md:h-[84px]",
        currentColors.bg,
        currentColors.text,
        currentColors.border,
        className
      )}
      style={{
        WebkitTextSizeAdjust: "100%",
        textSizeAdjust: "100%",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 18, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            // ✅ absolutely positioned text layer
            "absolute inset-0 flex items-center justify-center",
            "font-sans font-bold tracking-tight",
            "text-2xl md:text-5xl",
            "will-change-transform"
          )}
          style={{
            transform: "translateZ(0)",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};
