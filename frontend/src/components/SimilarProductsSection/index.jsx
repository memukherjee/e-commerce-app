import useSimilarProducts from "../../hooks/useSimilarProducts";
import useObserver from "../../hooks/useObserver";
import ProductsCarousel from "../ProductCarousel";

export default function SimilarProductsSection({ product }) {
  const options = {
    root: null ,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const [containerRef, isVisble, setIsVisible] = useObserver(options);
  const { similarProducts, allFetched } = useSimilarProducts(
    product?.product_id,
    isVisble
  );

  return (
    <div className="related-products w-full text-center my-8 md:text-left">
      <h1 className="text-xl mb-4 md:text-2xl font-bold text-cyan-900 underline underline-offset-4">
        Featured items you may like
      </h1>
      <div className="related-products-container px-2">
        {similarProducts.length === 0 ? (
          <div className="text-gray-400">No similar products found!</div>
        ) : (
          <div>
            <ProductsCarousel
              products={similarProducts}
              allFetched={allFetched}
              containerRef={containerRef}
              setIsVisible={setIsVisible}
            />
          </div>
        )}
      </div>
    </div>
  );
}
