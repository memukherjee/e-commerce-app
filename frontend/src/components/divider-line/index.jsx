import React from "react";
import { motion } from "framer-motion";

export default function DividerLine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <hr className="border-cyan-900 border-t-8 w-1/12 md:w-1/20 mx-auto border-dotted my-10" />
    </motion.div>
  );
}
