import React, { useEffect } from "react";
import DividerLine from "../../components/divider-line";
import Features from "../../components/Features";
import Header from "../../components/Header/Header";
import Partners from "../../components/Partners";
import Trending from "../../components/Trending";

import features from "../../utils/features";

export default function Home() {
  useEffect(() => {
    document.title = "Home || Oracle Couture";
  }, []);

  return (
    <>
      <Header />
      <Trending />
      <DividerLine />
      <Features features={features}/>
      <DividerLine />
      <Partners />

    </>
  );
}
