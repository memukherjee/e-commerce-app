import { createContext, useState } from "react";

export const MouseOverNavItemContext = createContext();

const MouseOverNavItemProvider = ({ children }) => {
  const [mouseOverNavItem, setMouseOverNavItem] = useState(false);

  return (
    <MouseOverNavItemContext.Provider
      value={{ mouseOverNavItem, setMouseOverNavItem }}
    >
      {children}
    </MouseOverNavItemContext.Provider>
  );
};

export default MouseOverNavItemProvider;
