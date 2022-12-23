import { createContext, useState } from "react";

export const MouseOverLinkContext = createContext();

const MouseOverLinkProvider = ({ children }) => {
  const [mouseOverLink, setMouseOverLink] = useState(false);

  return (
    <MouseOverLinkContext.Provider value={{ mouseOverLink, setMouseOverLink }}>
      {children}
    </MouseOverLinkContext.Provider>
  );
};

export default MouseOverLinkProvider;
