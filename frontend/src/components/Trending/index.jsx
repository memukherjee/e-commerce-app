import axios from "axios";
import { motion } from "framer-motion";
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ScreenContext } from "../../contexts/screenContext";
import ProductCard from "../ProductCard";

export default function Trending() {
  const mobileScreen = useContext(ScreenContext);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const trendingFetched = useRef(false);
  useEffect(() => {
    if (!trendingFetched.current) {
      axios
        .get(
          `${process.env.REACT_APP_API}/products/filterProducts?sort=popularity descending&pageNo=0&pageSize=6`
        )
        .then((res) => {
          // console.log(res.data);
          setTrendingProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      trendingFetched.current = true;
    };
  }, []);

  const setCustomProductStyle = (index) => {
    return {
      margin: (index - 1) % 3 === 0 && !mobileScreen ? "2rem 0 0" : "0 0 2rem",
    };
  };

  return (
    <>
      
      <motion.div
        className="trending-section mt-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-xl font-medium mx-auto mb-2 text-cyan-900">
          Trending Products
        </h1>
        <Link
          className="inline-block text-lg font-normal text-cyan-900 mb-8 underline underline-offset-4"
          to="/products/all"
        >
          See All
        </Link>
        <div className="trending-products flex justify-center items-center flex-wrap max-w-1200 mx-auto">
          {trendingProducts.map((product, index) => (
            <ProductCard
              key={product.product_id}
              product={product}
              index={index}
              isTrending={true}
              setCustomProductStyle={setCustomProductStyle}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
