import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { toast } from "react-toastify";

export default function useSellerProducts(setProcessing) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProcessing(true);
    const fetchProducts = () => {
      axios
        .get(process.env.REACT_APP_API + "/seller/getAll", {
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("seller-refreshToken"),
          },
        })
        .then((response) => {
          // console.log(response);
          setProducts(response.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        })
        .finally(() => {
          setProcessing(false);
          // console.log("products fetched");
        });
    };

    fetchProducts();

    return () => {
      setProcessing(false);
    };
  }, [setProcessing]);

  return [products, setProducts];
}
