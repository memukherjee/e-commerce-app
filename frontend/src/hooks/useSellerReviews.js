import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { toast } from "react-toastify";

export default function useSellerReviews() {
  const [reviews, setReviews] = useState([]);
  const [processing, setProcessing] = useState(true);
  const reviewFetched = useRef(false);

  const fetchReviews = () => {
    axios
      .post(
        process.env.REACT_APP_API + "/seller/auth/sellerReviewDetails",
        {},
        {
          headers: {
            Authorization: getCookie("seller-refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setReviews(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  useEffect(() => {
    if (!reviewFetched.current) {
      fetchReviews();
    }
    return () => {
      reviewFetched.current = true;
    };
  }, []);

  return { reviews, processing };
}
