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
import useTitle from "../../hooks/useTitle";

export default function Orders() {
  useTitle("Your Orders || Elegant Apparels");

  const { orders, cancelOrder, loading } = useOrders();
  const { modalOpen, close, open } = useModal();
  const [orderIndex, setOrderIndex] = useState(0);

  return (
    <PageFadeTransitionContainer className="pt-12 min-h-100vh">
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
        <div className="px-2 py-4 mx-auto cart-container max-w-1000">
          <div className="py-2 text-center text-white rounded-t cart-header bg-cyan-900">
            <h1 className="text-2xl font-bold">Your Orders</h1>
          </div>
          <div className="cart-body scroll shadow-inner shadow-black h-[70vh] overflow-auto relative">
            {loading ? (
              <ClipLoader
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                color={"#164e63"}
                loading={true}
                size={55}
              />
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full mt-8 text-center no-products text-cyan-900 gap-y-4 mb-28">
                <div className="text-3xl bg-orange-300 rounded-full -rotate-6 w-14 h-14">
                  <i className="fa-solid fa-shopping-cart"></i>
                </div>
                <h1 className="text-2xl font-medium">
                  You had ordered nothing
                </h1>
                <p className="text-lg">Lets grab some great deals</p>
                <Link
                  to="/categories"
                  className="px-4 py-2 text-white rounded-md bg-cyan-900"
                >
                  Let's Shop
                </Link>
              </div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order?.id}
                  className="flex flex-col flex-wrap items-center justify-between px-12 py-4 my-1 border-b-2 cart-item md:px-8 md:flex-row md:flex-nowrap md:items-start"
                >
                  <Link
                    to={`/product/${order?.cartProductDTO?.product_id}`}
                    className="order-1 w-40 h-40 mx-auto bg-orange-300 rounded-full cart-item-image md:mx-0"
                  >
                    <img
                      className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
                      src={order?.cartProductDTO?.product_imageUrl}
                      alt={order?.cartProductDTO?.product_name}
                    />
                  </Link>
                  <div className="flex flex-wrap order-2 w-full px-4 cart-item-details md:w-1/2 md:px-0 gap-x-4">
                    <Link
                      to={`/product/${order?.cartProductDTO?.product_id}`}
                      title={order?.cartProductDTO?.product_name}
                      className="overflow-hidden cart-item-name"
                    >
                      <h3 className="overflow-hidden text-lg font-medium md:text-xl text-cyan-900 whitespace-nowrap text-ellipsis">
                        {order?.cartProductDTO?.product_name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-start w-full text-lg font-medium text-gray-400 gap-x-4">
                      <div className="cart-item-price">
                        <h3>
                          ₹
                          {order?.cartProductDTO?.discountPrice.toLocaleString(
                            "en-IN"
                          )}
                        </h3>
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
                        <div className="w-full overflow-hidden delivery-address">
                          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {order?.orderStatus === "PROCESSING"
                              ? `Will be delivered to ${order?.address}`
                              : `Delivered to ${order?.address}`}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between order-3 gap-4 cart-item-actions md:flex-col md:w-1/6">
                    <div className="total-price">
                      <h3 className="text-lg font-semibold md:text-xl text-cyan-900">
                        {"₹" +
                          (
                            order?.cartProductDTO?.discountPrice *
                            order?.cartProductDTO?.quantity
                          ).toLocaleString("en-IN")}
                      </h3>
                    </div>
                    {order?.orderStatus === "PROCESSING" && (
                      <ModalButton
                        onClick={() => {
                          setOrderIndex(index);
                          open();
                        }}
                        className="w-full px-2 py-1 text-white bg-red-600 border-2 border-red-600 rounded-sm shadow-sm shadow-gray-900"
                      >
                        Cancel Order
                      </ModalButton>
                    )}
                    {order?.orderStatus === "Delivered" && (
                      <Link
                        to={`/product/${order?.cartProductDTO?.product_id}#product-review`}
                        className="w-full text-center"
                      >
                        <span className="block p-2 text-white bg-gray-400 rounded-sm shadow-sm product-review shadow-gray-900">
                          Give Feedback
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 text-white rounded-b cart-footer md:px-12 bg-cyan-900 md:flex-row"></div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
