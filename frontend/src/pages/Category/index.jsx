import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import useCategories from "../../hooks/useCategories";
import useTitle from "../../hooks/useTitle";
import AnimatedText from "../../components/AnimatedText";
import { ScreenContext } from "../../contexts/screenContext";
import {motion as m} from "framer-motion"

export default function Category() {
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Categories || Elegant Apparels");

  const mobileScreen = useContext(ScreenContext);
  const categories = useCategories();

  return categories.length === 0 ? (
    <Loader />
  ) : (
    <PageFadeTransitionContainer className="text-center pb-10 min-h-100vh mt-16">
    <div className="pseudo mb-4 md:mb-8"></div>
      <AnimatedText
        className="text-2xl font-pen md:text-4xl font-bold text-cyan-900"
        text="What are you looking for?"
        direction="y"
        size={mobileScreen ? "" : "large"}
        align="center"
        delay={0.5}
      />

      <div className="flex flex-wrap justify-around items-center gap-8 mt-8">
        {categories.map((category) => (
          <Link
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
            key={category.category_name}
            to={`/products?category=${JSON.stringify({
              category_id: category.category_id,
              category_name: category.category_name,
            })}`}
            state={{ category }}
            className="w-11/12 md:w-1/4"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                backgroundImage: `url(${category.category_image})`,
              }}
              className="outline bg-no-repeat bg-center bg-cover outline-4 outline-cyan-900 outline-offset-4 bg-cyan-900 w-full py-16 relative"
            >
              <div className="bg-black bg-opacity-70 py-6 px-8 inline-block backdrop-blur-sm">
                <span className="text-white font-medium text-xl">
                  {category.category_name}
                </span>
              </div>
            </m.div>
          </Link>
        ))}
      </div>
    </PageFadeTransitionContainer>
  );
}
