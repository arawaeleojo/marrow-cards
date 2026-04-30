"use client";

import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

type SwipeCardProps = {
    children: React.ReactNode;
    onNext: () => void;
    onPrev: () => void;
};

export default function SwipeCard({
    children,
    onNext,
    onPrev,
}: SwipeCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-10, 10]);

    // +1 = moving forward (left swipe), -1 = going back (right swipe)
    const directionRef = useRef<1 | -1>(1);

    return (
        <motion.div className="w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={String(children)}
                    style={{ x, rotate }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    dragMomentum
                    whileTap={{ scale: 0.97 }}
                    className="w-full h-full"

                    onDragEnd={(e, info) => {
                        const { offset, velocity } = info;

                        if (offset.x < -100 || velocity.x < -500) {
                            directionRef.current = 1;
                            onNext();
                        } else if (offset.x > 100 || velocity.x > 500) {
                            directionRef.current = -1;
                            onPrev();
                        } else {
                            x.set(0);
                        }
                    }}

                    initial={{
                        x: directionRef.current === 1 ? 80 : -80,
                        opacity: 0,
                        scale: 0.96,
                    }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{
                        x: directionRef.current === 1 ? -350 : 350,
                        opacity: 0,
                        scale: 0.92,
                        transition: { duration: 0.22, ease: "easeOut" },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}