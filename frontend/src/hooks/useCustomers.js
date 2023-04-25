import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { getCookie } from "../utils/cookie";
import { toast } from "react-toastify";

const useCustomers = (triggerFetchMore) => {
  const [customers, setCustomers] = useState([]);
  const customersFetched = useRef(false);
  const [allFetched, setAllFetched] = useState(false);
  const pageNo = useRef(0);
  const pageSize = useRef(12);

  const fetchCustomers = (pageNo, pageSize) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/admin/auth/getAllUser/${pageNo}/${pageSize}`,
        {
          headers: {
            Authorization: getCookie("admin-refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.length < pageSize) {
          setAllFetched(true);
        }
        // console.log("setting cusomers");
        setCustomers((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    if (triggerFetchMore && customersFetched.current) {
      // console.log("fetch more: " + pageNo.current);
      fetchCustomers(pageNo.current++, pageSize.current);
    }
  }, [triggerFetchMore]);

  useEffect(() => {
    if (!customersFetched.current) {
      // console.log("initial fetch");
      fetchCustomers(pageNo.current++, pageSize.current);
      customersFetched.current = true;
    }
  }, []);

  return { customers, setCustomers, allFetched };
};

export default useCustomers;
