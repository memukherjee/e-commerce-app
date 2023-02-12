import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleBasedOnPath } from "../utils/checkModule";
import { getCookie } from "../utils/cookie";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  fetchUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = (userCookie)=>{
    axios
        .get(process.env.REACT_APP_API + "/auth/getUserDetailsByJWT", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": userCookie,
          },
        })
        .then((res) => {
          setUser(res.data);
          toast("Welcome " + res.data.name,{
            position: "top-center"
          })
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }


  const isUser = moduleBasedOnPath(useLocation().pathname,true,false,false);


  useEffect(() => {
    // User Cookie setting
    const userCookie = getCookie("refreshToken");
    if (isUser && userCookie) {
      fetchUser(userCookie);
    }
    return () => {
      setUser(null);
    };
  }, [isUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
