import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { LUXURY_EASE } from "../animations/variants";

export default function LoadingScreen({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = prefersReducedMotion ? 900 : 2800;
    const intervalMs = 40;
    const start = Date.now();

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);
      if (elapsed >= totalDuration) {
        window.clearInterval(timer);
        onComplete();
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [onComplete, prefersReducedMotion]);

  const loadingText = "Preparing something special for Bhumika...";

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: "blur(8px)",
        transition: { duration: 0.8, ease: LUXURY_EASE },
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center bg-[#210B18] overflow-hidden"
    >
      {/* Deep burgundy radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 16, 35, 0.95) 0%, #210B18 65%, #13040D 100%)",
        }}
      />

      {/* Tiny golden particles & petals floating around during load */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, idx) => (
            <motion.span
              key={idx}
              className="absolute rounded-full bg-[#D8B878]"
              style={{
                width: idx % 2 === 0 ? 3 : 2,
                height: idx % 2 === 0 ? 3 : 2,
                left: `${15 + ((idx * 19) % 70)}%`,
                top: `${20 + ((idx * 23) % 60)}%`,
                boxShadow: "0 0 10px rgba(216,184,120,0.8)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -35 - (idx % 3) * 15],
                scale: [0.5, 1.3, 0.6],
              }}
              transition={{
                duration: 2.2,
                delay: 0.35 + idx * 0.08,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Delicate rose petals slowly appearing */}
          {[18, 34, 66, 80].map((leftPct, i) => (
            <motion.div
              key={`lp-${i}`}
              className="absolute w-3.5 h-4 rounded-full bg-gradient-to-b from-[#E8A3B5]/70 to-[#B97891]/30 blur-[0.3px]"
              style={{ left: `${leftPct}%`, top: "-10px" }}
              initial={{ opacity: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 0.55, 0],
                y: [0, 320],
                x: [0, i % 2 === 0 ? 25 : -25],
                rotate: [0, 180],
              }}
              transition={{
                duration: 3.4,
                delay: 0.5 + i * 0.2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Center glowing heartbeat */}
      <div className="relative flex items-center justify-center mb-6 sm:mb-8">
        <motion.div
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E8A3B5]/20 blur-2xl"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: [0.8, 1.35, 1, 1.28, 0.9],
            opacity: [0.3, 0.75, 0.45, 0.7, 0.35],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.4, 1.08, 0.96, 1.14, 1],
            opacity: 1,
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 0.6 },
          }}
          className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D8B878]/35 bg-[#3B1023]/60 backdrop-blur-md shadow-[0_0_40px_rgba(232,163,181,0.35)]"
        >
          <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-[#E8A3B5] fill-[#E8A3B5] drop-shadow-[0_0_16px_rgba(232,163,181,0.85)]" />
        </motion.div>
      </div>

      {/* Smooth revealed loading text */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.75, ease: LUXURY_EASE }}
        className="font-serif-display italic text-lg xs:text-xl sm:text-2xl md:text-3xl text-[#FFF4F0] tracking-wide max-w-xs xs:max-w-md leading-relaxed px-2"
      >
        {loadingText}
      </motion.p>

      {/* Subtle gold loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="mt-6 sm:mt-8 w-44 xs:w-52 sm:w-64"
      >
        <div className="h-[2px] w-full rounded-full bg-[#FFF4F0]/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#B97891] via-[#E8A3B5] to-[#D8B878]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.08 }}
          />
        </div>
        <p className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#D8B878]/80">
          With Love, Ziaan
        </p>
      </motion.div>
    </motion.div>
  );
}
