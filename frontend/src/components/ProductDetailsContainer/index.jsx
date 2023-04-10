import { useContext, useMemo, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import { isPng } from "../../utils/validateCredentials";
import ProductSizePicker from "../ProductSizePicker";
import { toast } from "react-toastify";

import useCart from "../../hooks/useCart";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import getStringLines from "../../utils/getStringLines";
import { ScreenContext } from "../../contexts/screenContext";
import { GeoLocationContext } from "../../contexts/geoLocationContext";
import isValidPinCode from "../../utils/isValidPinCode";
import { ClipLoader } from "react-spinners";
import ProductImageMagnify from "../ProductImageMagnify";
import StarRating from "../StarRating";
import ShareUrl from "../ShareUrl";

export default function ProductDetailsContainer({
  product,
  setProduct,
  open,
  setModalChild,
}) {
  const [quantity, setQuantity] = useState(1);
  const { mobileScreen } = useContext(ScreenContext);
  const lines = useMemo(
    () => getStringLines(product.product_description, mobileScreen),
    [product.product_description, mobileScreen]
  );
  const [expandDetails, setExpandDetails] = useState(false);

  const [productSize, setProductSize] = useState("");

  const { addToCart } = useCart();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const descriptionBox = useRef(null);

  const buyNow = () => {
    if (!user) {
      navigate("/auth");
      toast.warn("Login first to buy");
      return;
    }

    if (product.size.length !== 0 && productSize === "") {
      toast.warn("Select size first");
      return;
    }

    const productData = {
      product_id: product.product_id,
      product_category: product.product_category,
      product_description: product.product_description,
      product_discount: product.product_discount,
      product_name: product.product_name,
      product_imageUrl: product.product_imageUrl,
      product_price: product.product_price,
      discountPrice: product.discountPrice,
      product_company: product.product_company,
      seller_id: product.seller_id,
      size: productSize,
      quantity: quantity,
    };

    navigate("/payment", {
      state: {
        orderData: {
          list: [productData],
          total: product.discountPrice * quantity,
          total_quantity: quantity,
        },
      },
    });
  };

  const addToWishList = () => {
    if (!user) {
      navigate("/auth");
      toast("Login first to add to wishlist");
      return;
    }

    const route =
      product?.wishListed || false
        ? "/auth/deletewishlist"
        : "/auth/addwishlist";

    axios
      .post(
        process.env.REACT_APP_API + route,
        { productId: product.product_id },
        {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setProduct({ ...product, wishListed: !product.wishListed });
          setUser((prev) => ({
            ...prev,
            totalWishListItems: res.data.wishListed
              ? prev?.totalWishListItems + 1
              : prev?.totalWishListItems - 1,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const geoLocation = useContext(GeoLocationContext);

  const [pincode, setPincode] = useState(
    geoLocation?.currentLocation?.postcode ?? ""
  );
  const [pincodeStatus, setPincodeStatus] = useState("unchecked");

  return (
    <>
      <div className="product min-h-90vh pt-4 pb-4 w-full flex flex-col justify-between gap-4 md:grid md:grid-rows-6 md:grid-cols-4 md:gap-y-2 md:gap-x-8">
        <div
          style={
            product?.product_company === "Nike" &&
            isPng(product?.product_imageUrl)
              ? {
                  backgroundImage:
                    "url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/640px-Logo_NIKE.svg.png)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "120% 45%",
                  backgroundOrigin: "content-box",
                  padding: "0 5%",
                }
              : {}
          }
          className="image-container relative w-full h-35vh md:h-90vh bg-gray-200 md:row-start-1 md:row-end-7 md:col-start-1 md:col-end-3"
        >
          <ShareUrl
            title={product?.product_name}
            text={product?.product_description}
            url={window.location.href}
            className="absolute top-5 right-5 md:right-12 flex justify-center items-center w-12 h-12 bg-white rounded-full shadow shadow-gray-600 text-cyan-900 text-xl"
          >
            <i className="fa-solid fa-share-nodes"></i>
          </ShareUrl>
          <ProductImageMagnify
            product={product}
            open={open}
            setModalChild={setModalChild}
          />

          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="wishlisting-btn absolute bottom-5 right-5 md:right-12 w-12 h-12 bg-white rounded-full shadow shadow-gray-600 text-red-400 text-xl"
            onClick={() => addToWishList(product, setProduct)}
          >
            {product.wishListed ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </m.button>
        </div>
        <div className="product-info order-2 w-full md:max-h-100vh text-left flex flex-col gap-y-2 justify-between md:row-start-1 md:row-end-7 md:col-start-3 md:col-end-5">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-x-4">
              <h1 className="font-medium max-w-750 text-xl md:text-[2.5rem] text-gray-600 leading-tight">
                <span className="max-w-750 block font-normal text-lg text-gray-400">
                  {product.product_company}
                </span>
                {product.product_name}
              </h1>
              <span className="price text-xl md:text-2xl font-medium flex flex-wrap items-center gap-2 whitespace-nowrap">
                <span className="text-cyan-900">₹{product.discountPrice}</span>
                {product.discountPrice < product.product_price && (
                  <span className="flex items-center gap-x-1">
                    <span className="text-red-600 line-through">
                      ₹{product.product_price}
                    </span>
                    <span className="text-green-400 text-lg">
                      {Math.round(product?.product_discount) + "% off"}
                    </span>
                  </span>
                )}
              </span>
            </div>
            <StarRating
              stars={product?.averageRating}
              className="text-[1.2rem]"
            />
          </div>
          <div className="w-full border-2 border-cyan-900 px-2 pt-2 mt-2 relative">
            <span className="absolute -top-3 left-3 bg-cyan-900 text-white px-2">
              Description
            </span>
            <p
              ref={descriptionBox}
              style={
                expandDetails
                  ? {
                      overflow: "auto",
                      height: `${Math.max(Math.min(lines * 15, 150), 120)}px`,
                    }
                  : { overflow: "hidden", height: "100px" }
              }
              className="text-gray-500 text-justify w-full text-lg transition-all duration-500 border-b-2 border-gray-200 md:border-none whitespace-pre-line md:mt-4"
              onClick={() => setExpandDetails(true)}
            >
              {product.product_description}
            </p>
            <span
              className="text-gray-600 block text-left text-base scroll-smooth underline underline-offset-2 mb-4"
              onClick={() => {
                setExpandDetails(!expandDetails);
                descriptionBox.current.scrollTop = 0;
              }}
            >
              {expandDetails ? "Show Less" : "Show More Details..."}
            </span>
          </div>
          <div className="delivary">
            <div className="delivary-pincode flex flex-wrap w-full">
              <div className="pincode-input text-right border-2 border-gray-400 pr-4 w-7/12 md:w-auto flex justify-between items-center">
                <input
                  type="number"
                  name="pincode"
                  placeholder="Enter Pincode"
                  id="delivary-pincode"
                  className="text-gray-400 px-4 py-2 rounded-sm outline-none w-[150px] focus:placeholder:opacity-0 placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-300 placeholder:ease-in-out"
                  value={pincode}
                  onChange={(e) => {
                    setPincodeStatus("unchecked");
                    setPincode(e.target.value);
                  }}
                />
                <span>
                  {pincodeStatus === "invalid" ? (
                    <i className="fa-solid fa-times-circle text-red-500"></i>
                  ) : pincodeStatus === "valid" ? (
                    <i className="fa-solid fa-check-circle text-green-400"></i>
                  ) : pincodeStatus === "checking" ? (
                    <ClipLoader color={"#666"} loading={true} size={16} />
                  ) : (
                    <i className="fa-solid fa-map-marker-alt text-cyan-900"></i>
                  )}
                </span>
              </div>
              <button
                onClick={async () => {
                  setPincodeStatus("checking");
                  if (await isValidPinCode(pincode)) {
                    setPincodeStatus("valid");
                    toast.success("Delivary available at this pincode");
                  } else {
                    setPincodeStatus("invalid");
                    toast("Not available at this pincode");
                  }
                }}
                className="bg-gray-400 text-white font-medium px-4 py-2 w-5/12 md:w-auto"
              >
                Check Availability
              </button>
              <span className="text-gray-400 text-base w-full h-4">
                {pincodeStatus === "valid" &&
                  "Delivary available within 7 days *"}
              </span>
            </div>
          </div>
          <div className="productSelectDetails flex md:flex-wrap flex-col md:flex-row gap-y-4 justify-between md:items-center">
            {product?.size?.length !== 0 && (
              <div className="flex items-center justify-start gap-x-2">
                <ProductSizePicker
                  productSize={productSize}
                  setProductSize={setProductSize}
                  productSizes={product?.size || []}
                />
              </div>
            )}

            <div className="flex items-center justify-start gap-x-4 w-full max-w-[250px] mb-4 md:mb-0">
              <span className="text-gray-400 font-medium">Quantity:</span>
              <div className="w-full flex justify-between items-center">
                <button
                  className="bg-gray-600 shadow shadow-gray-800 text-white w-9 h-9 rounded-full text-base font-normal"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="text-gray-600 font-semibold">{quantity}</span>
                <button
                  className="bg-gray-600 shadow shadow-gray-800 text-white w-9 h-9 text-base font-normal rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center md:gap-8">
            <button
              onClick={() => {
                addToCart(product, quantity, productSize).then(() => {
                  toast.success("Added to cart");
                });
              }}
              className="bg-gray-600 text-white px-4 py-4 rounded-sm w-2/5"
            >
              Add to Cart
            </button>
            <button
              disabled={product?.product_quantity === 0}
              className="bg-cyan-900 disabled:bg-gray-300 text-white px-4 py-4 rounded-sm w-2/5"
              onClick={buyNow}
            >
              {product?.product_quantity === 0 ? "Out Of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
