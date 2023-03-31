import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";

export default function useSellers(triggerFetchMore) {
  const [sellers, setSellers] = useState([]);
  const sellersFetched = useRef(false);
  const [allFetched, setAllFetched] = useState(false);
  const pageNo = useRef(0);
  const pageSize = useRef(12);

  const deleteSellerApi = (id) => {
    axios
      .post(
        process.env.REACT_APP_API + "/admin/auth/deleteSeller",
        { id },
        {
          headers: {
            Authorization: getCookie("admin-refreshToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSellers((prev) => prev.filter((seller) => seller.id !== id));
        toast.success("Seller deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSellers = (pageNo, pageSize) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/admin/auth/getAllSeller/${pageNo}/${pageSize}`,
        {
          headers: {
            Authorization: getCookie("admin-refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          setAllFetched(true);
        } else if (res.status === 200) {
          // console.log("setting cusomers");
          const verifiedSellers = res.data.filter(
            (seller) => seller.accountStatus
          );
          setSellers((prev) => [...prev, ...verifiedSellers]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (triggerFetchMore && sellersFetched.current) {
      // console.log("fetch more: " + pageNo.current);
      fetchSellers(pageNo.current++, pageSize.current);
    }
  }, [triggerFetchMore]);

  useEffect(() => {
    if (!sellersFetched.current) {
      // console.log("initial fetch");
      fetchSellers(pageNo.current++, pageSize.current);
    }
    return () => {
      sellersFetched.current = true;
    };
  }, []);

  return { sellers, setSellers, deleteSellerApi, allFetched };
}
