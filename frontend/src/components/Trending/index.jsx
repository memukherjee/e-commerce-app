import axios from "axios";
import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { ScreenContext } from "../../contexts/screenContext";
import ProductCard from "../ProductCard";

export default function Trending() {
  const mobileScreen = useContext(ScreenContext);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/products/trending`)
      .then((res) => {
        // console.log(res.data);
        setTrendingProducts(res.data);
      })
      .catch((err) => console.log(err));
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
        <a
          className="inline-block text-lg font-normal text-cyan-900 mb-8 underline underline-offset-4"
          href="/products/trending"
        >
          See All
        </a>
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
