import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ConfirmationForm from "../../components/ConfirmationForm";
import Modal from "../../components/Modal";
import ModalButton from "../../components/ModalButton";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useModal from "../../hooks/useModal";
import useOrders from "../../hooks/useOrders";
import { timeLeft, timeSince } from "../../utils/timeFormater";

export default function Orders() {
  const { orders, cancelOrder, loading } = useOrders();
  const { modalOpen, close, open } = useModal();
  const [orderIndex, setOrderIndex] = useState(0);

  return (
    <PageFadeTransitionContainer className="min-h-100vh pt-12">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          <ConfirmationForm
            text="Are you sure you want to cancel this order?"
            success="Yes"
            cancel="No"
            close={close}
            successAction={() => {
              cancelOrder(orders[orderIndex]);
              close();
            }}
          />
        }
      />
      <div className="cart-wrapper ">
        <div className="cart-container px-2 py-4 max-w-1000 mx-auto">
          <div className="cart-header text-center bg-cyan-900 text-white rounded-t py-2">
            <h1 className="text-2xl font-bold">Your Orders</h1>
          </div>
          <div className="cart-body scroll shadow-inner shadow-black h-[70vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : orders.length === 0 ? (
              <div className="no-products text-center text-cyan-900 flex flex-col gap-y-4 justify-center items-center w-full mt-8 mb-28">
                <div className="-rotate-6 text-3xl bg-orange-300 w-14 h-14 rounded-full">
                  <i className="fa-solid fa-shopping-cart"></i>
                </div>
                <h1 className="text-2xl font-medium">
                  You had ordered nothing
                </h1>
                <p className="text-lg">Lets grab some great deals</p>
                <Link
                  to="/categories"
                  className="bg-cyan-900 text-white px-4 py-2 rounded-md"
                >
                  Let's Shop
                </Link>
              </div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order?.id}
                  className="cart-item my-1 border-b-2 px-12 md:px-8 py-4 flex flex-col md:flex-row flex-wrap md:flex-nowrap justify-between items-center md:items-start"
                >
                  <Link
                    to={`/product/${order?.cartProductDTO?.product_id}`}
                    className="cart-item-image w-40 h-40 mx-auto md:mx-0 order-1 bg-orange-300 rounded-full"
                  >
                    <img
                      className="w-full h-full object-contain hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-in-out"
                      src={order?.cartProductDTO?.product_imageUrl}
                      alt={order?.cartProductDTO?.product_name}
                    />
                  </Link>
                  <div className="cart-item-details w-full md:w-1/2 px-4 md:px-0 order-2 flex flex-wrap gap-x-4">
                    <Link
                      to={`/product/${order?.cartProductDTO?.product_id}`}
                      title={order?.cartProductDTO?.product_name}
                      className="cart-item-name overflow-hidden"
                    >
                      <h3 className="text-lg md:text-xl font-medium text-cyan-900 whitespace-nowrap text-ellipsis overflow-hidden">
                        {order?.cartProductDTO?.product_name}
                      </h3>
                    </Link>
                    <div className="text-lg font-medium text-gray-400 w-full flex justify-start items-center gap-x-4">
                      <div className="cart-item-price">
                        <h3>₹{order?.cartProductDTO?.discountPrice.toLocaleString("en-IN")}</h3>
                      </div>
                      <div className="cart-item-quantity">
                        <h3>
                          {"Quantity: " + order?.cartProductDTO?.quantity}
                        </h3>
                      </div>
                      {order?.cartProductDTO?.size && (
                        <div className="cart-item-size">
                          <h3>{"Size: " + order?.cartProductDTO?.size}</h3>
                        </div>
                      )}
                    </div>
                    <div className="w-full text-[.85rem] text-gray-400 flex flex-col justify-start items-start">
                      <div className="order-place-date">
                        <h3>
                          {`Order placed ${timeSince(
                            new Date(order?.date)
                          )} ago`}
                        </h3>
                      </div>
                      <div className="order-delivery-date">
                        <h3>
                          Delivery Status:{" "}
                          {order?.orderStatus === "PROCESSING"
                            ? `Will be delivered within ${timeLeft(
                                new Date(order?.expDelivary)
                              )}`
                            : order?.orderStatus === "Delivered"
                            ? `Delivered`
                            : order?.orderStatus === "Cancelled"
                            ? `Cancelled`
                            : order?.orderStatus === "Cancelled by Seller"
                            ? "Cancelled by Seller"
                            : ""}
                        </h3>
                      </div>
                      <div className="payment-option">
                        <h3>{`Payment: ${
                          order?.orderStatus === "PROCESSING" &&
                          order?.method === "COD"
                            ? "To be paid on delivery"
                            : order?.orderStatus === "Cancelled" ||
                              order?.orderStatus === "Cancelled by Seller"
                            ? "Order Cancelled. If you have paid, it will be refunded within 7 days"
                            : "Done"
                        }`}</h3>
                      </div>
                      {(order?.orderStatus === "PROCESSING" ||
                        order?.orderStatus === "Delivered") && (
                        <div className="delivery-address overflow-hidden w-full">
                          <h3 className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {order?.orderStatus === "PROCESSING"
                              ? `Will be delivered to ${order?.address}`
                              : `Delivered to ${order?.address}`}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="cart-item-actions flex md:flex-col md:w-1/6 justify-between items-center gap-4 order-3">
                    <div className="total-price">
                      <h3 className="text-lg md:text-xl font-semibold text-cyan-900">
                        {"₹" +
                          (order?.cartProductDTO?.discountPrice *
                            order?.cartProductDTO?.quantity).toLocaleString("en-IN")}
                      </h3>
                    </div>
                    {order?.orderStatus === "PROCESSING" && (
                      <ModalButton
                        onClick={() => {
                          setOrderIndex(index);
                          open();
                        }}
                        className="bg-red-600 w-full border-red-600 border-2 text-white px-2 py-1 rounded-sm shadow-sm shadow-gray-900"
                      >
                        Cancel Order
                      </ModalButton>
                    )}
                    {order?.orderStatus === "Delivered" && (
                      <Link
                        to={`/product/${order?.cartProductDTO?.product_id}#product-review`}
                        className="w-full text-center"
                      >
                        <span className="product-review block p-2 bg-gray-400 rounded-sm shadow-sm text-white shadow-gray-900">
                          Give Feedback
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer px-6 md:px-12 py-6 bg-cyan-900 text-white rounded-b flex flex-col md:flex-row justify-between items-center gap-6"></div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
