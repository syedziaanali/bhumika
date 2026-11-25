import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import {
  LOVE_LETTER_PARAGRAPHS,
  LOVE_LETTER_CLOSING,
  LOVE_LETTER_SIGNATURE,
} from "../data/storyData";
import { LUXURY_EASE } from "../animations/variants";

export default function LoveLetterPage({ onNext }) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState("sealed"); // 'sealed' | 'opening' | 'revealed'

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    window.setTimeout(
      () => {
        setStage("revealed");
      },
      prefersReducedMotion ? 350 : 1550
    );
  };

  return (
    <section
      aria-label="The Love Letter"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-24"
    >
      <AnimatePresence mode="wait">
        {stage !== "revealed" ? (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 1.03,
              filter: "blur(6px)",
              transition: { duration: 0.55, ease: LUXURY_EASE },
            }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="w-full max-w-lg mx-auto flex flex-col items-center text-center"
          >
            {/* Intro Heading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#D8B878] mb-2 sm:mb-3"
            >
              A Letter From Ziaan
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75 }}
              className="font-serif-display italic text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#FFF4F0] mb-6 sm:mb-10 max-w-xs sm:max-w-md leading-snug px-2"
            >
              Someone has something special to tell you...
            </motion.h2>

            {/* 3D Interactive Luxury Envelope */}
            <div
              className="relative w-full max-w-[280px] xs:max-w-[325px] sm:max-w-[400px] h-[190px] xs:h-[220px] sm:h-[260px] mb-8 sm:mb-10"
              style={{ perspective: "1200px" }}
            >
              {/* Soft golden aura behind envelope */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-3xl blur-2xl sm:blur-3xl opacity-45 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(216,184,120,0.38) 0%, rgba(232,163,181,0.22) 55%, transparent 75%)",
                }}
              />

              {/* Envelope Back Body */}
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#4D162F] via-[#3B1023] to-[#260917] border border-[#D8B878]/55 shadow-[0_25px_70px_rgba(12,2,8,0.85)] overflow-visible">
                {/* Inner Ivory Paper Sliding Out */}
                <motion.div
                  initial={{ y: 0, opacity: 0.9 }}
                  animate={
                    stage === "opening"
                      ? { y: typeof window !== "undefined" && window.innerWidth < 640 ? -75 : -115, opacity: 1, scale: 1.02 }
                      : { y: 0, opacity: 0.85 }
                  }
                  transition={{
                    delay: 0.45,
                    duration: 0.95,
                    ease: LUXURY_EASE,
                  }}
                  className="absolute inset-x-3 xs:inset-x-4 top-3 xs:top-4 bottom-3 xs:bottom-4 rounded-xl ivory-paper p-3 xs:p-4 sm:p-5 flex flex-col items-center justify-start pointer-events-none z-10"
                >
                  <div className="w-10 sm:w-12 h-[1px] bg-[#D8B878]/70 mb-1.5 sm:mb-2" />
                  <p className="font-serif-display italic text-xs xs:text-sm sm:text-base text-[#3B1023]">
                    My Bhumika ❤️,
                  </p>
                  <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 w-full opacity-35">
                    <div className="h-1 sm:h-1.5 w-full rounded bg-[#3B1023]/40" />
                    <div className="h-1 sm:h-1.5 w-5/6 rounded bg-[#3B1023]/40 mx-auto" />
                    <div className="h-1 sm:h-1.5 w-4/6 rounded bg-[#3B1023]/40 mx-auto" />
                  </div>
                </motion.div>

                {/* Envelope Front Lower Pocket (SVG folds with gold trim) */}
                <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden pointer-events-none">
                  <svg
                    viewBox="0 0 400 260"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    {/* Left fold */}
                    <polygon
                      points="0,0 205,140 0,260"
                      fill="#350E20"
                      stroke="rgba(216,184,120,0.35)"
                      strokeWidth="1"
                    />
                    {/* Right fold */}
                    <polygon
                      points="400,0 195,140 400,260"
                      fill="#2E0B1B"
                      stroke="rgba(216,184,120,0.35)"
                      strokeWidth="1"
                    />
                    {/* Bottom fold */}
                    <polygon
                      points="0,260 200,122 400,260"
                      fill="url(#bottomFoldGrad)"
                      stroke="rgba(216,184,120,0.5)"
                      strokeWidth="1.2"
                    />
                    <defs>
                      <linearGradient
                        id="bottomFoldGrad"
                        x1="0"
                        y1="122"
                        x2="0"
                        y2="260"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#46142B" />
                        <stop offset="100%" stopColor="#2A0A19" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Envelope Top Flap */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={stage === "opening" ? { rotateX: -175 } : { rotateX: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.7,
                    ease: LUXURY_EASE,
                  }}
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute top-0 left-0 right-0 h-[58%] pointer-events-none ${
                    stage === "opening" ? "z-0" : "z-30"
                  }`}
                >
                  <svg
                    viewBox="0 0 400 150"
                    preserveAspectRatio="none"
                    className="w-full h-full drop-shadow-[0_10px_18px_rgba(10,2,6,0.45)]"
                    aria-hidden="true"
                  >
                    <polygon
                      points="0,0 400,0 200,145"
                      fill="url(#topFlapGrad)"
                      stroke="rgba(216,184,120,0.55)"
                      strokeWidth="1.4"
                    />
                    <defs>
                      <linearGradient
                        id="topFlapGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="145"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#541833" />
                        <stop offset="100%" stopColor="#3B1023" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Champagne-Gold & Burgundy Heart Wax Seal */}
                <motion.button
                  type="button"
                  onClick={handleOpenEnvelope}
                  aria-label="Break wax seal and open envelope"
                  animate={
                    stage === "opening"
                      ? {
                          scale: [1, 1.25, 0],
                          rotate: [0, -14, 24],
                          opacity: [1, 0.9, 0],
                        }
                      : {
                          scale: [1, 1.05, 1],
                        }
                  }
                  transition={
                    stage === "opening"
                      ? { duration: 0.45, ease: LUXURY_EASE }
                      : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#D8B878] via-[#B8904C] to-[#7D5822] border-2 border-[#FFF4F0]/55 shadow-[0_8px_25px_rgba(12,2,8,0.7),0_0_24px_rgba(216,184,120,0.55)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4F0] active:scale-95 transition-transform"
                >
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#3B1023]/30 bg-gradient-to-br from-[#8D264B] to-[#56132C]">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFF4F0] fill-[#E8A3B5]" />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Open Letter Button */}
            <motion.button
              type="button"
              onClick={handleOpenEnvelope}
              disabled={stage === "opening"}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 32px rgba(216, 184, 120, 0.45)",
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full px-6 xs:px-8 py-3 sm:py-3.5 text-xs xs:text-sm sm:text-base font-medium tracking-wide text-[#210B18] bg-gradient-to-r from-[#FFF4F0] via-[#E8A3B5] to-[#D8B878] border border-[#FFF4F0]/60 shadow-[0_12px_32px_rgba(15,3,10,0.6)] cursor-pointer disabled:opacity-70 active:scale-95 transition-transform"
            >
              <span>Open Your Letter 💌</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Revealed Full Ivory Paper Letter */
          <motion.article
            key="letter-paper"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="relative w-full max-w-2xl mx-auto"
          >
            {/* Subtle floating golden sparkles around the letter */}
            {!prefersReducedMotion && (
              <div
                className="pointer-events-none absolute -inset-4 sm:-inset-8"
                aria-hidden="true"
              >
                {[
                  { top: "6%", left: "-2%", delay: 0 },
                  { top: "24%", right: "-3%", delay: 0.6 },
                  { bottom: "28%", left: "-3%", delay: 1.2 },
                  { bottom: "8%", right: "-2%", delay: 0.9 },
                ].map((pos, idx) => (
                  <motion.div
                    key={idx}
                    style={pos}
                    animate={{
                      opacity: [0.2, 0.85, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3.2,
                      delay: pos.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute text-[#D8B878]"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="relative ivory-paper rounded-2xl sm:rounded-3xl px-4 py-7 xs:px-6 xs:py-9 sm:px-12 sm:py-14 text-[#2C0E1C] overflow-hidden">
              {/* Gold Corner Ornaments - Scaled for mobile */}
              <div
                className="pointer-events-none absolute top-2.5 left-2.5 sm:top-4 sm:left-4 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#D8B878]/65 rounded-tl-sm sm:rounded-tl-md"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#D8B878]/65 rounded-tr-sm sm:rounded-tr-md"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#D8B878]/65 rounded-bl-sm sm:rounded-bl-md"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#D8B878]/65 rounded-br-sm sm:rounded-br-md"
                aria-hidden="true"
              />

              {/* Wax Seal Emblem Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-7"
              >
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D8B878]" />
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3B1023] border border-[#D8B878]/60 shadow-md">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8A3B5] fill-[#E8A3B5]" />
                </span>
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D8B878]" />
              </motion.div>

              {/* Love Letter Paragraphs */}
              <div className="space-y-3.5 sm:space-y-5 font-serif-display text-[14.5px] xs:text-[15.5px] sm:text-[17.5px] leading-[1.75] sm:leading-[1.82] text-[#2C0E1C]">
                {LOVE_LETTER_PARAGRAPHS.map((para, idx) => {
                  const isSalutation = idx === 0;
                  const isFinalHighlight =
                    idx === LOVE_LETTER_PARAGRAPHS.length - 1;
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.09,
                        duration: 0.65,
                        ease: LUXURY_EASE,
                      }}
                      className={
                        isSalutation
                          ? "text-lg xs:text-xl sm:text-2xl font-semibold text-[#3B1023] mb-1.5 sm:mb-2"
                          : isFinalHighlight
                            ? "italic font-medium text-[#3B1023] border-l-2 border-[#D8B878] pl-3 sm:pl-4 py-1 bg-[#E8A3B5]/15 rounded-r-lg"
                            : "text-[#321221]/95"
                      }
                    >
                      {para}
                    </motion.p>
                  );
                })}
              </div>

              {/* Closing & Handwritten Signature */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion
                    ? 0.1
                    : 0.2 + LOVE_LETTER_PARAGRAPHS.length * 0.09,
                  duration: 0.8,
                  ease: LUXURY_EASE,
                }}
                className="mt-7 sm:mt-9 pt-5 sm:pt-6 border-t border-[#D8B878]/35 flex flex-col items-end text-right"
              >
                <p className="font-serif-display italic text-sm sm:text-lg text-[#4B1A30]">
                  {LOVE_LETTER_CLOSING}
                </p>
                <motion.p
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                  transition={{
                    delay: prefersReducedMotion
                      ? 0.15
                      : 0.5 + LOVE_LETTER_PARAGRAPHS.length * 0.09,
                    duration: 1.2,
                    ease: LUXURY_EASE,
                  }}
                  className="font-script-hand text-3xl xs:text-4xl sm:text-5xl text-[#3B1023] mt-1.5 sm:mt-2 leading-none"
                >
                  {LOVE_LETTER_SIGNATURE}
                </motion.p>
              </motion.div>
            </div>

            {/* Continue to Next Page Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.65 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                type="button"
                onClick={onNext}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 28px rgba(232,163,181,0.4)",
                }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 rounded-full luxury-glass px-7 py-3.5 text-sm sm:text-base font-medium text-[#FFF4F0] border border-[#D8B878]/45 hover:border-[#D8B878] transition-colors cursor-pointer"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#E8A3B5]" />
              </motion.button>
            </motion.div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
