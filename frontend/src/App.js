import { createContext, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const Auth = lazy(() => import("./pages/Auth"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/auth"
                element={
                  <Suspense fallback={<Loader />}>
                    <Auth />
                  </Suspense>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={<Loader />}>
                    <ContactUs />
                  </Suspense>
                }
              />
              <Route
                path="/product/:pid"
                element={
                  <Suspense fallback={<Loader />}>
                    <Product />
                  </Suspense>
                }
              />
              <Route
                path="/products/:category"
                element={
                  <Suspense fallback={<Loader />}>
                    <Products />
                  </Suspense>
                }
              />
            </Routes>
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
