import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CENTRAL_THEME, NO_BUTTON_MESSAGES } from "../data/storyData";
import {
  LUXURY_EASE,
  wordRevealContainer,
  wordRevealChild,
} from "../animations/variants";

export default function QuestionPage({ onYesClick }) {
  const prefersReducedMotion = useReducedMotion();
  const yesBtnRef = useRef(null);
  const noBtnRef = useRef(null);
  const noSlotRef = useRef(null);

  const [hasEscaped, setHasEscaped] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [funnyMsg, setFunnyMsg] = useState(null);
  const [yesClicked, setYesClicked] = useState(false);

  const msgTimerRef = useRef(null);
  const lastEscapeTimeRef = useRef(0);

  // Clean up message timer on unmount
  useEffect(() => {
    return () => {
      if (msgTimerRef.current) window.clearTimeout(msgTimerRef.current);
    };
  }, []);

  const showRandomFunnyMessage = useCallback(
    (targetX, targetY, btnWidth) => {
      const nextMsg =
        NO_BUTTON_MESSAGES[
          Math.floor(Math.random() * NO_BUTTON_MESSAGES.length)
        ];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Clamp bubble X and Y so it stays safely inside any mobile or desktop screen
      const bubbleWidth = Math.min(220, Math.max(140, vw - 32));
      const centeredX = targetX + btnWidth / 2 - bubbleWidth / 2;
      const clampedX = Math.max(12, Math.min(vw - bubbleWidth - 12, centeredX));
      
      // Calculate Y so bubble never clips at top or bottom edge of phone
      let bubbleY;
      if (targetY > vh - 110) {
        bubbleY = targetY - 46;
      } else if (targetY < 100) {
        bubbleY = targetY + 54;
      } else {
        bubbleY = targetY - 44;
      }

      setFunnyMsg({
        id: Date.now(),
        text: nextMsg,
        x: clampedX,
        y: bubbleY,
        width: bubbleWidth,
      });

      if (msgTimerRef.current) window.clearTimeout(msgTimerRef.current);
      msgTimerRef.current = window.setTimeout(() => {
        setFunnyMsg(null);
      }, 1700);
    },
    []
  );

  const getSafeEscapePosition = useCallback((pointerX, pointerY) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const noRect = noBtnRef.current?.getBoundingClientRect();
    const btnW = noRect?.width || (vw < 400 ? 110 : 132);
    const btnH = noRect?.height || (vw < 400 ? 46 : 52);

    const yesRect = yesBtnRef.current?.getBoundingClientRect();

    const marginX = vw < 420 ? 12 : 24;
    const topSafe = 72; // Stay below top brand bar on mobile
    const bottomSafe = 85; // Stay above bottom music button

    const minX = marginX;
    const maxX = Math.max(minX + 10, vw - btnW - marginX);
    const minY = topSafe;
    const maxY = Math.max(minY + 10, vh - btnH - bottomSafe);

    const overlapsYes = (x, y) => {
      if (!yesRect) return false;
      const pad = vw < 400 ? 18 : 26;
      return !(
        x + btnW + pad < yesRect.left ||
        x - pad > yesRect.right ||
        y + btnH + pad < yesRect.top ||
        y - pad > yesRect.bottom
      );
    };

    const nearPointer = (x, y) => {
      if (pointerX == null || pointerY == null) return false;
      const cx = x + btnW / 2;
      const cy = y + btnH / 2;
      const dist = Math.hypot(cx - pointerX, cy - pointerY);
      return dist < (vw < 500 ? 95 : 145);
    };

    let bestCandidate = null;
    let bestScore = -1;

    for (let i = 0; i < 48; i++) {
      const rx = minX + Math.random() * (maxX - minX);
      const ry = minY + Math.random() * (maxY - minY);

      if (overlapsYes(rx, ry)) continue;
      if (nearPointer(rx, ry) && i < 36) continue;

      const distFromPointer =
        pointerX != null
          ? Math.hypot(rx + btnW / 2 - pointerX, ry + btnH / 2 - pointerY)
          : 200;

      if (distFromPointer > bestScore) {
        bestScore = distFromPointer;
        bestCandidate = { x: rx, y: ry, w: btnW };
      }
    }

    if (bestCandidate) return bestCandidate;

    // Deterministic fallback away from YES button
    const fallbackY =
      yesRect && yesRect.top > vh * 0.45 ? minY + 12 : maxY - 12;
    const fallbackX =
      yesRect && yesRect.left < vw * 0.5 ? maxX - 8 : minX + 8;
    return { x: fallbackX, y: fallbackY, w: btnW };
  }, []);

  const triggerEscape = useCallback(
    (pointerX, pointerY) => {
      if (yesClicked) return;
      const now = Date.now();
      if (now - lastEscapeTimeRef.current < 130) return;
      lastEscapeTimeRef.current = now;

      // Lock YES position & capture initial NO position cleanly on first escape
      if (!hasEscaped && noBtnRef.current) {
        const rect = noBtnRef.current.getBoundingClientRect();
        setNoPos({ x: rect.left, y: rect.top });
        setHasEscaped(true);
      }

      const next = getSafeEscapePosition(pointerX, pointerY);
      setNoPos({ x: next.x, y: next.y });
      setEscapeCount((c) => c + 1);
      showRandomFunnyMessage(next.x, next.y, next.w);
    },
    [yesClicked, hasEscaped, getSafeEscapePosition, showRandomFunnyMessage]
  );

  // Desktop cursor proximity detector so NO escapes smoothly as cursor approaches
  useEffect(() => {
    if (yesClicked) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const btnEl = noBtnRef.current;
      if (!btnEl) return;
      const rect = btnEl.getBoundingClientRect();
      const buffer = 46;
      const withinBuffer =
        e.clientX >= rect.left - buffer &&
        e.clientX <= rect.right + buffer &&
        e.clientY >= rect.top - buffer &&
        e.clientY <= rect.bottom + buffer;

      if (withinBuffer) {
        triggerEscape(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [yesClicked, triggerEscape]);

  // Keep escaped NO button inside viewport on window resize / orientation change
  useEffect(() => {
    if (!hasEscaped) return;
    const handleResize = () => {
      const next = getSafeEscapePosition(null, null);
      setNoPos({ x: next.x, y: next.y });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasEscaped, getSafeEscapePosition]);

  const handleYesPress = () => {
    if (yesClicked) return;
    setYesClicked(true);
    setFunnyMsg(null);
    onYesClick();
  };

  const titleWords = ["Do", "You", "Love", "Me?"];

  return (
    <section
      aria-label="Do You Love Me"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-3.5 xs:px-5 pt-20 pb-20 sm:pt-24 sm:pb-24 sm:px-8 overflow-hidden"
    >
      {/* Subtle central cinematic halo */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] aspect-square rounded-full blur-[90px] sm:blur-[110px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(232,163,181,0.45) 0%, rgba(59,16,35,0) 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: LUXURY_EASE }}
        className="relative z-10 w-full max-w-2xl mx-auto text-center luxury-glass rounded-2xl sm:rounded-3xl px-4 py-8 xs:px-6 xs:py-10 sm:px-12 sm:py-16"
      >
        {/* Decorative top gold hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: LUXURY_EASE }}
          className="mx-auto mb-4 sm:mb-6 h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-[#D8B878] to-transparent"
        />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.24em" }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium uppercase text-[#D8B878] tracking-[0.2em] sm:tracking-[0.24em] mb-3 sm:mb-4"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8A3B5]" />
          <span>HEY BHUMIKA ❤️</span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8A3B5]" />
        </motion.div>

        {/* Main Question — word-by-word reveal */}
        <motion.h1
          variants={wordRevealContainer}
          initial="hidden"
          animate="visible"
          className="font-serif-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#FFF4F0] leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-5"
        >
          {titleWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordRevealChild}
              className={`inline-block mr-[0.22em] last:mr-0 ${
                word === "Love" ? "italic text-rose-gold-gradient" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Central theme whisper */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: LUXURY_EASE }}
          className="font-serif-display italic text-xs xs:text-sm sm:text-base md:text-lg text-[#E8A3B5]/90 max-w-md mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          &ldquo;{CENTRAL_THEME}&rdquo;
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7, ease: LUXURY_EASE }}
          className="relative flex flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-7"
        >
          {/* YES BUTTON — Strictly fixed in original position */}
          <motion.button
            ref={yesBtnRef}
            type="button"
            onClick={handleYesPress}
            aria-label="Yes, I love you"
            animate={
              yesClicked
                ? { scale: 1.35, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              yesClicked
                ? { duration: 0.45, ease: LUXURY_EASE }
                : { duration: 0.3 }
            }
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 38px rgba(232, 163, 181, 0.72)",
            }}
            whileTap={{ scale: 0.94 }}
            className="relative z-20 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-6 xs:px-8 sm:px-10 py-3 sm:py-4 text-xs xs:text-sm sm:text-base font-semibold tracking-wider text-[#210B18] bg-gradient-to-r from-[#FFF4F0] via-[#E8A3B5] to-[#D8B878] border border-[#FFF4F0]/60 shadow-[0_10px_35px_rgba(232,163,181,0.45)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B878] active:scale-95 transition-transform"
          >
            {/* Soft Heartbeat Glow Ring */}
            {!prefersReducedMotion && !yesClicked && (
              <motion.span
                aria-hidden="true"
                animate={{
                  scale: [1, 1.12, 1, 1.08, 1],
                  opacity: [0.55, 0.95, 0.55, 0.85, 0.55],
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -inset-1 rounded-full border border-[#E8A3B5]/70 shadow-[0_0_24px_rgba(232,163,181,0.6)]"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1 sm:gap-1.5">
              <span>YES</span>
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReducedMotion || yesClicked
                    ? undefined
                    : { scale: [1, 1.24, 1, 1.18, 1] }
                }
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                ❤️
              </motion.span>
            </span>
          </motion.button>

          {/* Placeholder slot so YES button NEVER shifts horizontally when NO escapes */}
          <div
            ref={noSlotRef}
            className="relative inline-flex items-center justify-center min-w-[105px] xs:min-w-[122px] sm:min-w-[136px] min-h-[44px] xs:min-h-[50px] sm:min-h-[56px]"
          >
            <motion.button
              ref={noBtnRef}
              type="button"
              aria-label="No button"
              onMouseEnter={(e) => triggerEscape(e.clientX, e.clientY)}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerEscape(e.clientX, e.clientY);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const touch = e.touches?.[0];
                triggerEscape(touch?.clientX, touch?.clientY);
              }}
              onFocus={() => triggerEscape(null, null)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerEscape(e.clientX, e.clientY);
              }}
              style={
                hasEscaped
                  ? {
                      position: "fixed",
                      left: 0,
                      top: 0,
                      zIndex: 35,
                    }
                  : undefined
              }
              animate={
                hasEscaped
                  ? {
                      x: noPos.x,
                      y: noPos.y,
                      rotate: escapeCount % 2 === 0 ? -4 : 4,
                    }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 22,
                mass: 0.75,
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 xs:px-7 sm:px-8 py-3 sm:py-4 text-xs xs:text-sm sm:text-base font-medium tracking-wider text-[#FFF4F0]/85 bg-[#3B1023]/75 backdrop-blur-md border border-[#D8B878]/30 shadow-[0_8px_24px_rgba(12,3,8,0.5)] cursor-pointer select-none touch-none active:scale-95"
            >
              <span>NO 🙈</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Subtle interactive hint after 2+ escapes */}
        <AnimatePresence>
          {escapeCount >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 sm:mt-8 text-[11px] xs:text-xs sm:text-sm text-[#D8B878]/85 tracking-wide px-2"
            >
              Hint: There&apos;s really only one answer here, Bhumika ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Playful Floating Escape Message */}
      <AnimatePresence>
        {funnyMsg && (
          <motion.div
            key={funnyMsg.id}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            style={{
              position: "fixed",
              left: funnyMsg.x,
              top: funnyMsg.y,
              width: funnyMsg.width,
              zIndex: 45,
            }}
            className="pointer-events-none text-center"
          >
            <span className="inline-block rounded-full bg-[#3B1023]/95 border border-[#D8B878]/50 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#FFF4F0] shadow-[0_10px_28px_rgba(15,3,10,0.7)]">
              {funnyMsg.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
