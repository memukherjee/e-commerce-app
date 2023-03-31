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
    <div className="related-products w-full text-center md:text-left">
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

/*

{similarProducts.length === 0 && (
          <div className="text-gray-400">
            No similar products found!
          </div>
        )}
        {similarProducts.map((similarProduct) => (
          <Link
            to={`/product/${similarProduct.product_id}`}
            key={similarProduct.product_id}
            className="hover:shadow shadow-gray-400 p-2"
          >
            <div
              key={similarProduct.product_id}
              className="related-product flex justify-between"
            >
              <div className="image-container w-24 h-24 bg-orange-300 rounded-full">
                <img
                  className="w-full h-full object-contain"
                  src={similarProduct.product_imageUrl}
                  alt={similarProduct.product_name}
                />
              </div>
              <div className="product-info font-medium w-2/3 text-right flex flex-col justify-start items-end">
                <h1
                  title={similarProduct?.product_name}
                  className="text-[1.25rem] text-gray-400 text-ellipsis overflow-hidden w-full whitespace-nowrap"
                >
                  {similarProduct.product_name}
                </h1>
                <span className="price flex items-center gap-2">
                  <span className="text-gray-400 text-lg">Price:</span>
                  <span className="text-green-400 text-xl">
                    {similarProduct?.discountPrice}
                  </span>
                  {similarProduct?.discountPrice <
                    similarProduct?.product_price && (
                    <span className="text-red-400 text-lg line-through">
                      {similarProduct?.product_price}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </Link>
        ))}

*/
