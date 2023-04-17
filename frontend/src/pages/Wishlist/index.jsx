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
  useTitle("Wishlist | Elegant Apparels");
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
    console.log(product, size, quantity);
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
    <PageFadeTransitionContainer className="min-h-100vh pt-16">
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
        <div className="wishlist-container px-2 py-4 max-w-1000 mx-auto">
          <div className="wishlist-header text-center bg-cyan-900 text-white rounded-t py-2">
            <h1 className="text-2xl font-bold capitalize">Wishlist</h1>
          </div>
          <div className="wishlist-body shadow-inner shadow-black h-[70vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : wishlist.length === 0 ? (
              <div className="no-products text-center text-cyan-900 flex flex-col gap-y-4 justify-center items-center w-full mt-8 mb-28">
                <div className="rotate-6 text-3xl bg-orange-300 w-14 h-14 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <h1 className="text-2xl font-medium">Wishlist is Empty</h1>
                <p className="text-lg">Pick some products that you like</p>
                <Link
                  to="/categories"
                  className="bg-cyan-900 text-white px-4 py-2 rounded-md"
                >
                  Let's Pick
                </Link>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product?.product_id + product?.size}
                  className="wishlist-item my-1 border-b-2 px-6 md:px-12 py-4 flex flex-wrap md:flex-nowrap justify-between items-center w-full md:items-start"
                >
                  <Link
                    to={`/product/${product?.product_id}`}
                    className="wishlist-item-image w-28 h-28 md:w-40 md:h-40 order-1 bg-orange-300 rounded-full"
                  >
                    <img
                      className="w-full h-full object-contain hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-in-out"
                      src={product?.product_imageUrl}
                      alt={product?.product_name}
                    />
                  </Link>
                  <div className="wishlist-item-details mt-2 md:mt-0 w-full md:w-1/2 order-3 md:order-2">
                    <Link
                      to={`/product/${product?.product_id}`}
                      title={product?.product_name}
                      className="wishlist-item-name"
                    >
                      <h3 className="text-lg md:text-xl font-bold text-cyan-900 whitespace-nowrap text-ellipsis overflow-hidden">
                        {product?.product_name}
                      </h3>
                    </Link>
                    <div className="wishlist-item-price flex items-center justify-end md:justify-start gap-2">
                      <span className="text-green-400 text-xl font-semibold">
                        ₹{product.discountPrice.toLocaleString("en-IN")}
                      </span>
                      {product.discountPrice < product.product_price && (
                        <span className="text-red-400 text-lg font-semibold line-through">
                          ₹{product.product_price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="wishlist-item-actions flex flex-col gap-4 order-2 md:order-3">
                    <ModalButton
                      onClick={() => {
                        setCurrectProduct(product);
                        setWishlistAction("addToCart");
                        open();
                      }}
                      className="bg-cyan-700 shadow shadow-cyan-900 text-white text-base md:text-lg px-2 py-2 rounded-md"
                    >
                      <span className="mr-2">Add to cart</span>
                      <span className="p-1 bg-white text-cyan-700 rounded-full">
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
                      className="bg-green-600 shadow shadow-green-900 disabled:bg-gray-500 disabled:shadow-black text-white text-base md:text-lg px-2 py-2 rounded-md"
                    >
                      {product?.product_quantity === 0 ? (
                        <span className="mr-2">Out of stock</span>
                      ) : (
                        <span className="mr-2">Buy Now</span>
                      )}
                      {product?.product_quantity > 0 && (
                        <span className="p-1 bg-white text-green-600 rounded-full">
                          <i className="fa-solid fa-bag-shopping"></i>
                        </span>
                      )}
                    </ModalButton>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="wishlist-footer px-6 md:px-12 py-6 bg-cyan-900 text-white rounded-b flex flex-col md:flex-row justify-between items-center gap-6"></div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
