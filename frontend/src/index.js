import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import UserProvider from "./contexts/userContext";
import ScreenProvider from "./contexts/screenContext";
import ScrollProvider from "./contexts/scrollContext";
import MouseOverLinkProvider from "./contexts/mouseOverLinkContext";
import MouseTransparentProvider from "./contexts/mouseTransparentContext";
import MouseOverNavItemProvider from "./contexts/mouseOverNavItemContext";
import SellerProvider from "./contexts/sellerContext";
import ModalProvider from "./contexts/modalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollProvider>
        <ScreenProvider>
          <ModalProvider>
            <SellerProvider>
              <UserProvider>
                <MouseOverLinkProvider>
                  <MouseOverNavItemProvider>
                    <MouseTransparentProvider>
                      <App />
                    </MouseTransparentProvider>
                  </MouseOverNavItemProvider>
                </MouseOverLinkProvider>
              </UserProvider>
            </SellerProvider>
          </ModalProvider>
        </ScreenProvider>
      </ScrollProvider>
    </Router>
  </React.StrictMode>
);
