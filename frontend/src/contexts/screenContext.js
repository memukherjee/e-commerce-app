import { createContext, useEffect, useState } from "react";

export const ScreenContext = createContext({
  mobileScreen: false,
});

const ScreenProvider = ({ children }) => {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
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
    <ScreenContext.Provider value={ mobileScreen }>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;