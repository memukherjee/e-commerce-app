import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
export default function ProductCarouselSlideDetails({ product }) {
  return (
    <>
      <motion.div
        variants={slideMotion}
        className="py-4 hidden text-center absolute inset-0 opacity-0 bg-black bg-opacity-50 w-full h-full z-10 overflow-hidden md:flex flex-col justify-between items-center"
      >
        <div className="w-full">
          <Link
            to={`/product/${product?.product_id}`}
            title={product?.product_name}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
            }}
            className="text-[1.2rem] leading-snug font-normal text-white inline-block px-2 text-ellipsis overflow-hidden"
          >
            {product?.product_name}
          </Link>
          <motion.div
            variants={underlineMotion}
            className="underline h-[2px] bg-white my-2"
          ></motion.div>
          <StarRating
            stars={product?.averageRating}
            textColor="#fff"
            className="text-base md:text-lg block text-center"
          />
        </div>
        <div className="text-lg leading-snug font-medium text-white flex flex-col justify-between items-center">
          <div>
            {product?.product_price > product?.discountPrice && (
              <span className="text-red-400 line-through">
                {product?.product_price.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-green-400 ml-2">
              {product?.discountPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <Link
              className="underline underline-offset-2 text-base font-normal p-2"
              to={`/product/${product?.product_id}`}
            >
              Check Out
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col justify-center md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-full bg-black bg-opacity-50 px-2 py-0.5">
        <Link
          to={`/product/${product?.product_id}`}
          className="text-ellipsis overflow-hidden whitespace-nowrap text-white"
        >
          {product?.product_name}
        </Link>
      </div>
      <div className="flex flex-col justify-center md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-black bg-opacity-50 px-2 py-0.5">
        <StarRating
          stars={product?.averageRating}
          textColor="#fff"
          className="text-lg md:text-lg block text-center"
        />
        <div className="text-lg leading-snug font-medium text-white flex justify-between items-center w-full">
          <div>
            {product?.product_price > product?.discountPrice && (
              <span className="text-red-400 line-through">
                {"₹" + product?.product_price}
              </span>
            )}
            <span className="text-green-400 ml-2">
              {"₹" + product?.discountPrice}
            </span>
          </div>
          <Link
            to={`/product/${product?.product_id}`}
            className="underline underline-offset-2 text-base font-normal p-1"
          >
            Check Out
          </Link>
        </div>
      </div>
    </>
  );
}

const slideMotion = {
  rest: {
    opacity: 0,
    y: 500,
    transition: {
      duration: 0.5,
      delay: 0.25,
      delayChildren: 0,
      ease: "easeInOut",
      type: "tween",
    },
  },
  hover: {
    opacity: 1,
    y: -11,
    transition: {
      duration: 0.5,
      delay: 0.2,
      delayChildren: 0.5,
      ease: "easeInOut",
      type: "tween",
    },
  },
};

const underlineMotion = {
  rest: {
    x: -100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  hover: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
