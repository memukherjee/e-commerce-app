import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProducts(category, query) {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const route = query
      ? `${process.env.REACT_APP_API}/products/search?query=${query}&pageNo=0&pageSize=6`
      : `${process.env.REACT_APP_API}/products/product_category/${category}?pageNo=0&pageSize=6`;
    axios
      .get(route)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  }, [category, query, navigate]);

  return [products, setProducts];
}
