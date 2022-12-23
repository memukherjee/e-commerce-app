import React, { useContext } from "react";
import { ScreenContext } from "../../contexts/screenContext";

export default function AuthPageBackground({ children, formBg }) {
  const mobileScreen = useContext(ScreenContext);

  return (
    <div className="h-100vh gap-5 md:gap-0 bg-gray-200 w-full relative flex flex-col md:flex-row">
      <div
        style={
          mobileScreen
            ? {
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }
            : {
                clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
              }
        }
        className="image-container h-1/3 md:h-full w-full md:w-2/3 overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={formBg}
          alt="Background"
        />
      </div>

      {children}
    </div>
  );
}
