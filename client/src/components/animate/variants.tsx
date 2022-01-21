export const varWrapEnter = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export const varBounceIn = {
  animate: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: {
      duration: 0.72,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    scale: [0.9, 1.1, 0.3],
    opacity: [1, 1, 0],
  },
};
