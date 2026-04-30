"use client";

type EndScreenProps = {
    category: string;
    onRestart: () => void;
    onHome: () => void;
};

export default function EndScreen({
    category,
    onRestart,
    onHome,
}: EndScreenProps) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">

            <h2 className="text-2xl font-serif mb-3">
                You’ve reached the end
            </h2>

            <p className="text-white/60 mb-8">
                {category}
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <button
                    onClick={onRestart}
                    className="py-3 rounded-full bg-white text-black font-medium"
                >
                    Restart
                </button>

                <button
                    onClick={onHome}
                    className="py-3 rounded-full border border-white/20"
                >
                    Choose another category
                </button>
            </div>

        </div>
    );
}