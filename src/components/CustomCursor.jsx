import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 260, damping: 24, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);

    const onMediaChange = (e) => setEnabled(e.matches);
    media.addEventListener("change", onMediaChange);
    return () => media.removeEventListener("change", onMediaChange);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      const isInteractive =
        target instanceof Element &&
        Boolean(target.closest("button, a, [data-cursor-hover='true']"));
      setHovered(isInteractive);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, cursorX, cursorY, visible]);

  if (!enabled || !visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#D8B878]/65 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          borderColor: hovered
            ? "rgba(232, 163, 181, 0.9)"
            : "rgba(216, 184, 120, 0.55)",
          backgroundColor: hovered
            ? "rgba(232, 163, 181, 0.08)"
            : "rgba(216, 184, 120, 0.02)",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8A3B5] shadow-[0_0_10px_rgba(232,163,181,0.9)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
        }}
      />
    </div>
  );
}
