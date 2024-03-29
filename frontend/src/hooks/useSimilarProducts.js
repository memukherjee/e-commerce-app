import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useSimilarProducts(productId, isVisble) {
  const isInitiallyFetched = useRef(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 5;

  const getSimilarProducts = (productId, pageNo, pageSize) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/products/similarProduct?productId=${productId}&pageNo=${pageNo}&pageSize=${pageSize}`
      )
      .then((res) => {
        // console.log(res);
        if (res.data.length < pageSize) {
          setAllFetched(true);
        }
        setSimilarProducts((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const fetchMore = () => {
    setPageNo(pageNo + 1);
    getSimilarProducts(productId, pageNo + 1, pageSize);
  };

  useEffect(() => {
    if (isVisble && isInitiallyFetched.current) fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisble]);

  useEffect(() => {
    if (!isInitiallyFetched.current) {
      getSimilarProducts(productId, pageNo, pageSize);
      isInitiallyFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { similarProducts, fetchMore, allFetched };
}
