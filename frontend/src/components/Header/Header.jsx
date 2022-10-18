import React, { useContext, useState } from "react";
import { MouseOverLinkContext } from "../../App";
import Banner from "../Banner";

export default function Header() {
  const [globalSearchValue, setGlobalSearchValue] = useState("");


  const { setMouseOverLink } = useContext(MouseOverLinkContext)


  const handleGlobalSearch = () => {
    console.log(globalSearchValue);
  };

  return (
    <header className="pb-14 relative">
      <Banner />
      <div className="searchbar absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full text-center">
        <input
          className="outline-none border-0 px-5 pr-14 py-4 shadow-md shadow-gray-900 rounded-sm w-full max-w-1/2 mx-auto text-xl"
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
          className="fa-solid fa-magnifying-glass text-xl -ml-12 text-gray-400 z-10"
          onClick={handleGlobalSearch}
        ></i>
      </div>
      <div className="-mt-32 flex justify-between px-32">
        <div className="main-text max-w-1/2">
          <h1
            style={{ mixBlendMode: "difference" }}
            className="text-5xl md:text-9xl font-black m-0 inline z-10 text-cyan-900"
          >
            Wear the best.
          </h1>
          <p className="font-light text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illo
            eaque cupiditate in asperiores tempora beatae inventore autem, eius
            vitae libero, ullam placeat soluta. Temporibus provident cupiditate
            atque. Deserunt, repellendus?
          </p>
        </div>
        <div className="text-white flex flex-col w-fit z-10">
          <a
            className="bg-cyan-900 px-5 py-7 flex justify-between align-middle"
            href="/category"
            onMouseOver={() => (setMouseOverLink(true))}
            onMouseOut={() => (setMouseOverLink(false))}
          >
            <span>Shop Now</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a
            className="bg-black px-5 py-7"
            href="/about"
            onMouseOver={() => (setMouseOverLink(true))}
            onMouseOut={() => (setMouseOverLink(false))}
          >
            <span>Know about us </span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
