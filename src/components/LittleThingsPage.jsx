import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { EXPERIENCE_CARDS } from "../data/storyData";
import {
  LUXURY_EASE,
  cardStaggerItem,
  staggerContainer,
} from "../animations/variants";

function TiltExperienceCard({ card }) {
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      variants={cardStaggerItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.985 }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl luxury-glass overflow-hidden transition-shadow duration-500 hover:border-[#D8B878]/60 hover:shadow-[0_24px_60px_rgba(232,163,181,0.22)]"
      data-cursor-hover="true"
    >
      {/* Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#3B1023] via-[#2A0B1B] to-[#1A0510]">
        {!imgError ? (
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#4B152D] via-[#3B1023] to-[#210B18]">
            <Sparkles className="w-8 h-8 text-[#D8B878]/60" />
          </div>
        )}

        {/* Cinematic Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#210B18] via-[#210B18]/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75"
          aria-hidden="true"
        />

        {/* Card Index Pill */}
        <span className="absolute top-3.5 left-3.5 rounded-full bg-[#210B18]/75 backdrop-blur-md border border-[#D8B878]/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#D8B878]">
          {card.code}
        </span>
      </div>

      {/* Text Content */}
      <div className="relative flex-1 p-4 xs:p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-serif-display text-base xs:text-lg sm:text-xl font-semibold text-[#FFF4F0] tracking-wide mb-1.5 sm:mb-2 group-hover:text-[#E8A3B5] transition-colors">
            {card.title}
          </h3>
          <p className="text-xs xs:text-sm sm:text-[15px] text-[#FFF4F0]/80 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Subtle bottom gold shimmer line */}
        <div className="mt-4 sm:mt-5 h-[1px] w-12 sm:w-14 bg-gradient-to-r from-[#D8B878]/70 to-transparent transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.article>
  );
}

export default function LittleThingsPage({ onNext }) {
  return (
    <section
      aria-label="Little Things I Want To Do With You"
      className="relative min-h-[100dvh] w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: LUXURY_EASE }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#D8B878] mb-2 sm:mb-3">
            When We Finally Meet
          </span>
          <h2 className="font-serif-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FFF4F0] tracking-tight leading-tight mb-3 sm:mb-4">
            Little Things I Want To Do{" "}
            <span className="italic text-rose-gold-gradient">With You</span>
          </h2>
          <p className="font-serif-display italic text-xs xs:text-sm sm:text-base text-[#E8A3B5]/85 max-w-md mx-auto px-2">
            Simple moments I&apos;m genuinely looking forward to sharing with you, Bhumika.
          </p>
          <div className="mx-auto mt-4 sm:mt-6 h-[1px] w-20 sm:w-28 bg-gradient-to-r from-transparent via-[#D8B878]/70 to-transparent" />
        </motion.div>

        {/* 6 Experience Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7"
          style={{ perspective: "1400px" }}
        >
          {EXPERIENCE_CARDS.map((card) => (
            <TiltExperienceCard key={card.id} card={card} />
          ))}
        </motion.div>

        {/* Next Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
          className="mt-14 sm:mt-18 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={onNext}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 32px rgba(232,163,181,0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FFF4F0] via-[#E8A3B5] to-[#D8B878] px-8 py-3.5 text-sm sm:text-base font-semibold text-[#210B18] shadow-[0_12px_32px_rgba(15,3,10,0.65)] cursor-pointer"
          >
            <span>One Last Surprise</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
