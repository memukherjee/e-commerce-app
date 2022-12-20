import { createContext, useState } from "react";

export const MouseTransparentContext = createContext({
    mouseTransparent: false,
    setMouseTransparent: () => {},
});

const MouseTransparentProvider = ({ children }) => {
    const [mouseTransparent, setMouseTransparent] = useState(false);
  return (
    <MouseTransparentContext.Provider value={{mouseTransparent,setMouseTransparent}}>
      {children}
    </MouseTransparentContext.Provider>
  );
};

export default MouseTransparentProvider;
