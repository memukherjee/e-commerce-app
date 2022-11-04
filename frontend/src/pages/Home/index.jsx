import { useEffect } from "react";
import { motion as m } from "framer-motion";
import DividerLine from "../../components/divider-line";
import Features from "../../components/Features";
import Header from "../../components/Header";
import Partners from "../../components/Partners";
import Trending from "../../components/Trending";

import features from "../../utils/features";

export default function Home() {
  useEffect(() => {
    document.title = "Home || Oracle Couture";
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <Trending />
      <DividerLine />
      <Features features={features} />
      <DividerLine />
      <Partners />
    </m.div>
  );
}
