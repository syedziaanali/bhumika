import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Sparkles,
  Heart,
  Feather,
  Star,
  Infinity as InfinityIcon,
  ArrowRight,
} from "lucide-react";
import { TIMELINE_EVENTS, CENTRAL_THEME } from "../data/storyData";
import { LUXURY_EASE } from "../animations/variants";

const ICON_MAP = {
  sparkles: Sparkles,
  heart: Heart,
  feather: Feather,
  star: Star,
  infinity: InfinityIcon,
};

export default function StoryTimelinePage({ onNext }) {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 70%"],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      aria-label="Our Little Story"
      className="relative min-h-[100dvh] w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: LUXURY_EASE }}
          className="text-center mb-10 sm:mb-20"
        >
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#D8B878] mb-2 sm:mb-3">
            Chapter By Chapter
          </span>
          <h2 className="font-serif-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FFF4F0] tracking-tight mb-3 sm:mb-4">
            Our Little{" "}
            <span className="italic text-rose-gold-gradient">Story</span>
          </h2>
          <p className="font-serif-display italic text-xs xs:text-sm sm:text-base md:text-lg text-[#E8A3B5]/85 max-w-lg mx-auto leading-relaxed px-2">
            &ldquo;{CENTRAL_THEME}&rdquo;
          </p>
          <div className="mx-auto mt-4 sm:mt-6 h-[1px] w-20 sm:w-28 bg-gradient-to-r from-transparent via-[#D8B878]/70 to-transparent" />
        </motion.div>

        {/* Interactive Animated Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static Base Connecting Track */}
          <div
            className="absolute left-4 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-[#FFF4F0]/10 rounded-full"
            aria-hidden="true"
          />

          {/* Scroll-Animated Glowing Champagne-Rose Line */}
          <motion.div
            style={
              prefersReducedMotion
                ? { scaleY: 1 }
                : { scaleY: lineScaleY, transformOrigin: "top" }
            }
            className="absolute left-4 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-[#E8A3B5] via-[#D8B878] to-[#E8A3B5] shadow-[0_0_16px_rgba(216,184,120,0.65)]"
            aria-hidden="true"
          />

          <div className="space-y-7 sm:space-y-14">
            {TIMELINE_EVENTS.map((event, idx) => {
              const IconComp = ICON_MAP[event.icon] || Heart;
              const isLeftDesktop = idx % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start md:items-center ${
                    isLeftDesktop ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Milestone Node Icon */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.05,
                    }}
                    className="absolute left-4 sm:left-5 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#2B0C1C] border border-[#D8B878]/70 shadow-[0_0_20px_rgba(232,163,181,0.45)]"
                  >
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { scale: [1, 1.12, 1] }
                      }
                      transition={{
                        duration: 2.8,
                        delay: idx * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconComp className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E8A3B5]" />
                    </motion.div>
                  </motion.div>

                  {/* Alternating Timeline Card */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            x: typeof window !== "undefined" && window.innerWidth < 768 ? 0 : (isLeftDesktop ? -28 : 28),
                            y: 18,
                          }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: LUXURY_EASE }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.25 },
                    }}
                    className={`w-full pl-10 xs:pl-12 sm:pl-16 md:pl-0 md:w-[calc(50%-2.75rem)] ${
                      isLeftDesktop ? "md:pr-2" : "md:pl-2"
                    }`}
                  >
                    <div className="group luxury-glass rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-7 transition-all duration-300 hover:border-[#D8B878]/55 hover:shadow-[0_18px_45px_rgba(232,163,181,0.16)]">
                      <div className="flex items-center justify-between gap-2.5 mb-2 sm:mb-3">
                        <span className="inline-flex items-center rounded-full bg-[#D8B878]/15 border border-[#D8B878]/35 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-medium tracking-[0.18em] text-[#D8B878]">
                          {event.label}
                        </span>
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-[#D8B878]/35 to-transparent" />
                      </div>

                      <h3 className="font-serif-display text-base xs:text-lg sm:text-xl font-semibold text-[#FFF4F0] tracking-wide mb-1.5 sm:mb-2.5 group-hover:text-[#E8A3B5] transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-xs xs:text-sm sm:text-base text-[#FFF4F0]/82 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={onNext}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(216,184,120,0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FFF4F0] via-[#E8A3B5] to-[#D8B878] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#210B18] shadow-[0_12px_32px_rgba(15,3,10,0.65)] cursor-pointer"
          >
            <span>Little Things With You</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
