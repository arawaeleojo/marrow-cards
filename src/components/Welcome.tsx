"use client";

import { motion } from "framer-motion";

export default function Welcome({ onStart }: { onStart: () => void }) {
    return (
        <motion.div
            onClick={onStart}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full flex flex-col items-center justify-center text-center px-6 cursor-pointer"
        >
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm tracking-[0.3em] text-white/60 mb-2"
            >
                Welcome to
            </motion.p>

            <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 0.4,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="text-5xl font-serif mb-6"
            >
                MARROW
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/60 mb-10"
            >
                Meaningful questions.<br />Real conversations.
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/30 text-sm"
            >
                Tap to begin
            </motion.p>
        </motion.div>
    );
}