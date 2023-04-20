import DividerLine from "../../components/divider-line";
import Features from "../../components/Features";
import Header from "../../components/Header";
import Partners from "../../components/Partners";
import Trending from "../../components/Trending";

import features from "../../assets/features";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import Testimonials from "../../components/Testimonials";

export default function Home() {
  useTitle("Home || Elegant Apparels");

  return (
    <PageFadeTransitionContainer>
      <Header />
      <Trending />
      <DividerLine />
      <Features features={features} />
      <DividerLine />
      <Testimonials />
      <Partners />
    </PageFadeTransitionContainer>
  );
}
