"use client";

import { motion, Variants } from "motion/react";
import { StarsIcon } from "lucide-react";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import { LayoutTextFlip } from "./ui/layout-text-flip";

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
        },
    },
};

export default function AnimatedHeader() {
    return (
        <>
            <motion.div
                variants={itemVariants}
                className="flex my-4 pr-4 pl-1 border h-6 mt-8 md:mt-16 items-center rounded-2xl"
            >
                <AnimatedShinyText className="flex items-center px-2 py-2 bg-neutral-400">
                    <StarsIcon className="w-4 h-4 text-yellow-400" />
                    <span className="ml-2 text-neutral-600">Available for work</span>
                </AnimatedShinyText>
            </motion.div>

            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-[850px] leading-[1.1]"
            >
                Scaling Global{" "}
                <br className="hidden sm:block" />
                {/* Using inline-flex and whitespace-nowrap to prevent layout shifts on mobile */}
                {/* Restoring flex-wrap to prevent overflow on small screens, relying on text-size-adjust to fix misalignment */}
                <span className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 md:inline-flex">
                    Innovation with{" "}
                    <span className="relative inline-block min-w-[160px] md:min-w-[220px] text-left">
                        <LayoutTextFlip

                            words={["Design", "Create", "Deploy", "Invent"]}
                        />
                    </span>
                    
                </span>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="mt-4 md:mt-6 leading-relaxed font-medium text-neutral-500 max-w-3xl mb-8 md:mb-10 px-4 md:px-0 text-sm md:text-base lg:text-lg"
            >
                We empower visionary companies to outpace the market by deploying robust AI models and seamless cloud-native applications designed for infinite scalability.
            </motion.p>
        </>
    );
}
