import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./contexts/userContext";
import ScreenProvider from "./contexts/screenContext";
import ScrollProvider from "./contexts/scrollContext";
import MouseOverLinkProvider from "./contexts/mouseOverLinkContext";
import MouseTransparentProvider from "./contexts/mouseTransparentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ScrollProvider>
      <ScreenProvider>
        <UserProvider>
          <MouseOverLinkProvider>
            <MouseTransparentProvider>
              <App />
            </MouseTransparentProvider>
          </MouseOverLinkProvider>
        </UserProvider>
      </ScreenProvider>
    </ScrollProvider>
  </React.StrictMode>
);
