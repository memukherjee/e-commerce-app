import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useCart from "../../hooks/useCart";
import useTitle from "../../hooks/useTitle";

export default function Cart() {
  useTitle("Your Cart || Elegant Apparels");

  const {
    cart,
    totalPrice,
    quantity,
    loading,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useCart();

  return (
    <PageFadeTransitionContainer className="pt-12 min-h-100vh">
      <div className="cart-wrapper">
        <div className="px-2 py-4 mx-auto cart-container max-w-1000">
          <div className="py-2 text-center text-white rounded-t cart-header bg-cyan-900">
            <h1 className="text-2xl font-bold">Cart</h1>
          </div>
          <div className="cart-body scroll shadow-inner shadow-black h-[60vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full mt-8 text-center no-products text-cyan-900 gap-y-4 mb-28">
                <div className="text-3xl bg-orange-300 rounded-full -rotate-6 w-14 h-14">
                  <i className="fa-solid fa-shopping-cart"></i>
                </div>
                <h1 className="text-2xl font-medium">Cart is Empty</h1>
                <p className="text-lg">Lets grab some great deals</p>
                <Link
                  to="/categories"
                  className="px-4 py-2 text-white rounded-md bg-cyan-900"
                >
                  Let's Shop
                </Link>
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product?.product_id + product?.size}
                  className="flex flex-wrap items-center justify-between px-12 py-4 my-1 border-b-2 cart-item md:flex-nowrap md:items-start"
                >
                  <Link
                    to={`/product/${product?.product_id}`}
                    className="order-1 w-40 h-40 mx-auto bg-orange-300 rounded-full cart-item-image md:mx-0"
                  >
                    <img
                      className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
                      src={product?.product_imageUrl}
                      alt={product?.product_name}
                    />
                  </Link>
                  <div className="order-3 w-full px-4 cart-item-details md:w-1/2 md:px-0 md:order-2">
                    <Link
                      to={`/product/${product?.product_id}`}
                      title={product?.product_name}
                      className="cart-item-name"
                    >
                      <h3 className="overflow-hidden text-lg font-bold md:text-xl text-cyan-900 whitespace-nowrap text-ellipsis">
                        {product?.product_name}
                      </h3>
                    </Link>
                    <div className="cart-item-price">
                      <h3 className="text-lg font-bold text-cyan-900">
                        ₹{product?.discountPrice.toLocaleString("en-IN")}
                      </h3>
                    </div>

                    {product?.size && (
                      <div className="cart-item-size">
                        <h3 className="text-lg font-bold text-cyan-900">
                          {"Size: " + product?.size}
                        </h3>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col order-2 gap-4 cart-item-actions md:order-3">
                    <div className="flex items-center overflow-hidden border-2 rounded-md cart-item-quantity border-cyan-900">
                      <button
                        onClick={() => decreaseItemQuantity(product)}
                        className="px-2 py-1 text-white bg-cyan-900"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="w-8 text-lg font-bold text-center text-cyan-900">
                        {product?.quantity}
                      </span>
                      <button
                        onClick={() => increaseItemQuantity(product)}
                        className="px-2 py-1 text-white bg-cyan-900"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product)}
                      className="px-2 py-1 text-white bg-red-600 border-2 border-red-600 rounded-md"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 text-white rounded-b cart-footer md:px-12 bg-cyan-900 md:flex-row">
            <div className="w-full cart-details">
              <div className="flex justify-between total-price">
                <h3 className="text-xl font-bold">Total Price</h3>
                <h3 className="text-xl font-bold">₹{totalPrice}</h3>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between total-quantity">
                <h3 className="text-xl font-bold">Total Products</h3>
                <h3 className="text-xl font-bold">{quantity}</h3>
              </div>
            </div>
            <div className="w-full buy-now md:w-28">
              <Link
                to="/payment"
                state={{
                  orderData: {
                    list: cart,
                    total: totalPrice,
                    total_quantity: quantity,
                  },
                }}
                className="block w-full p-4 text-lg font-semibold text-center bg-white rounded-sm shadow text-cyan-900 shadow-gray-900"
              >
                Proceed To Buy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
