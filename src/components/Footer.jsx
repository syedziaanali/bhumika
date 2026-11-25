import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export default function Footer({ showBackToTop }) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 w-full border-t border-[#D8B878]/15 bg-[#180711]/70 backdrop-blur-md px-4 sm:px-5 py-6 sm:py-8 text-center"
      style={{
        paddingBottom: "max(1.75rem, env(safe-area-inset-bottom, 1.75rem))",
      }}
    >
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2 text-sm sm:text-base font-serif-display italic text-[#FFF4F0]/90">
          <span>Made with love, especially for Bhumika.</span>
          <motion.span
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.24, 1, 1.16, 1] }
            }
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex"
          >
            <Heart className="w-4 h-4 text-[#E8A3B5] fill-[#E8A3B5] drop-shadow-[0_0_8px_rgba(232,163,181,0.75)]" />
          </motion.span>
        </div>

        <p className="text-xs sm:text-sm tracking-[0.18em] uppercase text-[#D8B878]/85">
          — Ziaan ❤️
        </p>

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D8B878]/25 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#FFF4F0]/70 hover:text-[#FFF4F0] hover:border-[#D8B878]/55 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3 text-[#D8B878]" />
            <span>Top</span>
          </button>
        )}
      </div>
    </footer>
  );
}
