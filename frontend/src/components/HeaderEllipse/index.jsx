import { motion } from "framer-motion";

export default function HeaderEllipse({ className }) {
  const initialPath = {
    pathLength: 0,
    strokeWidth: 0,
  };
  const animatePath = {
    pathLength: 1,
    strokeWidth: 5,
  };
  const pathTransition = {
    delay: 0.5,
    duration: 3,
    ease: "easeInOut",
  };
  return (
    <div className={className}>
      <motion.svg height="140" width="500" transform="rotate(-15)">
        <motion.ellipse
          initial={initialPath}
          animate={animatePath}
          transition={pathTransition}
          cx="250"
          cy="80"
          rx="230"
          ry="50"
          fill="transparent"
          stroke="rgba(251 146 60/1)"
          strokeWidth="5"
        />
        Sorry, your browser does not support inline SVG.
      </motion.svg>
    </div>
  );
}
