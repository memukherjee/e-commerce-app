import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollContext } from "../../contexts/scrollContext";
import { ScreenContext } from "../../contexts/screenContext";
import { UserContext } from "../../contexts/userContext";
import logo from "./images/brand-logo.png";
import NavItem from "../NavItem";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const mobileScreen = useContext(ScreenContext);
  const { user } = useContext(UserContext);

  const scroll = useContext(ScrollContext);

  const collapsableNavStyles = {
    display: navOpen ? "block" : "none",
    backgroundColor: navOpen ? "rgba(0, 0, 0, 1)" : "initial",
    transform: navOpen ? "translateY(0)" : "translateY(-100%)",
    transition: "all 0.5s ease",
    position: "absolute",
    height: "100vh",
    top: 0,
    left: 0,
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
        <Link
          className="nav-brand px-2 flex items-center gap-x-3 text-xl md:text-2xl"
          to="/"
        >
          <div className="brand-logo h-10">
            <img
              className="w-full h-full"
              style={scroll ? { filter: "invert(0)" } : { filter: "invert(1)" }}
              src={logo}
              alt="brand logo"
            />
          </div>
          <span className="brand-name font-pen whitespace-nowrap font-semibold">
            Elegant Apparels
          </span>
        </Link>
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
              className="cross-btn cursor-pointer absolute md:hidden top-10 right-10 font-normal focus:text-red-500"
            >
              X
            </span>
            <NavItem to="/" title="Home" setNavOpen={setNavOpen} />
            <NavItem
              to="/categories"
              title="Categories"
              setNavOpen={setNavOpen}
            />
            <NavItem to="/about" title="About" setNavOpen={setNavOpen} />
            {user ? (
              <NavItem to="/account" title="Account" setNavOpen={setNavOpen} />
            ) : (
              <NavItem to="/auth" title="Sign Up" setNavOpen={setNavOpen} />
            )}
            {
              user?
            <NavItem
              to="/cart"
              title="My Cart"
              setNavOpen={setNavOpen}
            />
            :
            <NavItem
              to="/contact-us"
              title="Contact Us"
              setNavOpen={setNavOpen}
            />
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
