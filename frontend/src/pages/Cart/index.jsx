import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useCart from "../../hooks/useCart";

export default function Cart() {
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
    <PageFadeTransitionContainer className="min-h-100vh pt-12 md:pt-0">
      <div className="cart-wrapper ">
        <div className="cart-container px-2 py-4 max-w-1000 mx-auto">
          <div className="cart-header text-center bg-cyan-900 text-white rounded-t py-2">
            <h1 className="text-2xl font-bold">Cart</h1>
          </div>
          <div className="cart-body scroll shadow-inner shadow-black h-[60vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : cart.length === 0 ? (
              <div className="no-products text-center text-cyan-900 flex flex-col gap-y-4 justify-center items-center w-full mt-8 mb-28">
                <div className="-rotate-6 text-3xl bg-orange-300 w-14 h-14 rounded-full">
                  <i className="fa-solid fa-shopping-cart"></i>
                </div>
                <h1 className="text-2xl font-medium">Cart is Empty</h1>
                <p className="text-lg">Lets grab some great deals</p>
                <Link
                  to="/categories"
                  className="bg-cyan-900 text-white px-4 py-2 rounded-md"
                >
                  Let's Shop
                </Link>
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product?.product_id + product?.size}
                  className="cart-item my-1 border-b-2 px-12 py-4 flex flex-wrap md:flex-nowrap justify-between items-center md:items-start"
                >
                  <Link
                    to={`/product/${product?.product_id}`}
                    className="cart-item-image w-40 h-40 mx-auto md:mx-0 order-1 bg-orange-300 rounded-full"
                  >
                    <img
                      className="w-full h-full object-contain hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-in-out"
                      src={product?.product_imageUrl}
                      alt={product?.product_name}
                    />
                  </Link>
                  <div className="cart-item-details w-full md:w-1/2 px-4 md:px-0 order-3 md:order-2">
                    <Link
                      to={`/product/${product?.product_id}`}
                      title={product?.product_name}
                      className="cart-item-name"
                    >
                      <h3 className="text-lg md:text-xl font-bold text-cyan-900 whitespace-nowrap text-ellipsis overflow-hidden">
                        {product?.product_name}
                      </h3>
                    </Link>
                    <div className="cart-item-price">
                      <h3 className="text-lg font-bold text-cyan-900">
                        ₹{product?.discountPrice}
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
                  <div className="cart-item-actions flex flex-col gap-4 order-2 md:order-3">
                    <div className="cart-item-quantity border-cyan-900 rounded-md overflow-hidden border-2 flex items-center">
                      <button
                        onClick={() => decreaseItemQuantity(product)}
                        className="bg-cyan-900 text-white px-2 py-1"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="text-lg w-8 text-center font-bold text-cyan-900">
                        {product?.quantity}
                      </span>
                      <button
                        onClick={() => increaseItemQuantity(product)}
                        className="bg-cyan-900 text-white px-2 py-1"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product)}
                      className="bg-red-600 border-red-600 border-2 text-white px-2 py-1 rounded-md"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer px-6 md:px-12 py-6 bg-cyan-900 text-white rounded-b flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="cart-details w-full">
              <div className="total-price flex justify-between">
                <h3 className="text-xl font-bold">Total Price</h3>
                <h3 className="text-xl font-bold">₹{totalPrice}</h3>
              </div>
              <hr className="my-2" />
              <div className="total-quantity flex justify-between">
                <h3 className="text-xl font-bold">Total Products</h3>
                <h3 className="text-xl font-bold">{quantity}</h3>
              </div>
            </div>
            <div className="buy-now w-full md:w-28">
              <Link
                to="/payment"
                state={{
                  orderData: {
                    list: cart,
                    total: totalPrice,
                    total_quantity: quantity,
                  },
                }}
                className="w-full block text-center bg-white text-cyan-900 text-lg font-semibold rounded-sm p-4 shadow-gray-900 shadow"
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
