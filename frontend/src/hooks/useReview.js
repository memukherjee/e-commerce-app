import axios from "axios";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { getCookie } from "../utils/cookie";

export default function useReview(productId, triggerRefetch) {
  const [reviews, setReviews] = useState([]);
  const [ratingCount, setRatingCount] = useState({});
  const [allFetched, setAllFetched] = useState(false);
  const reviewFetched = useRef(false);
  const pageNo = useRef(0);
  const pageSize = useRef(5);

  const { user } = useContext(UserContext);

  const getRatingCount = () => {
    axios
      .get(process.env.REACT_APP_API + `/products/individualStar/${productId}`)
      .then((res) => {
        // console.log(res.data);
        setRatingCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addReview = (message, star) => {
    axios
      .post(
        process.env.REACT_APP_API + `/products/addReview`,
        {
          productId,
          message,
          star,
          createdAt: new Date(),
        },
        {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        res.data.name = user.name;
        res.data.avatar = user.avatar;
        if (res.status === 200) {
          setReviews((prev) => [...prev, res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchReviews = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/products/getproductReview/${productId}/${pageNo.current}/${pageSize.current}`
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          if (res.data.length < pageSize.current) {
            setAllFetched(true);
          }
          setReviews(prev=>[...prev,...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  useEffect(() => {
    if (reviewFetched.current && triggerRefetch && !allFetched) {
      pageNo.current += 1;
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefetch]);

  useEffect(() => {
    if (!reviewFetched.current && productId) {
      fetchReviews();
      getRatingCount();
      reviewFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { reviews, addReview, ratingCount, allFetched };
}
