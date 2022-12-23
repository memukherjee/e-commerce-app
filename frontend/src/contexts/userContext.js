import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // User Cookie setting
    const userCookie = getCookie("user");
    console.log(userCookie);
    if (userCookie) {
      axios
        .get(process.env.REACT_APP_API + "/userDetails/" + userCookie)
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
