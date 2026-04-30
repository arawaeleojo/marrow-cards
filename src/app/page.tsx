"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AppShell from "@/components/AppShell";
import Welcome from "@/components/Welcome";
import CategorySelect from "@/components/CategorySelect";
import ContinueModal from "@/components/ContinueModal";
import Play from "@/components/Play";

import { categoryConfig } from "@/data/config";
import type { CategoryKey } from "@/data/categories";

type Screen = "welcome" | "categories" | "play";

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selected, setSelected] = useState<CategoryKey | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => setScreen("categories");

  const handleCategory = (key: CategoryKey) => {
    const stored = localStorage.getItem("marrow-progress");
    const parsed = stored ? JSON.parse(stored) : {};

    if (parsed[key] && parsed[key] > 0) {
      setSelected(key);
      setShowModal(true);
    } else {
      setSelected(key);
      setScreen("play");
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    setScreen("play");
  };

  const handleRestart = () => {
    if (!selected) return;

    const stored = localStorage.getItem("marrow-progress");
    const parsed = stored ? JSON.parse(stored) : {};

    parsed[selected] = 0;
    localStorage.setItem("marrow-progress", JSON.stringify(parsed));

    setShowModal(false);
    setScreen("play");
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">

        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            transition={transition}
            className="h-full"
          >
            <Welcome onStart={handleStart} />
          </motion.div>
        )}

        {screen === "categories" && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            transition={transition}
            className="h-full"
          >
            <CategorySelect onSelect={handleCategory} />
          </motion.div>
        )}

        {screen === "play" && selected && (
          <motion.div
            key="play"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full"
          >
            <Play
              category={selected}
              onBack={() => setScreen("categories")}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {showModal && selected && (
        <ContinueModal
          category={categoryConfig[selected].label}
          onContinue={handleContinue}
          onRestart={handleRestart}
          onClose={() => setShowModal(false)}
        />
      )}
    </AppShell>
  );
}