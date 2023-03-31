import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
        if (res.data.length === 0) {
          setAllFetched(true);
          return;
        }
        setSimilarProducts((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMore = () => {
    setPageNo(pageNo + 1);
    getSimilarProducts(productId, pageNo+1, pageSize);
  };

  useEffect(() => {
    if (isVisble && isInitiallyFetched.current)
        fetchMore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisble]);

  useEffect(() => {
    if (!isInitiallyFetched.current) getSimilarProducts(productId, pageNo, pageSize);
    return () => {
      isInitiallyFetched.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { similarProducts, fetchMore, allFetched };
}
