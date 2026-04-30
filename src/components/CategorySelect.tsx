"use client";

import { categoryConfig } from "@/data/config";
import type { CategoryKey } from "@/data/categories";
import { motion } from "framer-motion";
import {
    Sparkles,
    Sun,
    Flower2,
    Flame,
    Users,
} from "lucide-react";

type Props = {
    onSelect: (key: CategoryKey) => void;
};

export default function CategorySelect({ onSelect }: Props) {
    const getProgress = (key: string) => {
        const stored = localStorage.getItem("marrow-progress");
        const parsed = stored ? JSON.parse(stored) : {};
        return parsed[key] ?? 0;
    };

    const total = 50;

    return (
        <div className="h-full px-5 pt-10 pb-6 flex flex-col gap-4">

            <h2 className="text-center text-white/60 mb-2 text-sm tracking-wide">
                Choose a category
            </h2>

            {Object.entries(categoryConfig).map(([key, config], index) => {
                const progress = getProgress(key);
                const hasProgress = progress > 0;

                const isLight =
                    key === "within" ||
                    key === "doctrine" ||
                    key === "between";

                const textColor = isLight ? "text-black" : "text-white";
                const subTextColor = isLight ? "text-black/60" : "text-white/70";

                return (
                    <motion.button
                        key={key}
                        onClick={() => onSelect(key as CategoryKey)}
                        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            delay: index * 0.14,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative w-full rounded-2xl p-4 flex items-center justify-between overflow-hidden ${textColor}`}
                        style={{ backgroundColor: config.color }}
                    >

                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
                            style={{
                                backgroundImage: "url('/textures/paper.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        <div className="relative z-10 w-full flex items-center justify-between">

                            <div className="w-10 flex justify-center">
                                {getIcon(key, isLight)}
                            </div>

                            <div className="flex-1 ml-3 text-left">
                                <div className="font-serif text-[17px] tracking-[0.08em]">
                                    {config.label}
                                </div>
                                <div className={`text-[13px] ${subTextColor} font-light tracking-wide`}>
                                    {getDescription(key)}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm font-medium">
                                    {progress} / {total}
                                </div>
                                <div className={`text-xs ${subTextColor}`}>
                                    {hasProgress ? "Continue" : "Start over"}
                                </div>
                            </div>

                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}

/* HELPERS SAME AS BEFORE */

/* HELPERS */

function getDescription(key: string) {
    switch (key) {
        case "within": return "The Self";
        case "doctrine": return "Faith & Belief";
        case "between": return "Relationships";
        case "unfiltered": return "Hard Truths";
        case "outloud": return "Friends & Groups";
        default: return "";
    }
}

function getIcon(key: string, isLight: boolean) {
    const color = isLight ? "black" : "white";
    const className = "w-5 h-5 opacity-80";

    switch (key) {
        case "within": return <Sparkles className={className} color={color} />;
        case "doctrine": return <Sun className={className} color={color} />;
        case "between": return <Flower2 className={className} color={color} />;
        case "unfiltered": return <Flame className={className} color={color} />;
        case "outloud": return <Users className={className} color={color} />;
        default: return null;
    }
}