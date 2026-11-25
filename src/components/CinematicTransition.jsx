import React, { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import { LUXURY_EASE } from "../animations/variants";

export default function CinematicTransition({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 1200 : 3400;
    const timer = window.setTimeout(() => {
      onComplete();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  const burstHearts = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxRadius = isMobile ? Math.min(130, window.innerWidth * 0.36) : 210;
    const minRadius = isMobile ? 65 : 110;
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = minRadius + (i % 3) * ((maxRadius - minRadius) / 2);
      return {
        id: i,
        tx: Math.cos(angle) * radius,
        ty: Math.sin(angle) * radius,
        size: (isMobile ? 10 : 14) + (i % 4) * 4,
        delay: 0.35 + (i % 4) * 0.08,
      };
    });
  }, []);

  const goldenDust = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: ((i * 53) % 86) - 43,
      y: ((i * 37) % 80) - 40,
      delay: 0.25 + (i % 6) * 0.12,
      size: 3 + (i % 3),
    }));
  }, []);

  return (
    <motion.div
      key="cinematic-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: LUXURY_EASE } }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background transitioning into deeper romantic gradient */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: LUXURY_EASE }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, #521631 0%, #3B1023 42%, #1C0713 100%)",
        }}
      />

      {/* Golden particles & rose glow */}
      {!prefersReducedMotion &&
        goldenDust.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute rounded-full bg-[#D8B878]"
            style={{
              width: dot.size,
              height: dot.size,
              boxShadow: "0 0 12px rgba(216,184,120,0.9)",
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.95, 0],
              x: `${dot.x}vw`,
              y: `${dot.y}vh`,
              scale: [0.3, 1.3, 0.6],
            }}
            transition={{
              duration: 2.3,
              delay: dot.delay,
              ease: LUXURY_EASE,
            }}
          />
        ))}

      {/* Central Heartbeat + Outward Flying Hearts -> Envelope Reveal */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Soft pink glow halo */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.4, 1.5, 1.2, 1.8],
            opacity: [0, 0.75, 0.5, 0.2],
          }}
          transition={{ duration: 2.6, ease: "easeInOut" }}
          className="absolute w-48 h-48 rounded-full bg-[#E8A3B5]/35 blur-3xl"
        />

        {/* Smaller hearts flying outward */}
        {!prefersReducedMotion &&
          burstHearts.map((bh) => (
            <motion.div
              key={bh.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
              animate={{
                opacity: [0, 1, 0],
                x: bh.tx,
                y: bh.ty,
                scale: [0.4, 1.15, 0.7],
                rotate: [0, bh.id % 2 === 0 ? 25 : -25],
              }}
              transition={{
                duration: 1.7,
                delay: bh.delay,
                ease: LUXURY_EASE,
              }}
              className="absolute text-[#E8A3B5]"
            >
              <Heart
                style={{ width: bh.size, height: bh.size }}
                className="fill-[#E8A3B5] drop-shadow-[0_0_10px_rgba(232,163,181,0.85)]"
              />
            </motion.div>
          ))}

        {/* Large glowing beating pink heart */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.3, 1.2, 1.0, 1.25, 1.05, 0],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 2.45,
            times: [0, 0.22, 0.4, 0.58, 0.76, 1],
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          <Heart className="w-24 h-24 sm:w-28 sm:h-28 text-[#E8A3B5] fill-[#E8A3B5] drop-shadow-[0_0_32px_rgba(232,163,181,0.9)]" />
        </motion.div>

        {/* Envelope slowly appearing near the end of transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0.35 : 2.15,
            duration: 0.9,
            ease: LUXURY_EASE,
          }}
          className="absolute flex flex-col items-center gap-3"
        >
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B1023] to-[#210B18] border border-[#D8B878]/60 shadow-[0_0_40px_rgba(216,184,120,0.4)]">
            <Mail className="w-9 h-9 text-[#D8B878]" />
          </div>
          <p className="font-serif-display italic text-lg sm:text-xl text-[#FFF4F0] whitespace-nowrap">
            For my Bhumika...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
