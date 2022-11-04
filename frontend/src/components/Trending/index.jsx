import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { ScreenContext } from "../../App";
import ProductCard from "../ProductCard";

const trendingProducts = [
  {
    id: 1,
    url: "https://content.rolex.com/dam/2022/upright-bba/m116508-0013.png?impolicy=v6-upright",
    name: "Rolex Cosmograph Daytona watch",
    mrp: 300000,
    price: 199999,
  },
  {
    id: 2,
    url: "https://cdpeacockjewelry.com/rolex-watches-chicago/wp-content/uploads/2022/03/m126710blro-0001_modelpage_laying_down_landscape.png",
    name: "Rolex Cosmograph Daytona watch",
    mrp: 300000,
    price: 199999,
  },
  {
    id: 3,
    url: "https://www.pngarts.com/files/4/Ray-Ban-Sunglasses-PNG-Transparent-Image.png",
    name: "Ray-Ban Sunglass",
    mrp: 300000,
    price: 199999,
  },
  {
    id: 4,
    url: "https://publish.one37pm.net/wp-content/uploads/2021/07/Instapump.png?fit=750%2C425",
    name: "Reebok InstaPump Fury OG Digital Glow",
    mrp: 300000,
    price: 199999,
  },
  {
    id: 5,
    url: "https://www.fastrack.in/wps/wcm/connect/fastrack/0d22aebb-e343-405b-b358-17c5bd768532/1.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_90IA1H80OGS700Q8OKN8NF0004-0d22aebb-e343-405b-b358-17c5bd768532-nU9VH6B",
    name: "Fargo Handbag",
    mrp: 300000,
    price: 199999,
  },
  {
    id: 6,
    url: "https://i.ebayimg.com/images/g/QhUAAOSwLfxeLqtd/s-l500.png",
    name: "Industrial Cotton Jeans Pant",
    mrp: 300000,
    price: 199999,
  },
];




export default function Trending() {
  
  const mobileScreen = useContext(ScreenContext)
  
  useEffect(() => {
    axios.get("")
  }, []);


  const setCustomProductStyle = (index) => {
    return {
      margin: ((index - 1) % 3 === 0) && !mobileScreen ? "2rem 0 0" : "0 0 2rem",
    };
  };

  return (
    <>
      <motion.div
        className="trending-section mt-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
              key={product.id}
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
