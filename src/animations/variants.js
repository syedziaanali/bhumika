export const LUXURY_EASE = [0.22, 1, 0.36, 1];

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    filter: "blur(6px)",
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
    },
  },
};

export const fadeSlideUp = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: LUXURY_EASE,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (staggerChildren = 0.1, delayChildren = 0.15) => ({
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  }),
};

export const wordRevealContainer = {
  hidden: { opacity: 0 },
  visible: (delayChildren = 0.1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren,
    },
  }),
};

export const wordRevealChild = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: LUXURY_EASE,
    },
  },
};

export const cardStaggerItem = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: LUXURY_EASE,
    },
  },
};
