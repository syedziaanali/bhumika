import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import {
  LUXURY_EASE,
  wordRevealContainer,
  wordRevealChild,
} from "../animations/variants";

export default function FinalSurprisePage({ onReplay }) {
  const prefersReducedMotion = useReducedMotion();
  const headingWords = ["One", "last", "thing,", "Bhumika..."];

  return (
    <section
      aria-label="The Final Surprise"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-20 overflow-hidden"
    >
      {/* Subtle Golden Ambient Glow behind center stage */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.32, 0.52, 0.32],
              }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[680px] aspect-square rounded-full blur-[125px]"
        style={{
          background:
            "radial-gradient(circle, rgba(216,184,120,0.28) 0%, rgba(232,163,181,0.24) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: LUXURY_EASE }}
        className="relative z-10 w-full max-w-3xl mx-auto text-center luxury-glass rounded-2xl sm:rounded-3xl px-4 py-8 xs:px-6 xs:py-10 sm:px-12 sm:py-16 shadow-[0_25px_75px_rgba(10,2,7,0.75)]"
      >
        {/* Glowing Beating Heart */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          className="relative mx-auto mb-6 sm:mb-8 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.35, 1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.4, 0.65, 0.35],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#E8A3B5]/30 blur-xl"
          />
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.15, 0.98, 1.12, 1],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#D8B878]/50 bg-[#3B1023]/75 shadow-[0_0_32px_rgba(232,163,181,0.45)]"
          >
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8A3B5] fill-[#E8A3B5]" />
          </motion.div>
        </motion.div>

        {/* Word-by-word heading reveal */}
        <motion.h2
          variants={wordRevealContainer}
          initial="hidden"
          animate="visible"
          className="font-serif-display italic text-xl xs:text-2xl sm:text-4xl text-[#D8B878] tracking-wide mb-5 sm:mb-7"
        >
          {headingWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordRevealChild}
              className="inline-block mr-[0.22em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Emotional Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: LUXURY_EASE }}
          className="space-y-2 sm:space-y-3 text-sm xs:text-base sm:text-xl text-[#FFF4F0]/90 font-light leading-relaxed max-w-xl mx-auto mb-7 sm:mb-9 px-2"
        >
          <p>
            I don&apos;t know how our story will unfold, but I know one thing...
          </p>
          <p className="text-[#E8A3B5] font-normal">
            I&apos;m really glad our paths crossed.
          </p>
        </motion.div>

        {/* Main Hero Quote */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: LUXURY_EASE }}
          className="my-6 sm:my-8 py-4 sm:py-6 px-2 sm:px-4 border-y border-[#D8B878]/30"
        >
          <h3 className="font-serif-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.2] text-gold-gradient">
            You&apos;re my favourite unexpected beginning. ❤️
          </h3>
        </motion.div>

        {/* Closing line & Handwritten Signature */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.75, ease: LUXURY_EASE }}
          className="font-serif-display italic text-xs xs:text-sm sm:text-base text-[#FFF4F0]/75 tracking-wide mb-3 sm:mb-5"
        >
          Forever curious to discover more of you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{
            delay: prefersReducedMotion ? 0.2 : 1.75,
            duration: 1.1,
            ease: LUXURY_EASE,
          }}
          className="font-script-hand text-4xl xs:text-5xl sm:text-6xl text-[#E8A3B5] leading-none mb-7 sm:mb-10"
        >
          — Ziaan
        </motion.div>

        {/* Poetic Final Signature Block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-md rounded-xl sm:rounded-2xl bg-[#210B18]/65 border border-[#D8B878]/25 px-3.5 py-4 xs:px-5 xs:py-5 text-xs sm:text-sm text-[#FFF4F0]/80 leading-relaxed"
        >
          <p>Some connections are unexpected.</p>
          <p>Some people just feel different.</p>
          <p className="text-[#E8A3B5]">
            And somehow, I found that connection in you.
          </p>
          <p className="mt-2.5 sm:mt-3 text-[#D8B878] font-medium">
            With love, Ziaan ❤️ — Especially for Bhumika.
          </p>
        </motion.div>

        {/* Subtle Replay Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-full border border-[#D8B878]/35 bg-[#3B1023]/55 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#FFF4F0]/80 hover:text-[#FFF4F0] hover:border-[#D8B878]/70 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>Start From Beginning</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
