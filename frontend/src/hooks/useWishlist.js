import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "../utils/cookie";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishlistFetched = useRef(false);

  useEffect(() => {
    if (!wishlistFetched.current) {
      fetchWishlist();
      wishlistFetched.current = true;
    }
  }, []);

  const fetchWishlist = () => {
    axios
      .get(process.env.REACT_APP_API + `/auth/getUserWishListByJWT`, {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setWishlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { wishlist, setWishlist, loading };
}
