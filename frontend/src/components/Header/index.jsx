import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import { ScreenContext } from "../../contexts/screenContext";
import AnimatedText from "../AnimatedText";
import Banner from "../Banner";

export default function Header() {
  const [globalSearchValue, setGlobalSearchValue] = useState("");

  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  const mobileScreen = useContext(ScreenContext);

  const handleGlobalSearch = () => {
    console.log(globalSearchValue);
  };

  return (
    <header className="pb-14 relative">
      <Banner />
      <div className="searchbar absolute top-24 md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 text-center z-10">
        <input
          className="outline-none border-0 pl-3 pr-8 py-3 md:pl-5 md:pr-14 md:py-4 shadow-md shadow-gray-900 rounded-sm w-full md:max-w-750 mx-auto text-lg md:text-xl overflow-hidden"
          type="text"
          placeholder="Search for your favorite products"
          name="search"
          id="global-search"
          autoComplete="off"
          value={globalSearchValue}
          onChange={(e) => setGlobalSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGlobalSearch();
            }
          }}
        />
        <i
          className="fa-solid fa-magnifying-glass text-lg md:text-xl -ml-7 md:-ml-12 text-gray-400 z-10"
          onClick={handleGlobalSearch}
        ></i>
      </div>
      <div className="-mt-20 md:-mt-32 flex flex-col md:flex-row items-center md:items-start justify-between md:px-32 w-full">
        <div className="main-text text-center md:text-left w-11/12 md:max-w-1/2 mb-8 md:mb-0">
          <h1
            style={
              mobileScreen
                ? { textShadow: "2px 2px #fff" }
                : { mixBlendMode: "difference" }
            }
            className="text-3xl w-full md:text-9xl font-black m-0 inline z-10 text-cyan-900"
          >
            <AnimatedText className="last:text-orange-400 md:last:text-inherit" text="Wear The Best." direction="y" size="large" align={mobileScreen?"center":""} />
          </h1>
          <span className="font-light text-lg mt-8 md:mt-0">
            <AnimatedText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo
            eaque cupiditate in asperiores tempora beatae inventore autem, eius
            vitae libero, ullam placeat soluta. Temporibus provident cupiditate
            atque." align={mobileScreen?"center":""}/>
            
          </span>
        </div>
        <div className="text-white flex flex-row md:flex-col w-fit z-10">
          <Link
            className="bg-cyan-900 rounded-l-md md:rounded-none px-5 py-7 flex justify-between items-center"
            to="/categories"
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
          >
            <span>Shop Now</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
          <Link
            className="bg-black rounded-r-md md:rounded-none px-5 py-7"
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
