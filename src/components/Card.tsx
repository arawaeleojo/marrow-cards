"use client";

type CategoryKey =
    | "within"
    | "doctrine"
    | "between"
    | "unfiltered"
    | "outloud";

type CardProps = {
    category: CategoryKey;
    question: string;
    color: string;
};

export default function Card({ category, question, color }: CardProps) {
    // 🧠 Display labels (UI only)
    const labelMap: Record<CategoryKey, string> = {
        within: "WITHIN",
        doctrine: "DOCTRINE",
        between: "BETWEEN US",
        unfiltered: "UNFILTERED",
        outloud: "OUT LOUD",
    };

    // 🎨 Light vs Dark categories
    const isLight =
        category === "within" ||
        category === "doctrine" ||
        category === "between";

    const textColor = isLight ? "text-black/90" : "text-white/90";
    const subTextColor = isLight ? "text-black/70" : "text-white/70";

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full max-w-[360px] md:max-w-[320px]">

                <div
                    className="relative w-full h-full rounded-[32px] p-[14px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: color }}
                >

                    {/* 🧾 Paper Texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-multiply"
                        style={{
                            backgroundImage: "url('/textures/paper.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    {/* Inner Card */}
                    <div className="relative w-full h-full rounded-[26px] border border-black/10 overflow-hidden flex flex-col justify-between px-5 py-10">

                        {/* Lighting */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/15 to-black/10" />

                        {/* TOP */}
                        <div
                            className={`relative z-10 text-center text-[11px] tracking-[0.25em] uppercase ${subTextColor}`}
                        >
                            [{labelMap[category]}]
                        </div>

                        {/* QUESTION */}
                        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-4">
                            <p
                                className={`font-serif text-[21px] leading-[1.7] tracking-[-0.01em] ${textColor}`}
                            >
                                {question}
                            </p>
                        </div>

                        {/* BOTTOM */}
                        <div
                            className={`relative z-10 text-center text-[11px] tracking-[0.35em] uppercase ${subTextColor}`}
                        >
                            MARROW
                            <div className="text-[10px] tracking-[0.2em] mt-1">
                                {labelMap[category]}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}