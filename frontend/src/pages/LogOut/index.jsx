import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../../contexts/adminContext";
import { SellerContext } from "../../contexts/sellerContext";
import { UserContext } from "../../contexts/userContext";
import useTitle from "../../hooks/useTitle";
import { eraseCookie, getCookie } from "../../utils/cookie";
export default function LogOut({ sellerRoute, adminRoute }) {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { seller, setSeller } = useContext(SellerContext);
  const { admin, setAdmin } = useContext(AdminContext);
  useTitle("LogOut || Elegant Apparels");
  const location = useLocation();

  useEffect(() => {
    const logoutUser = () => {
      if (!getCookie("refreshToken") || !getCookie("accessToken") || !user) {
        return navigate("/");
      }
      let logoutRoute = "";
      if (location.search === "?all=true") {
        // console.log(location.search);
        logoutRoute = `${process.env.REACT_APP_API}/auth/logout-all`;
      } else {
        logoutRoute = `${process.env.REACT_APP_API}/auth/logout`;
      }
      axios
        .post(logoutRoute, {
          refreshToken: getCookie("refreshToken"),
          accessToken: getCookie("accessToken"),
          Id: user?.id,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            eraseCookie("accessToken");
            eraseCookie("refreshToken");
            setUser(null);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    };

    const logoutSeller = () => {
      if (
        !getCookie("seller-refreshToken") ||
        !getCookie("seller-accessToken") ||
        !seller
      )
        return navigate("/seller");
      axios
        .post(`${process.env.REACT_APP_API}/seller/auth/logout`, {
          refreshToken: getCookie("seller-refreshToken"),
          accessToken: getCookie("seller-accessToken"),
          Id: seller.id,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            eraseCookie("seller-accessToken");
            eraseCookie("seller-refreshToken");
            setSeller(null);
            navigate("/seller");
          }
        })
        .catch((err) => console.log(err));
    };

    const logoutAdmin = () => {
      if (
        !getCookie("admin-refreshToken") ||
        !getCookie("admin-accessToken") ||
        !admin
      )
        return navigate("/admin");
      axios
        .post(`${process.env.REACT_APP_API}/admin/auth/logout`, {
          refreshToken: getCookie("admin-refreshToken"),
          accessToken: getCookie("admin-accessToken"),
          Id: admin.id,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            eraseCookie("admin-accessToken");
            eraseCookie("admin-refreshToken");
            setAdmin(null);
            navigate("/admin");
          }
        })
        .catch((err) => console.log(err));
    };

    sellerRoute ? logoutSeller() : adminRoute ? logoutAdmin() : logoutUser();

    return () => {
      setUser(null);
      setSeller(null);
      setAdmin(null);
    };
  }, [
    navigate,
    seller,
    sellerRoute,
    setSeller,
    setUser,
    user,
    admin,
    adminRoute,
    setAdmin,
    location.search,
  ]);
  return (
    <div className="flex items-center justify-center min-h-100vh">
      <h1 className="text-2xl font-semibold">
        {user || (sellerRoute && seller) || (adminRoute && admin)
          ? "Logging You Out"
          : "You are not Logged In"}
      </h1>
    </div>
  );
}
