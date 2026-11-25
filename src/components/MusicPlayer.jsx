import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <div
      className="fixed z-50 right-3.5 sm:right-6"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
      }}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause romantic music" : "Play romantic music"}
        aria-pressed={isPlaying}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-2.5 rounded-full luxury-glass px-3.5 py-3 sm:px-4 sm:py-3 text-[#FFF4F0] shadow-[0_12px_35px_rgba(15,3,10,0.75)] transition-colors hover:border-[#D8B878]/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B878]"
      >
        {/* Ambient pulsing ring when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0.45, 0.15, 0.45],
                scale: [1, 1.24, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border border-[#E8A3B5]/60 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A3B5]/25 to-[#D8B878]/20 border border-[#D8B878]/40">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#FFF4F0]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#FFF4F0] ml-0.5" />
          )}
        </span>

        {/* Animated Equalizer Bars */}
        <div className="hidden sm:flex flex-col items-start pr-1">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#D8B878] font-medium leading-none mb-1">
            {isPlaying ? "Playing" : "Music"}
          </span>
          <div className="flex items-center gap-1.5">
            <Music className="w-3 h-3 text-[#E8A3B5]" />
            <div className="flex items-end gap-[2.5px] h-3">
              {[0.5, 1, 0.7, 0.9].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-[#E8A3B5]"
                  animate={
                    isPlaying
                      ? {
                          height: ["4px", `${Math.round(h * 12)}px`, "5px"],
                        }
                      : { height: "4px" }
                  }
                  transition={{
                    duration: 0.75 + i * 0.12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
