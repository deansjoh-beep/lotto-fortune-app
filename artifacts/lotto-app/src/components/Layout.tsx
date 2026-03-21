import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-background text-foreground transition-colors duration-300">

      {/* Accent orbs – visible in both modes, lighter in light mode */}
      <div className="orb w-[45%] h-[45%] top-[-10%] left-[-10%] bg-[#FF2E93]" />
      <div className="orb w-[45%] h-[45%] bottom-[-10%] right-[-10%] bg-[#00F0FF]" />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-5 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-full glass-panel border border-border hover:scale-110 active:scale-95 transition-all shadow-md"
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-[#FFD700]" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-[#A020F0]" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full min-h-screen flex flex-col"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
