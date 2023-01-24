import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const sellerCookie = getCookie("seller-refreshToken");
    console.log(sellerCookie);
    if (sellerCookie) {
      fetchSeller(sellerCookie);
    }
    return () => {
      // console.log("Seller Provider Unmounted");
      setSeller(null);
    };
  }, []);

  return (
    <SellerContext.Provider value={{ seller, setSeller, fetchSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export default SellerProvider;
