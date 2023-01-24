import { useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";
import useProducts from "../../hooks/useProducts";
import useTitle from "../../hooks/useTitle";

export default function Products() {

  const {category} = useLocation()?.state || {};

  useTitle(`${category?.category_name} || Elegant Apparels`);

  const products = useProducts(category?.category_id);

  const [filterTabOpen, setFilterTabOpen] = useState(false);
  
  return products ? (
    <PageFadeTransitionContainer className="products-section relative mt-10 min-h-100vh text-center w-11/12 mx-auto">
      <h1 className="text-xl font-semibold">Products</h1>
      <p className="text-lg font-medium">Category: {category?.category_name}</p>

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
