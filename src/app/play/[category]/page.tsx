"use client";

import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Card from "@/components/Card";
import SwipeCard from "@/components/SwipeCard";
import EndScreen from "@/components/EndScreen";
import { useProgress } from "@/hooks/useProgress";
import { categories, type CategoryKey } from "@/data/categories";
import { categoryConfig } from "@/data/config";

export default function PlayPage() {
    const params = useParams();
    const router = useRouter();

    const category = params.category as CategoryKey;

    const questions = categories[category];
    const config = categoryConfig[category];

    const { index, setIndex, loaded } = useProgress(category);

    const next = () => {
        if (index < questions.length) {
            setIndex((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    const isEnd = index >= questions.length;

    const background = `radial-gradient(circle at center, ${config.color}20 0%, #000 70%)`;

    // safety check
    if (!questions || !config) {
        return (
            <AppShell>
                <div className="h-full flex items-center justify-center text-white">
                    Invalid category
                </div>
            </AppShell>
        );
    }

    if (!loaded) return null;

    return (
        <AppShell background={background}>
            <div className="relative w-full h-full flex items-center justify-center">

                {/* 🌫 Ambient glow (non-blocking) */}
                <div
                    className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: config.color }}
                />

                {/* 🖤 Edge vignette */}
                <div className="pointer-events-none absolute inset-0 z-[5]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
                </div>

                {/* 📊 Progress bar */}
                <div className="absolute top-0 left-0 h-[2px] bg-white/20 w-full z-10">
                    <div
                        className="h-full bg-white/60 transition-all duration-300"
                        style={{
                            width: `${(Math.min(index + 1, questions.length) / questions.length) * 100
                                }%`,
                        }}
                    />
                </div>

                {/* 📊 Progress text */}
                <div className="absolute top-4 right-4 text-xs text-white/40 z-10">
                    {Math.min(index + 1, questions.length)} / {questions.length}
                </div>

                {isEnd ? (
                    <EndScreen
                        category={category}
                        onRestart={() => setIndex(0)}
                        onHome={() => router.push("/")}
                    />
                ) : (
                    <>
                        {/* BACK CARD */}
                        {index < questions.length - 1 && (
                            <div className="absolute scale-[0.94] opacity-50 translate-y-2 transition-all duration-300">
                                <Card
                                    category={category}
                                    question={questions[index + 1]}
                                    color={config.color}
                                />
                            </div>
                        )}

                        {/* FRONT CARD */}
                        <SwipeCard onNext={next} onPrev={prev}>
                            <Card
                                category={category}
                                question={questions[index] ?? ""}
                                color={config.color}
                            />
                        </SwipeCard>
                    </>
                )}

            </div>
        </AppShell>
    );
}