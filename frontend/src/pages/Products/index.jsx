import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";
import useTitle from "../../hooks/useTitle";

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useTitle(`${category} || Elegant Apparels`);
  
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API
        }/products/product_category/${category.toUpperCase()}?pageNo=0&pageSize=10`
      )
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  }, [category, navigate]);

  const [filterTabOpen, setFilterTabOpen] = useState(false);
  return products ? (
    <PageFadeTransitionContainer className="products-section relative mt-10 min-h-100vh text-center w-11/12 mx-auto">
      <h1 className="text-xl font-semibold">Products</h1>
      <p className="text-lg font-medium">Category: {category}</p>

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
        {/* <div className="loading flex justify-center w-full mt-8 mb-28">
          <ClipLoader
            color="#164e63"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
          />
        </div> */}
      </div>
    </PageFadeTransitionContainer>
  ) : (
    <Loader />
  );
}
