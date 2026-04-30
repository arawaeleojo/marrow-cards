"use client";

import type { CategoryKey } from "@/data/categories";
import { categoryConfig } from "@/data/config";

type Props = {
    category: CategoryKey; // ✅ system key
    label: string;         // ✅ display label
    onContinue: () => void;
    onRestart: () => void;
    onClose: () => void;
};

export default function ContinueModal({
    category,
    label,
    onContinue,
    onRestart,
    onClose,
}: Props) {
    const config = categoryConfig[category];

    // Safety guard (prevents crash)
    if (!config) {
        console.error("Invalid category in modal:", category);
        return null;
    }

    const isLight =
        category === "within" ||
        category === "doctrine" ||
        category === "between";

    const textColor = isLight ? "text-black" : "text-white";
    const subTextColor = isLight ? "text-black/60" : "text-white/70";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-full max-w-[360px] mx-4">

                <div
                    className={`relative rounded-[28px] p-[14px] overflow-hidden ${textColor}`}
                    style={{ backgroundColor: config.color }}
                >

                    {/* Texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-multiply"
                        style={{
                            backgroundImage: "url('/textures/paper.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    {/* Inner */}
                    <div className="relative rounded-[22px] border border-black/10 px-6 py-8 text-center">

                        {/* Title */}
                        <h2 className="font-serif text-lg mb-2">
                            Continue where you left off?
                        </h2>

                        {/* Category */}
                        <p className={`text-sm mb-6 ${subTextColor}`}>
                            {label}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">

                            <button
                                onClick={onContinue}
                                className={`py-3 rounded-full font-medium ${isLight
                                        ? "bg-black text-white"
                                        : "bg-white text-black"
                                    }`}
                            >
                                Continue
                            </button>

                            <button
                                onClick={onRestart}
                                className={`py-3 rounded-full border ${isLight
                                        ? "border-black/20"
                                        : "border-white/30"
                                    }`}
                            >
                                Start over
                            </button>

                            <button
                                onClick={onClose}
                                className={`text-xs mt-2 ${subTextColor}`}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}