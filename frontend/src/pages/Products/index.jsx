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
  const genderParam =
    classifier === "men" || classifier === "women" || classifier === "kids"
      ? classifier
      : null;
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
  } = useProducts(
    categoryParam?.category_id,
    queryParam,
    genderParam,
    isVisible
  );

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
    <PageFadeTransitionContainer className="relative w-11/12 mx-auto mt-16 text-center products-section min-h-100vh">
      <AnimatedText
        className="text-2xl font-bold font-pen md:text-4xl text-cyan-900"
        text={
          classifier === "all"
            ? "All Products"
            : clothingTypes.length === 1 && clothingTypes[0] === "men"
            ? "Men's Fashion"
            : clothingTypes.length === 1 && clothingTypes[0] === "women"
            ? "Women's Fashion"
            : clothingTypes.length === 1 && clothingTypes[0] === "kids"
            ? "Kids' Fashion"
            : "Products"
        }
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
        className="fixed z-10 p-4 bg-black bg-opacity-50 rounded-md shadow-md cursor-none top-20 left-12 md:left-16 shadow-gray-700"
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

      <div className="my-2 products-container">
        {/* Products */}
        <div className="flex flex-wrap items-center justify-center my-4 products">
          {products.map((product, index) => (
            <ProductCard
              key={product.product_id}
              index={index}
              product={product}
            />
          ))}
          {products.length === 0 && allProductsFetched && (
            <div className="w-full text-center py-36">
              <p className="text-2xl font-semibold">No products found</p>
            </div>
          )}
        </div>

        {/* Loading */}
        {!allProductsFetched && (
          <div
            ref={containerRef}
            className="flex justify-center w-full mt-8 loading mb-28"
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
