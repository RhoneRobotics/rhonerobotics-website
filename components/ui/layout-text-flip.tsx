"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      border: "border-blue-400/20"
    },
    {
      bg: "bg-gradient-to-t from-emerald-50 to-teal-100",
      text: "text-green-700",
      border: "border-emerald-400/20"
    },
    {
      bg: "bg-gradient-to-t from-pink-50 to-rose-100",
      text: "text-pink-700",
      border: "border-pink-400/20"
    },
    {
      bg: "bg-gradient-to-t from-purple-50 to-indigo-100",
      text: "text-purple-700",
      border: "border-purple-400/20"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;
        if (onIndexChange) {
          onIndexChange(newIndex);
        }
        return newIndex;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration, onIndexChange]);

  const currentColors = colorSchemes[currentIndex % colorSchemes.length];

  return (
    <motion.span
      className={cn(
        "inline-flex items-center justify-center align-middle rounded-full min-w-[160px] md:min-w-[220px] px-6 md:px-8 py-1 md:py-4 font-sans text-2xl md:text-5xl font-bold tracking-tight shadow-lg transition-colors mt-4 md:mt-0 duration-1000 ",
        currentColors.bg,
        currentColors.text,
        currentColors.border,
        "border",
        className
      )}
      style={{
        // Prevent font boosting on mobile Chrome
        WebkitTextSizeAdjust: '100%',
        textSizeAdjust: '100%',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          // Use scale instead of y-transform to prevent layout shifts
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="inline-block whitespace-nowrap"
          style={{
            WebkitTextSizeAdjust: '100%',
            textSizeAdjust: '100%',
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};