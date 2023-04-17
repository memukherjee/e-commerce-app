import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarRating from "../StarRating";

export default function ProductCard({
  product,
  index,
  isTrending,
  setCustomProductStyle,
}) {
  const productUrl = `/product/${product.product_id}`;
  return (
    <Link className="md:w-1/3 flex justify-center" to={productUrl}>
      <div
        style={setCustomProductStyle && setCustomProductStyle(index)}
        className="product-card relative flex-wrap w-11/12 max-w-300 h-400 px-4 py-5 box-border hover:shadow-lg hover:shadow-gray-500 transition-all duration-300 ease-in-out"
      >
        {isTrending && (
          <span
            className="ranking absolute top-0 left-0 font-black text-8xl text-orange-700 opacity-70 -translate-x-3 -translate-y-7"
            aria-hidden
          >
            {index + 1}
          </span>
        )}
        <div className="product-image bg-gray-200 flex justify-center items-center w-full h-3/4 overflow-hidden">
          <motion.img
            className="object-contain w-full h-full mx-auto"
            loading="lazy"
            src={product.product_imageUrl}
            alt={product.product_name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = `http://via.placeholder.com/640?text=Placeholder Image`;
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="product-details text-black">
          <StarRating
            stars={product.averageRating}
            className="mt-1 mb-2 block text-[.9rem]"
          />
          <span
            className="product-name block text-xl whitespace-nowrap text-ellipsis overflow-hidden"
            title={product.product_name}
          >
            {product.product_name}
          </span>
          <span className="product-price font-normal text-lg flex flex-wrap justify-center gap-1">
            {product.product_price > product.discountPrice && (
              <span className="product-mrp line-through text-red-400">
                ₹{product.product_price.toLocaleString("en-IN")}
              </span>
            )}
            <span className="product-discounted-price text-green-900">
              ₹{product.discountPrice.toLocaleString("en-IN")}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
