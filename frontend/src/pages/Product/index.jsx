import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { pid } = useParams();
  const [quantity, setQuantity] = useState(1);
  const productDetails = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
  voluptas, quod, quia, voluptate quae voluptates quibusdam
  exercitationem quidem voluptatem quos quas. Quisquam, quae. Quisquam
  voluptas, quod, quia, voluptate quae voluptates quibusdam
  exercitationem quidem voluptatem quos quas. Quisquam, quae. Lorem
  ipsum dolor sit amet consectetur adipisicing elit. Quisquam
  voluptas, quod, quia, voluptate quae voluptates quibusdam
  exercitationem quidem voluptatem quos quas. Quisquam, quae. Quisquam
  voluptas, quod, quia, voluptate quae voluptates quibusdam
  exercitationem quidem voluptatem quos quas. Quisquam, quae.`;

  useEffect(() => {
    document.title = `${pid} || Elegant Apparels`;
  }, [pid]);

  const [expandDetails, setExpandDetails] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto overflow-hidden flex flex-col justify-center items-center relative w-11/12 text-center"
    >
      <div className="product min-h-90vh md:h-100vh pt-16 pb-4 w-full flex flex-col md:flex-row justify-between gap-4 md:gap-16">
        <div className="image-container relative w-full md:w-1/3 h-35vh md:h-70vh bg-gray-200">
          <img
            className="w-full h-full object-contain"
            src="https://via.placeholder.com/720x1080?text=Product+Image"
            alt=""
          />
        </div>
        <div className="product-info w-full md:w-2/3 text-left md:text-right flex flex-col justify-between md:items-end">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-400">
            Product Name
          </h1>
          <p
            style={
              expandDetails ? { maxHeight: "100%" } : { maxHeight: "100px" }
            }
            className="text-gray-400 text-lg md:mt-4 md:text-right transition-all duration-500 overflow-hidden border-b-2 border-gray-200 md:border-none"
            onClick={() => setExpandDetails(true)}
          >
            {productDetails}
          </p>
          <span
            className="text-gray-700 text-base mb-4"
            onClick={() => setExpandDetails(true)}
          >
            {!expandDetails && "Show More Details..."}
          </span>
          <span className="price flex items-center gap-2">
            <span className="text-gray-400 text-xl">Price:</span>
            <span className="text-green-400 text-2xl font-bold">₹99</span>
            <span className="text-red-400 text-xl font-bold line-through">
              ₹150
            </span>
          </span>
          <div className="flex items-center justify-between w-full md:max-w-200 mb-4 md:mb-0 md:ml-auto">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-full"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="">{quantity}</span>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="flex justify-between items-center md:gap-8">
            <button className="bg-gray-400 text-white px-4 py-2 rounded-sm mt-4">
              Add to Cart
            </button>
            <button className="bg-green-400 text-white px-4 py-2 rounded-sm mt-4">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="more-details flex flex-col md:flex-row justify-between gap-16 mt-8">
        <div className="reviews w-full md:w-1/2 text-left">
          <h1 className="text-xl md:text-2xl text-center md:text-left font-bold text-cyan-900 underline underline-offset-4 mb-4">
            Reviews
          </h1>
          <div className="review-container">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="review">
                <div className="reviewer flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    alt=""
                  />
                  <div className="reviewer-info">
                    <h1 className="text-lg md:text-xl font-semibold md:font-bold text-gray-400">
                      Reviewer
                    </h1>
                    <span className="text-gray-400 text-base md:text-lg">
                      2 days ago
                    </span>
                  </div>
                </div>
                <span className="rating text-yellow-400 text-lg md:text-xl">
                  <span>☆</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-gray-400 text-base md:text-lg">
                    (4 Stars)
                  </span>
                </span>
                <p className="text-gray-400 text-lg my-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptas, quod, quia, voluptate quae voluptates
                  quibusdam exercitationem quidem voluptatem quos quas.
                  Quisquam, quae. Quisquam voluptas, quod, quia, voluptate quae
                  voluptates quibusdam exercitationem quidem voluptatem quos
                  quas. Quisquam, quae.
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="related-products w-full md:w-1/2 text-right">
          <h1 className="text-xl mb-4 md:text-2xl text-center md:text-right font-bold text-cyan-900 underline underline-offset-4">
            Related Products
          </h1>
          <div className="related-products-container">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="related-product flex justify-between mb-4"
              >
                <div className="image-container w-1/5 bg-gray-200">
                  <img
                    className="w-full h-full object-contain"
                    src="https://via.placeholder.com/300?text=Product+Image"
                    alt=""
                  />
                </div>
                <div className="product-info font-medium w-2/3 text-right flex flex-col justify-start items-end">
                  <h1 className="text-xl text-gray-400">Product Name</h1>
                  <span className="price flex items-center gap-2">
                    <span className="text-gray-400 text-lg">Price:</span>
                    <span className="text-green-400 text-xl">₹99</span>
                    <span className="text-red-400 text-lg line-through">
                      ₹150
                    </span>
                  </span>
                  <span className="rating text-yellow-400 text-lg md:text-xl">
                    <span>☆</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span className="text-gray-400 text-base md:text-lg">
                      (4 Stars)
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}
