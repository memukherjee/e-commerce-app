import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import { ScreenContext } from "../../contexts/screenContext";
import AnimatedText from "../AnimatedText";
import Banner from "../Banner";
import SearchBar from "../SearchBar";

export default function Header() {
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  const mobileScreen = useContext(ScreenContext);

  return (
    <header className="pb-14 relative">
      <Banner />
      <SearchBar />
      <div className="-mt-20 md:-mt-24 flex flex-col md:flex-row items-center md:items-start justify-between md:px-32 w-full">
        <div className="main-text text-center md:text-left w-9/12 mb-8 md:mb-0">
          <div className="text-3xl w-full md:text-[10rem] leading-none font-black m-0 inline-block z-10 text-cyan-900 md:text-black relative">
            <div
              style={
                mobileScreen
                  ? { textShadow: "2px 2px #fff" }
                  : {
                      // mixBlendMode: "difference"
                      textShadow: "-5px 5px 2px #666",
                    }
              }
            >
              <AnimatedText
                className="last:text-orange-400 md:last:text-cyan-900 z-[1]"
                text="Wear The Best."
                direction="y"
                size="large"
                align={mobileScreen ? "center" : ""}
              />
            </div>
            <span className="font-light text-gray-400 text-lg mt-8 md:mt-0 self-center max-w-[350px] md:absolute md:-bottom-5 md:right-28 leading-relaxed tracking-wide md:leading-loose md:tracking-wider">
              <AnimatedText
                text="Unleash your inner fashionista with our curated collection of trendy apparel. Elevate your style game and make heads turn with our exclusive designs, made just for you. Shop now"
                // delay={0.01}
                align={mobileScreen ? "center" : ""}
              />
            </span>
            <div className="ellipse hidden md:block absolute bottom-5 -left-5 -rotate-[15deg] w-[30rem] h-20 rounded-[50%] border-4 border-orange-400"></div>
          </div>
        </div>
        <div className="text-white text-lg md:text-xl flex flex-row md:flex-col w-fit z-10 md:w-3/12 md:mt-5">
          <Link
            className="bg-cyan-900 rounded-l-md md:rounded-none px-4 py-6 md:px-8 md:py-16 flex justify-between items-center gap-x-4"
            to="/categories"
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
          >
            <span>Shop Now</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
          <Link
            className="bg-black rounded-r-md md:rounded-none px-4 py-6 md:px-8 md:py-16 flex justify-between items-center gap-x-4"
            to="/contact-us"
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
          >
            <span>Contact Us </span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
