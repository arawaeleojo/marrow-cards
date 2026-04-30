"use client";

import { useEffect, useState } from "react";

type ProgressMap = Record<string, number>;

export function useProgress(category: string) {
    const [index, setIndex] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);

    // Load progress on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = localStorage.getItem("marrow-progress");

        if (stored) {
            try {
                const parsed: ProgressMap = JSON.parse(stored);
                setIndex(parsed[category] ?? 0);
            } catch {
                setIndex(0);
            }
        }

        setLoaded(true);
    }, [category]);

    // Save progress whenever index changes
    useEffect(() => {
        if (!loaded) return;
        if (typeof window === "undefined") return;

        const stored = localStorage.getItem("marrow-progress");

        let parsed: ProgressMap = {};

        if (stored) {
            try {
                parsed = JSON.parse(stored);
            } catch {
                parsed = {};
            }
        }

        parsed[category] = index;

        localStorage.setItem("marrow-progress", JSON.stringify(parsed));
    }, [index, category, loaded]);

    return { index, setIndex, loaded };
}