import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProducts(category) {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      axios
        .get(
          `${
            process.env.REACT_APP_API
          }/products/product_category/${category}?pageNo=0&pageSize=10`
        )
        .then((res) => {
          // console.log(res);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
          navigate("/404");
        });
    }, [category, navigate]);

    return products;
};