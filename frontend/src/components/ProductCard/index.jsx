import React from "react";

export default function ProductCard({
  product,
  index,
  isTrending,
  setCustomProductStyle,
}) {
  const productUrl = `/product/${product.product_id}`;
  return (
    <a
      className="md:w-1/3 flex justify-center"
      href={productUrl}
    >
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
        <div className="product-image bg-gray-200 flex justify-center items-center w-full h-3/4">
          <img
            className="object-contain w-full h-full mx-auto"
            loading="lazy"
            src={product.product_imageUrl}
            alt={product.product_name}
          />
        </div>
        <div className="product-details text-black my-4">
          <span
            className="product-name block text-xl whitespace-nowrap text-ellipsis overflow-hidden"
            title={product.product_name}
          >
            {product.product_name}
          </span>
          <span className="product-price font-normal text-lg flex flex-wrap justify-center gap-1">
            <span className="product-mrp line-through text-red-400">
              ₹{product.product_price}
            </span>
            <span className="product-discounted-price text-green-900">
              ₹{product.discountPrice}
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
