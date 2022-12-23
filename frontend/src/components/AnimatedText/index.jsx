import { motion as m } from "framer-motion";

export default function AnimatedText({ text, align, direction, size, className }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
    transition: { delay: 0.5 },
  };

  const child = {
    visible:
      direction === "y"
        ? {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          }
        : {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
    hidden:
      direction === "y"
        ? {
            opacity: 0,
            y: -20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          }
        : {
            opacity: 0,
            x: -20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
    transition: { duration: 0.5, delay: 0.5 },
  };
  return (
    <m.div
      style={align === "center" ? { justifyContent: "center" } : null}
      className="flex flex-wrap items-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <m.span
          variants={child}
          style={
            size === "large" ? { marginRight: "20px" } : { marginRight: "5px" }
          }
          className={className}
          key={index}
        >
          {word}
        </m.span>
      ))}
    </m.div>
  );
}
