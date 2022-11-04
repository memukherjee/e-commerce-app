import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

const MouseOverLinkContext = createContext();
const MouseOverNavItemContext = createContext();
const ScrollContext = createContext();
const ScreenContext = createContext();

function App() {
  const [mouseOverNavItem, setMouseOverNavItem] = useState(false);
  const [mouseOverLink, setMouseOverLink] = useState(false);
  const [scroll, setScroll] = useState(false);

  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    // Scrolling
    const changeNavbarColor = () => {
      if (window.scrollY >= 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);

    // Screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <ScreenContext.Provider value={mobileScreen}>
        <ScrollContext.Provider value={scroll}>
          <MouseOverLinkContext.Provider
            value={{ mouseOverLink, setMouseOverLink }}
          >
            <MouseOverNavItemContext.Provider
              value={{ mouseOverNavItem, setMouseOverNavItem }}
            >
              <Cursor />
              <Navbar />
            </MouseOverNavItemContext.Provider>
            <AnimatedRoutes />
            <Footer />
          </MouseOverLinkContext.Provider>
        </ScrollContext.Provider>
      </ScreenContext.Provider>
    </Router>
  );
}
export {
  MouseOverLinkContext,
  MouseOverNavItemContext,
  ScrollContext,
  ScreenContext,
};
export default App;
