import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleBasedOnPath } from "../utils/checkModule";
import { getCookie } from "../utils/cookie";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  fetchUser: () => {},
  fetchUserStat: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userFetched = useRef(false);

  const fetchUser = (userCookie) => {
    axios
      .get(process.env.REACT_APP_API + "/auth/getUserDetailsByJWT", {
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      })
      .then((res) => {
        setUser((prev) => {
          return { ...prev, ...res.data };
        });
        toast("Welcome " + res.data.name, {
          position: "top-center",
        });

        // console.log(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const fetchUserStat = (userCookie) => {
    axios
      .post(
        process.env.REACT_APP_API + "/auth/userStats",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: userCookie,
          },
        }
      )
      .then((res) => {
        setUser((prev) => {
          return { ...prev, ...res.data };
        });
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isUser = moduleBasedOnPath(useLocation().pathname, true, false, false);

  useEffect(() => {
    // User Cookie setting
    const userCookie = getCookie("refreshToken");
    if (!userFetched.current && isUser && userCookie) {
      fetchUser(userCookie);
      fetchUserStat(userCookie);
      userFetched.current = true;
    }
  }, [isUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, fetchUserStat }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
