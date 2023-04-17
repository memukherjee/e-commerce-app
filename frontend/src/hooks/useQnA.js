import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useQnA(productId) {
  const [QnAs, setQnAs] = useState([]);
  const [loading, setLoading] = useState(false);
  const initaillyFetched = useRef(false);

  const getQnA = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `/products/qaByProductId/${productId}`
      );
      // console.log(response);
      setQnAs(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initaillyFetched.current) {
      getQnA();
    }
    return () => {
      initaillyFetched.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { QnAs, setQnAs, loading };
}
