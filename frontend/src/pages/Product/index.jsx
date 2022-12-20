import axios from "axios";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductColorPicker from "../../components/ProductColorPicker";
import useTitle from "../../hooks/useTitle";

export default function Product() {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const addToWishList = () => {
    setLiked(!liked);
  };

  useTitle("Product || Elegant Apparels")

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/products/getProduct/" + pid)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        document.title = `${res.data.product_name} || Elegant Apparels`;
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  }, [pid, navigate]);

  const productColors = ["gold", "silver", "black", "orange"];

  const [quantity, setQuantity] = useState(1);

  const [expandDetails, setExpandDetails] = useState(false);

  const [productColor, setProductColor] = useState(productColors[0]);

  return product ? (
    <PageFadeTransitionContainer className="mx-auto overflow-hidden flex flex-col justify-center items-center relative w-11/12 text-center">
      <div className="product min-h-90vh md:h-100vh pt-16 pb-4 w-full flex flex-col justify-between gap-4 md:grid md:grid-rows-3 md:grid-cols-4 md:gap-8">
        <div className="image-container relative w-full h-35vh md:h-full bg-gray-200 p-4 pb-8 md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-2">
          <img
            className="w-full h-full object-contain"
            src={product.product_imageUrl}
            alt={product.product_name}
          />
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="wishlisting-btn absolute bottom-5 right-12 w-12 h-12 bg-white rounded-full shadow shadow-gray-600 text-red-400 text-xl"
            onClick={addToWishList}
          >
            {liked ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </m.button>
        </div>
        <div className="product-info order-2 w-full max-h-100vh text-left md:text-right flex flex-col justify-between md:items-end md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-5">
          <h1 className="font-bold max-w-750 text-2xl md:text-4xl text-gray-400">
            {product.product_name}
          </h1>
          <p
            style={
              expandDetails ? { maxHeight: "100%" } : { maxHeight: "100px" }
            }
            className="text-gray-400 max-w-500 text-lg md:mt-4 md:text-justify transition-all duration-500 overflow-hidden border-b-2 border-gray-200 md:border-none"
            onClick={() => setExpandDetails(true)}
          >
            {product.product_description}
          </p>
          <span
            className="text-gray-700 text-base mb-4"
            onClick={() => setExpandDetails(true)}
          >
            {!expandDetails && "Show More Details..."}
          </span>
          <span className="price flex items-center gap-2">
            <span className="text-gray-400 text-xl">Price:</span>
            <span className="text-green-400 text-2xl font-bold">
              ₹{product.discountPrice}
            </span>
            <span className="text-red-400 text-xl font-bold line-through">
              ₹{product.product_price}
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
        <div className="productSelectDetails md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-2 w-full">
          {productColors && (
            <ProductColorPicker
              productColor={productColor}
              setProductColor={setProductColor}
              productColors={productColors}
            />
          )}
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
    </PageFadeTransitionContainer>
  ) : (
    <Loader />
  );
}
