import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SellerContext } from "../../contexts/sellerContext";
import { UserContext } from "../../contexts/userContext";
import useTitle from "../../hooks/useTitle";
import { eraseCookie, getCookie } from "../../utils/cookie";
export default function LogOut({ sellerRoute, adminRoute }) {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { seller, setSeller } = useContext(SellerContext);
  useTitle("LogOut || Elegant Apparels");

  useEffect(() => {
    const logoutUser = () => {
      if (!getCookie("refreshToken") || !getCookie("accessToken") || !user)
        return navigate("/");
      axios
        .post(`${process.env.REACT_APP_API}/auth/logout`, {
          refreshToken: getCookie("refreshToken"),
          accessToken: getCookie("accessToken"),
          Id: user.id,
        })
        .then((res) => {
          console.log(res);
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

    sellerRoute ? logoutSeller() : logoutUser();

    return () => {
      setUser(null);
      setSeller(null);
    };
  }, [navigate, seller, sellerRoute, setSeller, setUser, user]);
  return (
    <div className="min-h-100vh flex justify-center items-center">
      <h1 className="text-2xl font-semibold">
        {user || (sellerRoute && seller)
          ? "Logging You Out"
          : "You are not Logged In"}
      </h1>
    </div>
  );
}
