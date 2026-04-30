import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    background?: string; // ✅ add this
};

export default function AppShell({ children, background }: Props) {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                background:
                    background || "radial-gradient(circle at center, #111 0%, #000 100%)",
            }}
        >
            <div className="w-full h-screen md:h-[90vh] md:max-w-[420px] relative overflow-hidden">
                {children}
            </div>
        </div>
    );
}