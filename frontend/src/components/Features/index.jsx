import { motion } from "framer-motion";
import React from "react";

export default function Features({ features }) {
  return (
    <div className="features w-full flex flex-col items-center justify-center">
      <div className="slides flex justify-evenly items-center w-full flex-wrap">
        {features.map((feature, index) => (
          <div
            className="slide max-w-200 min-h-200 mb-4 md:mb-0 md:w-1/5 text-center border-2 p-6 flex justify-center items-center flex-col"
            key={index}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="slide-content"
            >
              <div
                style={{
                  backgroundColor: feature.color,
                  color: feature.textColor,
                }}
                className="slide-icon text-xl w-12 h-12 flex justify-center items-center mx-auto mb-2 rounded-full"
              >
                <i className={feature.icon}></i>
              </div>
              <div className="slide-text">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="font-normal text-base">{feature.description}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
