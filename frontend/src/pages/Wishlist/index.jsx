import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useWishlist from "../../hooks/useWishlist";
import useTitle from "../../hooks/useTitle";
import ModalButton from "../../components/ModalButton";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import ProductSizeAndQuantityPickerForm from "../../components/ProductSize&QuantityPickerForm";
import { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { UserContext } from "../../contexts/userContext";
import { toast } from "react-toastify";

export default function Wishlist() {
  useTitle("Wishlist || Elegant Apparels");
  const { modalOpen, close, open } = useModal();
  const [currectProduct, setCurrectProduct] = useState(null);
  const [wishlistAction, setWishlistAction] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { wishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const onAddToCart = (product, size, quantity) => {
    addToCart(product, quantity, size);
  };

  const onBuyNow = (product, size, quantity) => {
    // console.log(product, size, quantity);
    if (!user) {
      navigate("/auth");
      toast.warn("Login first to buy");
      return;
    }

    if (product.size.length !== 0 && size === "") {
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
      size: size,
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

  return (
    <PageFadeTransitionContainer className="pt-16 min-h-100vh">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          <ProductSizeAndQuantityPickerForm
            product={currectProduct}
            close={close}
            action={
              wishlistAction === "addToCart"
                ? onAddToCart
                : wishlistAction === "buyNow"
                ? onBuyNow
                : ""
            }
            actionText={
              wishlistAction === "addToCart"
                ? "Add To Cart"
                : wishlistAction === "buyNow"
                ? "Buy Now"
                : ""
            }
          />
        }
      />
      <div className="wishlist-wrapper ">
        <div className="px-2 py-4 mx-auto wishlist-container max-w-1000">
          <div className="py-2 text-center text-white rounded-t wishlist-header bg-cyan-900">
            <h1 className="text-2xl font-bold capitalize">Wishlist</h1>
          </div>
          <div className="wishlist-body shadow-inner shadow-black h-[70vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full mt-8 text-center no-products text-cyan-900 gap-y-4 mb-28">
                <div className="flex items-center justify-center text-3xl bg-orange-300 rounded-full rotate-6 w-14 h-14">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <h1 className="text-2xl font-medium">Wishlist is Empty</h1>
                <p className="text-lg">Pick some products that you like</p>
                <Link
                  to="/categories"
                  className="px-4 py-2 text-white rounded-md bg-cyan-900"
                >
                  Let's Pick
                </Link>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product?.product_id + product?.size}
                  className="flex flex-wrap items-center justify-between w-full px-6 py-4 my-1 border-b-2 wishlist-item md:px-12 md:flex-nowrap md:items-start"
                >
                  <Link
                    to={`/product/${product?.product_id}`}
                    className="order-1 bg-orange-300 rounded-full wishlist-item-image w-28 h-28 md:w-40 md:h-40"
                  >
                    <img
                      className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
                      src={product?.product_imageUrl}
                      alt={product?.product_name}
                    />
                  </Link>
                  <div className="order-3 w-full mt-2 wishlist-item-details md:mt-0 md:w-1/2 md:order-2">
                    <Link
                      to={`/product/${product?.product_id}`}
                      title={product?.product_name}
                      className="wishlist-item-name"
                    >
                      <h3 className="overflow-hidden text-lg font-bold md:text-xl text-cyan-900 whitespace-nowrap text-ellipsis">
                        {product?.product_name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-end gap-2 wishlist-item-price md:justify-start">
                      <span className="text-xl font-semibold text-green-400">
                        ₹{product.discountPrice.toLocaleString("en-IN")}
                      </span>
                      {product.discountPrice < product.product_price && (
                        <span className="text-lg font-semibold text-red-400 line-through">
                          ₹{product.product_price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col order-2 gap-4 wishlist-item-actions md:order-3">
                    <ModalButton
                      onClick={() => {
                        setCurrectProduct(product);
                        setWishlistAction("addToCart");
                        open();
                      }}
                      className="px-2 py-2 text-base text-white rounded-md shadow bg-cyan-700 shadow-cyan-900 md:text-lg"
                    >
                      <span className="mr-2">Add to cart</span>
                      <span className="p-1 bg-white rounded-full text-cyan-700">
                        <i className="fa-solid fa-cart-plus"></i>
                      </span>
                    </ModalButton>
                    <ModalButton
                      onClick={() => {
                        setWishlistAction("buyNow");
                        setCurrectProduct(product);
                        open();
                      }}
                      disabled={product?.product_quantity === 0}
                      className="px-2 py-2 text-base text-white bg-green-600 rounded-md shadow shadow-green-900 disabled:bg-gray-500 disabled:shadow-black md:text-lg"
                    >
                      {product?.product_quantity === 0 ? (
                        <span className="mr-2">Out of stock</span>
                      ) : (
                        <span className="mr-2">Buy Now</span>
                      )}
                      {product?.product_quantity > 0 && (
                        <span className="p-1 text-green-600 bg-white rounded-full">
                          <i className="fa-solid fa-bag-shopping"></i>
                        </span>
                      )}
                    </ModalButton>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 text-white rounded-b wishlist-footer md:px-12 bg-cyan-900 md:flex-row"></div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
