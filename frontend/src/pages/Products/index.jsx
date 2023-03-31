import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";
import useObserver from "../../hooks/useObserver";
import useProducts from "../../hooks/useProducts";
import useTitle from "../../hooks/useTitle";
import useCategories from "../../hooks/useCategories";
import AnimatedText from "../../components/AnimatedText";

export default function Products() {
  const searchParams = new URLSearchParams(useLocation().search);
  const categoryData = JSON.parse(searchParams.get("category"));
  const queryData = searchParams?.get("query");

  const { classifier = null } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categoryParam = useLocation()?.state?.category || categoryData || {};
  const queryParam = classifier === "all" ? null : queryData || null;
  const categories = useCategories();

  const [filterTabOpen, setFilterTabOpen] = useState(false);

  const [containerRef, isVisible] = useObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const {
    products,
    allProductsFetched,
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
  } = useProducts(categoryParam?.category_id, queryParam, isVisible);

  useTitle(
    `${
      category?.length === 1
        ? categories.filter((cat) => cat.category_id === category[0])[0]
            ?.category_name
        : queryParam === null
        ? "Products"
        : `Search result for ${queryParam}`
    } || Elegant Apparels`
  );

  return products ? (
    <PageFadeTransitionContainer className="products-section relative mt-16 min-h-100vh text-center w-11/12 mx-auto">
      <AnimatedText
        className="text-2xl font-pen md:text-4xl font-bold text-cyan-900"
        text={classifier === "all" ? "All Products" : "Products"}
        direction="y"
        size="large"
        align="center"
        delay={0.5}
      />
      {categoryParam?.category_name && category?.length === 1 && (
        <AnimatedText
          className="text-lg font-medium"
          text={`Category: ${
            categories.filter((cat) => cat.category_id === category[0])[0]
              ?.category_name
          }`}
          direction="y"
          align="center"
          delay={0.5}
        />
      )}
      {!classifier && queryParam && (
        <AnimatedText
          className="text-lg font-medium"
          text={`Search result for: ${queryParam}`}
          direction="y"
          align="center"
          delay={0.5}
        />
      )}

      {/* Filter */}
      <button
        className="p-4 cursor-none rounded-md bg-black bg-opacity-50 fixed top-20 left-12 md:left-16 shadow-md shadow-gray-700 z-10"
        onClick={() => setFilterTabOpen(!filterTabOpen)}
      >
        <i className="fa-solid fa-filter"></i>
      </button>
      <ProductFilter
        filterTabOpen={filterTabOpen}
        category={category}
        setCategory={setCategory}
        clothingTypes={clothingTypes}
        setClothingTypes={setClothingTypes}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      <div className="products-container my-2">
        {/* Products */}
        <div className="products flex justify-center items-center flex-wrap my-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.product_id}
              index={index}
              product={product}
            />
          ))}
          {products.length === 0 && allProductsFetched && (
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
