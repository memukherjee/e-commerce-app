import { motion } from "framer-motion";

export default function NavPopup({ text }) {
  return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{
          delay: 0.25,
          duration: 0.2,
          type: "spring",
          damping: 10,
          mass: 0.75,
          stiffness: 100,
        }}
        className="bg-red-500 text-white w-4 h-4 text-center rounded-full text-xs font-normal mb-4"
      >
        {text}
      </motion.span>
  );
}
