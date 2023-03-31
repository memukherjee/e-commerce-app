import axios from "axios";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleBasedOnPath } from "../utils/checkModule";
import { getCookie } from "../utils/cookie";

export const AdminContext = createContext({
  admin: {},
  setAdmin: () => {},
  fetchAdmin: () => {},
  fetchAdminStat: () => {},
});

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const adminFetched = useRef(false);

  const fetchAdmin = (adminCookie) => {
    // Admin Cookie setting
    axios
      .get(process.env.REACT_APP_API + "/admin/auth/getAdminDetailsByJWT", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminCookie,
        },
      })
      .then((res) => {
        setAdmin({ ...admin, ...res.data });
        toast("Welcome " + res.data.name, {
          position: "top-center",
        });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAdminStat = (adminCookie) => {
    // Admin Cookie setting
    axios
      .get(process.env.REACT_APP_API + "/admin/auth/adminStats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminCookie,
        },
      })
      .then((res) => {
        setAdmin({ ...admin, ...res.data });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isAdmin = moduleBasedOnPath(useLocation().pathname, false, false, true);
  useEffect(() => {
    const adminCookie = getCookie("admin-refreshToken");
    if (!adminFetched.current && isAdmin && adminCookie) {
      fetchAdmin(adminCookie);
      fetchAdminStat(adminCookie);
    }
    return () => {
      setAdmin(null);
      adminFetched.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, fetchAdmin, fetchAdminStat }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
