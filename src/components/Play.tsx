"use client";

import { useEffect, useState } from "react";
import { categories, type CategoryKey } from "@/data/categories";
import { categoryConfig } from "@/data/config";
import { useProgress } from "@/hooks/useProgress";
import Card from "./Card";
import SwipeCard from "./SwipeCard";

type Props = {
    category: CategoryKey;
    onBack: () => void;
};

export default function Play({ category, onBack }: Props) {
    const questions = categories[category];
    const config = categoryConfig[category];

    const { index, setIndex, loaded } = useProgress(category);

    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem("marrow-swipe-hint");
        if (!seen) {
            setShowHint(true);
        }
    }, []);

    const handleFirstInteraction = () => {
        if (showHint) {
            localStorage.setItem("marrow-swipe-hint", "true");
            setShowHint(false);
        }
    };

    if (!loaded) return null;

    const total = questions.length;
    const isEnd = index >= total;

    const next = () => {
        handleFirstInteraction();
        if (index < total) setIndex((prev) => prev + 1);
    };

    const prev = () => {
        handleFirstInteraction();
        if (index > 0) setIndex((prev) => prev - 1);
    };

    const isLight =
        category === "within" ||
        category === "doctrine" ||
        category === "between";

    const textColor = isLight ? "text-black" : "text-white";
    const subTextColor = isLight ? "text-black/60" : "text-white/70";

    // =====================
    // END SCREEN
    // =====================
    if (isEnd) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full max-w-[360px] md:max-w-[320px]">

                    <div
                        className={`relative w-full h-full rounded-[32px] p-[14px] overflow-hidden ${textColor}`}
                        style={{ backgroundColor: config.color }}
                    >

                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-multiply"
                            style={{
                                backgroundImage: "url('/textures/paper.jpg')",
                                backgroundSize: "cover",
                            }}
                        />

                        <div className="relative w-full h-full rounded-[26px] border border-black/10 flex flex-col items-center justify-center text-center px-6 py-10">

                            <h2 className="font-serif text-[22px] mb-3">
                                You’ve reached the end
                            </h2>

                            <p className={`text-sm mb-6 ${subTextColor}`}>
                                Take a moment. What stayed with you?
                            </p>

                            <p className={`text-xs mb-8 ${subTextColor}`}>
                                {config.label}
                            </p>

                            <div className="flex flex-col gap-4 w-full max-w-[220px]">

                                <button
                                    onClick={() => setIndex(0)}
                                    className={`py-3 rounded-full ${isLight ? "bg-black text-white" : "bg-white text-black"
                                        }`}
                                >
                                    Restart
                                </button>

                                <button
                                    onClick={onBack}
                                    className={`py-3 rounded-full border ${isLight ? "border-black/20" : "border-white/30"
                                        }`}
                                >
                                    Choose another category
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // =====================
    // PLAY VIEW
    // =====================
    return (
        <div className="h-full w-full pt-6 pb-8 relative">

            {/* PROGRESS BAR */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20">
                <div
                    className="h-full bg-white/70 transition-all duration-300"
                    style={{
                        width: `${((index + 1) / total) * 100}%`,
                    }}
                />
            </div>

            {/* PROGRESS TEXT */}
            <div className="absolute top-3 right-4 text-xs text-white/50">
                {index + 1} / {total}
            </div>

            {/* SWIPE HINT */}
            {showHint && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-white/60 text-sm animate-pulse">
                        Swipe → to continue
                    </div>
                </div>
            )}

            <SwipeCard onNext={next} onPrev={prev}>
                <Card
                    category={config.label}
                    question={questions[index]}
                    color={config.color}
                />
            </SwipeCard>

        </div>
    );
}