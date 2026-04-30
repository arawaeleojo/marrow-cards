"use client";

import { categoryConfig } from "@/data/config";
import {
    Sparkles,
    Sun,
    Flower2,
    Flame,
    Users,
} from "lucide-react";

type Props = {
    category: string;
    onContinue: () => void;
    onRestart: () => void;
    onClose: () => void;
};

export default function ContinueModal({
    category,
    onContinue,
    onRestart,
    onClose,
}: Props) {
    const key = category.toLowerCase().replace(" ", "") as keyof typeof categoryConfig;
    const config = categoryConfig[key];

    const isLight =
        key === "within" ||
        key === "doctrine" ||
        key === "between";

    const textColor = isLight ? "text-black" : "text-white";
    const subTextColor = isLight ? "text-black/60" : "text-white/70";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            {/* Modal Card */}
            <div
                className={`relative w-[90%] max-w-sm rounded-3xl p-6 overflow-hidden ${textColor}`}
                style={{ backgroundColor: config.color }}
            >

                {/* 🧾 Texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-multiply"
                    style={{
                        backgroundImage: "url('/textures/paper.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 text-center">

                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                        {getIcon(key, isLight)}
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-[22px] tracking-[0.1em] mb-2">
                        {config.label}
                    </h2>

                    {/* Description */}
                    <p className={`text-sm mb-6 ${subTextColor}`}>
                        {getDescription(key)}
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
                            Start Over
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
    );
}

/* ---------------- HELPERS ---------------- */

function getDescription(key: string) {
    switch (key) {
        case "within":
            return "The Self";
        case "doctrine":
            return "Faith & Belief";
        case "between":
            return "Relationships";
        case "unfiltered":
            return "Hard Truths";
        case "outloud":
            return "Friends & Groups";
        default:
            return "";
    }
}

function getIcon(key: string, isLight: boolean) {
    const color = isLight ? "black" : "white";
    const className = "w-6 h-6 opacity-90";

    switch (key) {
        case "within":
            return <Sparkles className={className} color={color} />;
        case "doctrine":
            return <Sun className={className} color={color} />;
        case "between":
            return <Flower2 className={className} color={color} />;
        case "unfiltered":
            return <Flame className={className} color={color} />;
        case "outloud":
            return <Users className={className} color={color} />;
        default:
            return null;
    }
}