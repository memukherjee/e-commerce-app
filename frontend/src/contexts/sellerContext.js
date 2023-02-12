import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleBasedOnPath } from "../utils/checkModule";
import { getCookie } from "../utils/cookie";

export const SellerContext = createContext({
  seller: {},
  setSeller: () => {},
  fetchSeller: () => {},
});

const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);

  const fetchSeller = (sellerCookie) => {
    // Seller Cookie setting
    axios
      .get(process.env.REACT_APP_API + "/seller/auth/getSellerDetailsByJWT", {
        headers: {
          "Content-Type": "application/json",
          Authorization: sellerCookie,
        },
      })
      .then((res) => {
        setSeller(res.data);
        toast("Welcome " + res.data.name, {
          position: "top-center",
        });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isSeller = moduleBasedOnPath(useLocation().pathname,false,true,false);
  useEffect(() => {
    const sellerCookie = getCookie("seller-refreshToken");
    // console.log(sellerCookie);


    if (isSeller && sellerCookie) {
      fetchSeller(sellerCookie);
    }
    return () => {
      // console.log("Seller Provider Unmounted");
      setSeller(null);
    };
  }, [isSeller]);

  return (
    <SellerContext.Provider value={{ seller, setSeller, fetchSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export default SellerProvider;
