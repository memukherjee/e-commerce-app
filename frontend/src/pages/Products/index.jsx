import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";

export default function Products() {
  const { category } = useParams();
  const sampleProduct = {
    product_id: 6,
    product_imageUrl:
      "https://via.placeholder.com/720x1080?text=Product+Image",
    product_name: "Product Name",
    product_price: 300000,
    discountPrice: 199999,
  };

  useEffect(() => {
    document.title = `${category} || Elegant Apparels`;
  }, [category]);

  const [filterTabOpen, setFilterTabOpen] = useState(false);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="products-section relative mt-10 text-center w-11/12 mx-auto"
    >
      <h1 className="text-xl font-semibold">Products</h1>
      <p className="text-lg font-medium">Category: {category}</p>

      {/* Filter */}
      <button
        className="p-4 cursor-none rounded-md bg-black bg-opacity-50 fixed top-20 left-16 shadow-md shadow-gray-700"
        onClick={() => setFilterTabOpen(!filterTabOpen)}
      >
        <i class="fa-solid fa-filter"></i>
      </button>
      <ProductFilter filterTabOpen={filterTabOpen} />

      <div className="products-container">
        {/* Products */}
        <div className="products flex justify-center items-center flex-wrap my-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <ProductCard key={item} index={item} product={sampleProduct} />
          ))}
        </div>

        {/* Loading */}
        <div className="loading flex justify-center w-full mt-8 mb-28">
          <ClipLoader
            color="#164e63"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
          />
        </div>
      </div>
    </m.div>
  );
}
