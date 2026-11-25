import React, { useMemo, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const PetalSVG = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16 2C11.5 7 5 12.5 6.5 20.5C7.8 27.2 13.8 30 16.5 30C19.5 30 25 26.5 25.8 19.5C26.8 11 20.5 6.5 16 2Z"
      fill="url(#petalGrad)"
    />
    <defs>
      <linearGradient
        id="petalGrad"
        x1="6"
        y1="2"
        x2="25"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E8A3B5" stopOpacity="0.85" />
        <stop offset="0.55" stopColor="#B97891" stopOpacity="0.65" />
        <stop offset="1" stopColor="#3B1023" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

const HeartSVG = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function AmbientBackground({ intensity = "normal" }) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 28;
      const ny = (e.clientY / window.innerHeight - 0.5) * 28;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const count = intensity === "rich" ? (isMobile ? 14 : 24) : (isMobile ? 9 : 16);
    return Array.from({ length: count }, (_, i) => ({
      id: `gold-${i}`,
      left: `${(i * 37 + 11) % 96}%`,
      size: 2 + (i % 3) * 1.3,
      duration: 9 + (i % 7) * 2.2,
      delay: (i * 0.7) % 8,
      opacity: 0.25 + (i % 4) * 0.14,
    }));
  }, [intensity]);

  const petals = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const count = intensity === "rich" ? (isMobile ? 8 : 14) : (isMobile ? 5 : 9);
    return Array.from({ length: count }, (_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 29 + 5) % 94}%`,
      size: (isMobile ? 12 : 14) + (i % 4) * 4,
      duration: 13 + (i % 5) * 3,
      delay: (i * 1.4) % 10,
      sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
      opacity: 0.28 + (i % 3) * 0.12,
    }));
  }, [intensity]);

  const hearts = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const count = intensity === "rich" ? (isMobile ? 6 : 10) : (isMobile ? 4 : 7);
    return Array.from({ length: count }, (_, i) => ({
      id: `heart-${i}`,
      left: `${(i * 43 + 8) % 92}%`,
      size: (isMobile ? 8 : 10) + (i % 4) * 3,
      duration: 14 + (i % 4) * 3.5,
      delay: (i * 1.9) % 9,
      opacity: 0.12 + (i % 3) * 0.06,
    }));
  }, [intensity]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Base multi-layered romantic gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59, 16, 35, 0.92) 0%, #210B18 65%, #16060F 100%)",
        }}
      />

      {/* Parallax soft atmospheric lighting */}
      <motion.div
        style={prefersReducedMotion ? undefined : { x: smoothX, y: smoothY }}
        className="absolute -inset-16"
      >
        <div
          className="absolute top-[-10%] left-[-8%] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full blur-[120px] opacity-40 animate-ambient-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(232,163,181,0.32) 0%, rgba(59,16,35,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-[-12%] right-[-8%] w-[60vw] h-[60vw] max-w-[740px] max-h-[740px] rounded-full blur-[130px] opacity-35 animate-ambient-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(216,184,120,0.22) 0%, rgba(59,16,35,0) 70%)",
            animationDelay: "-7s",
          }}
        />
        <div
          className="absolute top-[38%] left-[42%] w-[38vw] h-[38vw] max-w-[460px] max-h-[460px] rounded-full blur-[110px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(185,120,145,0.3) 0%, rgba(33,11,24,0) 72%)",
          }}
        />
      </motion.div>

      {/* Subtle fine vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(16, 4, 10, 0.65) 100%)",
        }}
      />

      {!prefersReducedMotion && (
        <>
          {/* Floating golden particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#D8B878]"
              style={{
                left: p.left,
                bottom: "-20px",
                width: p.size,
                height: p.size,
                boxShadow: "0 0 8px rgba(216, 184, 120, 0.7)",
              }}
              animate={{
                y: [0, -window.innerHeight - 80],
                opacity: [0, p.opacity, p.opacity, 0],
                scale: [0.8, 1.2, 0.9],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Slowly falling rose petals */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute -top-12"
              style={{
                left: petal.left,
                width: petal.size,
                height: petal.size,
                opacity: petal.opacity,
              }}
              animate={{
                y: [-40, window.innerHeight + 80],
                x: [0, petal.sway, -petal.sway * 0.5, petal.sway * 0.3],
                rotate: [0, 140, 260, 360],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <PetalSVG className="w-full h-full drop-shadow-[0_4px_10px_rgba(232,163,181,0.25)]" />
            </motion.div>
          ))}

          {/* Gentle rising glowing hearts */}
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute -bottom-10 text-[#E8A3B5]"
              style={{
                left: h.left,
                width: h.size,
                height: h.size,
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [0, 16, -12, 8],
                opacity: [0, h.opacity, h.opacity, 0],
                scale: [0.85, 1.08, 0.92],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HeartSVG className="w-full h-full drop-shadow-[0_0_8px_rgba(232,163,181,0.45)]" />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
