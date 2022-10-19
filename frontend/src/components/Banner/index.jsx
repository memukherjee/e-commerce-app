import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import banner1 from "./images/banner1-sm.jpg";
import banner2 from "./images/banner2-sm.jpg";
import banner3 from "./images/banner3-sm.jpg";

export default function Banner() {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, index]);

  return (
    <div className="max-h-70vh w-full overflow-hidden banners flex">
      <AnimatePresence>
        <motion.img
          variants={variants}
          animate="animate"
          initial="initial"
          exit="exit"
          transition={{
            opacity: { duration: 0.5 },
          }}
          className="w-full h-full object-cover"
          src={banners[index]}
          key={banners[index]}
          alt="Banner"
        />
      </AnimatePresence>
    </div>
  );
}
