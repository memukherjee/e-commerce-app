import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";
import useObserver from "../../hooks/useObserver";
import useProducts from "../../hooks/useProducts";
import useTitle from "../../hooks/useTitle";

export default function Products() {
  const searchParams = new URLSearchParams(useLocation().search);
  const categoryData = JSON.parse(searchParams.get("category"));
  const queryData = searchParams?.get("query");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const category = useLocation()?.state?.category || categoryData || {};
  const query = queryData || null;

  const [products, setProducts] = useProducts(category?.category_id, query);

  useTitle(`${query || category?.category_name} || Elegant Apparels`);

  const [filterTabOpen, setFilterTabOpen] = useState(false);

  const [containerRef, isVisible] = useObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const pageNo = useRef(0);
  const pageSize = useRef(6);
  const [allProductsFetched, setAllProductsFetched] = useState(false);

  useEffect(() => {
    const fetchNextPage = () => {
      pageNo.current += 1;
      const route = query
        ? `${process.env.REACT_APP_API}/products/search?query=${query}&pageNo=${pageNo.current}&pageSize=${pageSize.current}`
        : `${process.env.REACT_APP_API}/products/product_category/${category?.category_id}?pageNo=${pageNo.current}&pageSize=${pageSize.current}`;
      // console.log(route);
      axios
        .get(route)
        .then((res) => {
          // console.log(res.data);
          if (res.data.length === 0) {
            setAllProductsFetched(true);
            return;
          }
          setProducts((prevProducts) => [...prevProducts, ...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, query, category, setProducts]);

  return products ? (
    <PageFadeTransitionContainer className="products-section relative mt-10 min-h-100vh text-center w-11/12 mx-auto">
      <h1 className="text-xl font-semibold">Products</h1>
      {query && (
        <p className="text-lg font-medium">Search Results for: {query}</p>
      )}
      {category?.category_name && (
        <p className="text-lg font-medium">
          Category: {category?.category_name}
        </p>
      )}

      {/* Filter */}
      <button
        className="p-4 cursor-none rounded-md bg-black bg-opacity-50 fixed top-20 left-16 shadow-md shadow-gray-700 z-10"
        onClick={() => setFilterTabOpen(!filterTabOpen)}
      >
        <i className="fa-solid fa-filter"></i>
      </button>
      <ProductFilter filterTabOpen={filterTabOpen} />

      <div className="products-container">
        {/* Products */}
        <div className="products flex justify-center items-center flex-wrap my-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.product_id}
              index={index}
              product={product}
            />
          ))}
          {products.length === 0 && (
            <div className="text-center w-full py-36">
              <p className="text-2xl font-semibold">No products found</p>
            </div>
          )}
        </div>

        {/* Loading */}
        {!allProductsFetched && (
          <div
            ref={containerRef}
            className="loading flex justify-center w-full mt-8 mb-28"
          >
            <ClipLoader
              color="#164e63"
              loading={true}
              size={50}
              aria-label="Loading Spinner"
            />
          </div>
        )}
      </div>
    </PageFadeTransitionContainer>
  ) : (
    <Loader />
  );
}
