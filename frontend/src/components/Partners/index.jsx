import { motion, useScroll, useTransform } from "framer-motion";

export default function Partners() {
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0.7, 1], [-350, 0]);
  const x2 = useTransform(scrollYProgress, [0.7, 1], [400, -100]);
  const x3 = useTransform(scrollYProgress, [0.7, 1], [-450, 0]);

  const companyNames1 = "LV Gucci Versace";
  const companyNames2 = "Dior Prada Chanel";
  const companyNames3 = "Adidas Nike Fendi";
  
  return (
    <div>
      <div className="brands pt-12 pb-8 text-center bg-gray-200 flex flex-col justify-center items-center relative">
        <h1 className="text-xl font-semibold underline underline-offset-8 mx-auto mb-4 text-gray-700">
          Our Partners
        </h1>
        <div className="w-full flex flex-col justify-between items-center text-[150px] font-bold whitespace-nowrap overflow-x-hidden leading-tight">
          <motion.span
            style={{
              x: x1,
              transitionTimingFunction: "cubic-bezier(0.165, 0.04, 0.44, 1)",
            }}
            className="block transition-all duration-[1000ms] text-cyan-900"
          >
            {companyNames1}
          </motion.span>
          <motion.span
            style={{
              x: x2,
              transitionTimingFunction: "cubic-bezier(0.165, 0.04, 0.44, 1)",
            }}
            className="block transition-all duration-[1000ms] text-gray-700"
          >
            {companyNames2}
          </motion.span>
          <motion.span
            style={{
              x: x3,
              transitionTimingFunction: "cubic-bezier(0.165, 0.04, 0.44, 1)",
            }}
            className="block transition-all duration-[1000ms] text-orange-400"
          >
            {companyNames3}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
