import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";

export default function useSellerRequests(triggerFetchMore) {
  const [sellerRequests, setSellerRequests] = useState([]);
  const sellerRequestsFetched = useRef(false);
  const [allFetched, setAllFetched] = useState(false);
  const pageNo = useRef(0);
  const pageSize = useRef(12);

  const fetchSellerRequests = () => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/admin/auth/getAllSeller/${pageNo.current}/${pageSize.current}`,
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
          const unverifiedSellerRequests = res.data.filter(
            (sellerRequest) => !sellerRequest.accountStatus
          );
          setSellerRequests((prev) => [...prev, ...unverifiedSellerRequests]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptSellerRequestAPI = (id) => {
    axios
      .post(
        process.env.REACT_APP_API + "/admin/auth/validateSeller",
        { id },
        {
          headers: {
            Authorization: getCookie("admin-refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setSellerRequests((prev) => prev.filter((seller) => seller.id !== id));
        toast.success("Seller accepted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSellerRequestAPI = (id) => {
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
        // console.log(res);
        setSellerRequests((prev) => prev.filter((seller) => seller.id !== id));
        toast.success("Seller deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!sellerRequestsFetched.current) {
      //   console.log("initial fetch");
      fetchSellerRequests();
    }

    return () => {
      sellerRequestsFetched.current = true;
    };
  }, []);

  useEffect(() => {
    if (triggerFetchMore && sellerRequestsFetched.current) {
      //   console.log("fetch more: " + pageNo.current);
      fetchSellerRequests(pageNo.current++, pageSize.current);
    }
  }, [triggerFetchMore]);

  return {
    sellerRequests,
    acceptSellerRequestAPI,
    deleteSellerRequestAPI,
    allFetched,
  };
}
