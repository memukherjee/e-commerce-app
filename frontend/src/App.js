import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "./utils/cookie";
import axios from "axios";

const MouseOverLinkContext = createContext();
const MouseOverNavItemContext = createContext();
const ScrollContext = createContext();
const ScreenContext = createContext();
const UserContext = createContext();

function App() {
  const [mouseOverNavItem, setMouseOverNavItem] = useState(false);
  const [mouseOverLink, setMouseOverLink] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
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

    // User Cookie setting
    const userCookie = getCookie("user");
    console.log(userCookie);
    if (userCookie) {
      axios
        .get(process.env.REACT_APP_API + "/userDetails/" + userCookie)
        .then((res) => {
          typeof res.data.profilePic !== "undefined"
            ? setUser(res.data)
            : setUser({
                ...res.data,
                profilePic: `https://avatars.dicebear.com/api/initials/${res.data.name}.svg`,
              });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
      <UserContext.Provider value={{ user, setUser }}>
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
      </UserContext.Provider>
    </Router>
  );
}
export {
  MouseOverLinkContext,
  MouseOverNavItemContext,
  ScrollContext,
  ScreenContext,
  UserContext,
};
export default App;
