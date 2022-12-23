import { createContext, useEffect, useState } from "react";

export const ScrollContext = createContext({
  scroll: false,
});

const ScrollProvider = ({ children }) => {
  const [scroll, setScroll] = useState(false);

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
    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
  );
};

export default ScrollProvider;
