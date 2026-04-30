"use client";

type CardProps = {
    category: string;
    question: string;
    color: string;
};

export default function Card({ category, question, color }: CardProps) {
    const isLight =
        category === "WITHIN" ||
        category === "DOCTRINE" ||
        category === "BETWEEN US";

    const textColor = isLight ? "text-black/90" : "text-white/90";
    const subTextColor = isLight ? "text-black/70" : "text-white/70";

    return (
        <div className="w-full h-full flex items-center justify-center">

            <div className="w-full h-full max-w-[360px] md:max-w-[320px]">

                <div
                    className="relative w-full h-full rounded-[32px] p-[14px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: color }}
                >

                    {/* Texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-multiply"
                        style={{
                            backgroundImage: "url('/textures/paper.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    {/* Inner */}
                    <div className="relative w-full h-full rounded-[26px] border border-black/10 overflow-hidden flex flex-col justify-between px-5 py-10">

                        {/* Light overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/15 to-black/10" />

                        {/* TOP */}
                        <div className={`relative z-10 text-center text-[11px] tracking-[0.25em] uppercase ${subTextColor}`}>
                            [{category}]
                        </div>

                        {/* QUESTION */}
                        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-4">
                            <p className={`font-serif text-[21px] leading-[1.7] tracking-[-0.01em] ${textColor}`}>
                                {question}
                            </p>
                        </div>

                        {/* BOTTOM */}
                        <div className={`relative z-10 text-center text-[11px] tracking-[0.35em] uppercase ${subTextColor}`}>
                            MARROW
                            <div className="text-[10px] tracking-[0.2em] mt-1">
                                {category}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}