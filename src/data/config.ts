import type { CategoryKey } from "./categories";

export const categoryConfig: Record<
    CategoryKey,
    { label: string; color: string }
> = {
    within: {
        label: "WITHIN",
        color: "#A9BCA9",
    },
    doctrine: {
        label: "DOCTRINE",
        color: "#E6DECA",
    },
    between: {
        label: "BETWEEN US",
        color: "#C79F9E",
    },
    unfiltered: {
        label: "UNFILTERED",
        color: "#5E2730",
    },
    outloud: {
        label: "OUT LOUD",
        color: "#6B7B6D",
    },
};