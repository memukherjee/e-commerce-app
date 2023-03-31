import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import AnimatedText from "../AnimatedText";

export default function AccountOptionCard({ option }) {
  const [hover, setHover] = useState(false);

  const cardStyle = hover
    ? {
        borderBottom: "4px solid",
        borderImageSource: `radial-gradient(circle at bottom right, ${option.color}, transparent 80%)`,
        borderImageSlice: 1,
      }
    : {
        borderBottom: "4px solid",
        borderImageSource: `radial-gradient(circle at bottom left, ${option.color}, transparent 80%)`,
        borderImageSlice: 1,
      };

  return (
    <Link to={option.link} className="account-option w-full md:w-32%">
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setHover(false)}
        style={cardStyle}
        className="account-option-container transition-all duration-500 flex justify-start items-center gap-5 p-4"
      >
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ color: option.color }}
          className="option-logo text-3xl"
        >
          <i className={option.icon}></i>
        </m.div>
        <div className="option-name">
          <h3 className="font-medium text-lg flex items-center justify-start gap-x-2">
            <AnimatedText text={option.name} direction="y" />
            {(option?.count > 0) && (
              <span
                style={{
                  backgroundColor: option.color,
                }}
                className="text-center text-white w-6 h-6 rounded-full"
              >
                {option?.count}
              </span>
            )}
          </h3>
          <span className="text-base text-gray-400">
            <AnimatedText text={option.description} direction="x" />
          </span>
        </div>
      </div>
    </Link>
  );
}
