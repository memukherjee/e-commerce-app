import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrayToString from "../utils/arrayToString";
import useDebounce from "./useDebounce";

export default function useProducts(categoryParam, queryParam, isVisible) {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const pageNo = useRef(0);
  const pageSize = useRef(6);
  const [query, setQuery] = useState(queryParam ?? "");
  const [category, setCategory] = useState(
    categoryParam ? [categoryParam] : []
  );
  const [clothingTypes, setClothingTypes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("popularity descending");
  const [allProductsFetched, setAllProductsFetched] = useState(false);
  const initiallyFetched = useRef(false);
  const shouldIRefetch = useRef(false);

  const debouncedMaxPrice = useDebounce(maxPrice, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);

  const fetchProducts = () => {
    const route = `${
      process.env.REACT_APP_API
    }/products/filterProducts?query=${query}&category=${arrayToString(
      category
    )}&clothingType=${arrayToString(
      clothingTypes
    )}&minPrice=${debouncedMinPrice}&maxPrice=${debouncedMaxPrice}&sort=${sort}&pageNo=${
      pageNo.current
    }&pageSize=${pageSize.current}`;
    pageNo.current += 1;
    // console.log(route);
    axios
      .get(route)
      .then((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          setAllProductsFetched(true);
        }
        products === null
          ? setProducts(res.data)
          : setProducts((prevProducts) => [...prevProducts, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      })
      .finally(() => {
        shouldIRefetch.current = true;
      });
  };

  useEffect(() => {
    // console.log("fetching next page "+isVisible);
    if (isVisible || !initiallyFetched.current) {
      // console.log("fetching next page: " + pageNo.current);
      fetchProducts();
    }
    return () => {
      initiallyFetched.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    if (shouldIRefetch.current) {
      // console.log("refetching products");
      setProducts([]);
      pageNo.current = 0;
      setAllProductsFetched(false);
      fetchProducts();
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    clothingTypes,
    query,
    debouncedMinPrice,
    debouncedMaxPrice,
    sort,
  ]);

  return {
    products,
    setProducts,
    allProductsFetched,
    query,
    setQuery,
    category,
    setCategory,
    clothingTypes,
    setClothingTypes,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
  };
}
