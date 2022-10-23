import React, { useContext, useEffect, useState } from "react";
import { MouseOverNavItemContext, ScreenContext, ScrollContext } from "../../App";

export default function Navbar() {
  const { setMouseOverNavItem } = useContext(MouseOverNavItemContext);
  const [navOpen, setNavOpen] = useState(false);
  const mobileScreen = useContext(ScreenContext);

  const scroll = useContext(ScrollContext);

  const collapsableNavStyles = {
    display: navOpen ? "block" : "none",
    backgroundColor: navOpen ? "rgba(0, 0, 0, 1)" : "initial",
    transform: navOpen ? "translateY(0)" : "translateY(-100%)",
    transition: "all 0.5s ease",
    position: "absolute",
    height: "100vh",
    top: 0,
    left: 0
  };

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "initial";
  }, [navOpen]);

  return (
    <nav
      style={
        scroll || navOpen
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "#fff",
              backdropFilter: "blur(3px)",
            }
          : { backgroundColor: "transparent" }
      }
      className="transition-colors duration-500 fixed top-0 w-full z-20"
    >
      <div className="flex justify-between items-center max-w-1200 mx-auto">
        <a
          className="nav-brand px-2 flex align-middle gap-x-3 text-xl md:text-2xl"
          href="/"
        >
          <span className="brand-logo flex align-middle">
            <i className="fa-solid fa-hat-cowboy-side"></i>
          </span>
          <span className="brand-name font-pen whitespace-nowrap font-semibold">
            Oracle Couture
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm rounded-lg bg-transparent md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-8 h-8"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          style={mobileScreen ? collapsableNavStyles : {}}
          className="hidden overflow-hidden w-full md:block md:w-auto"
        >
          <ul className="nav-items relative h-full flex flex-col md:flex-row justify-evenly md:justify-center items-center md:gap-x-5 text-xl md:text-lg">
            <span
              onClick={() => setNavOpen(false)}
              className="cross-btn absolute md:hidden top-10 right-10 font-normal focus:text-red-500"
            >
              X
            </span>
            <li
              className="nav-item flex align-middle px-4"
              onMouseOver={() => setMouseOverNavItem(true)}
              onMouseLeave={() => setMouseOverNavItem(false)}
            >
              <a
                className="my-auto md:hover:text-white transition-all"
                href="/"
              >
                Home
              </a>
            </li>
            <li
              className="nav-item flex align-middle px-4"
              onMouseOver={() => setMouseOverNavItem(true)}
              onMouseLeave={() => setMouseOverNavItem(false)}
            >
              <a
                className="my-auto md:hover:text-white transition-all"
                href="/category"
              >
                Category
              </a>
            </li>
            <li
              className="nav-item flex align-middle px-4"
              onMouseOver={() => setMouseOverNavItem(true)}
              onMouseLeave={() => setMouseOverNavItem(false)}
            >
              <a
                className="my-auto md:hover:text-white transition-all"
                href="/about"
              >
                About
              </a>
            </li>
            <li
              className="nav-item flex align-middle px-4"
              onMouseOver={() => setMouseOverNavItem(true)}
              onMouseLeave={() => setMouseOverNavItem(false)}
            >
              <a
                className="my-auto md:hover:text-white transition-all"
                href="/auth"
              >
                Sign Up
              </a>
            </li>
            <li
              className="nav-item flex align-middle px-4"
              onMouseOver={() => setMouseOverNavItem(true)}
              onMouseLeave={() => setMouseOverNavItem(false)}
            >
              <a
                className="my-auto md:hover:text-white transition-all"
                href="/"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
