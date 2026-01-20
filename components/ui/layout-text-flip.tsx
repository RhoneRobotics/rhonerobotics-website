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
        "inline-flex items-center justify-center align-middle rounded-full w-[140px] md:w-[200px] py-1 md:py-4 font-sans text-2xl md:text-5xl font-bold tracking-tight shadow-lg transition-colors mt-4 md:mt-0 duration-1000 ",
        currentColors.bg,
        currentColors.text,
        currentColors.border,
        "border",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};