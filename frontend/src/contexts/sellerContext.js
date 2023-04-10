import axios from "axios";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleBasedOnPath } from "../utils/checkModule";
import { getCookie } from "../utils/cookie";

export const SellerContext = createContext({
  seller: {},
  setSeller: () => {},
  fetchSeller: () => {},
  fetchSellerStat: () => {},
});

const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const sellerFetched = useRef(false);

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
        setSeller((prev) => ({ ...seller, ...res.data }));
        toast("Welcome " + res.data.name, {
          position: "top-center",
        });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchSellerStat = (sellerCookie) => {
    // Seller Cookie setting
    axios
      .post(
        process.env.REACT_APP_API + "/seller/auth/sellerStats",
        {},
        {
          headers: {
            Authorization: sellerCookie,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSeller((prev) => ({ ...prev, ...res.data }));
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isSeller = moduleBasedOnPath(
    useLocation().pathname,
    false,
    true,
    false
  );
  useEffect(() => {
    const sellerCookie = getCookie("seller-refreshToken");
    // console.log(sellerCookie);

    if (!sellerFetched.current && isSeller && sellerCookie) {
      fetchSeller(sellerCookie);
      fetchSellerStat(sellerCookie);
      sellerFetched.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeller]);

  return (
    <SellerContext.Provider
      value={{ seller, setSeller, fetchSeller, fetchSellerStat }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export default SellerProvider;
