import { useContext, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import Modal from "../../components/Modal";
import ModalButton from "../../components/ModalButton";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useModal from "../../hooks/useModal";
import useSellerOrders from "../../hooks/useSellerOrders";
import emptyStoreIcon from "../../assets/images/empty-store-icon.png";
import { ScreenContext } from "../../contexts/screenContext";
import { timeSince } from "../../utils/timeFormater";
import ConfirmationForm from "../../components/ConfirmationForm";
import { AnimatePresence, motion } from "framer-motion";
import useTitle from "../../hooks/useTitle";

export default function SellerOrder() {
  useTitle("Your Orders | Elegant Apparels");
  const { modalOpen, close, open } = useModal();
  const [modalForm, setModalForm] = useState("");
  const [orderFilter, setOrderFilter] = useState("All"); // [All, Processing, Delivered, Cancelled]
  const { orders, processing, confirmDelivery, cancelDelivery } =
    useSellerOrders();
  const currentOrderIndex = useRef(0);
  const mobileScreen = useContext(ScreenContext);

  const confirmDeliveryHandler = () => {
    confirmDelivery(orders[currentOrderIndex.current]);
    close();
  };

  const cancelOrderHandler = () => {
    cancelDelivery(orders[currentOrderIndex.current]);
    close();
  };

  return (
    <PageFadeTransitionContainer className="min-h-100vh relative pt-12">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          modalForm === "Confirm Delivery" ? (
            <ConfirmationForm
              text="Are you sure you want to mark this order delivered?"
              close={close}
              success="Confirm"
              successAction={confirmDeliveryHandler}
            />
          ) : modalForm === "cancel" ? (
            <ConfirmationForm
              text="Are you sure you want to cancel this order?"
              close={close}
              success="Cancel"
              cancel="No"
              successAction={cancelOrderHandler}
            />
          ) : null
        }
      />
      <h1 className="text-center text-2xl font-semibold text-cyan-900 underline underline-offset-8">
        Your Orders
      </h1>
      <div className="max-w-1200 mx-auto mt-8">
        <div className="w-full max-w-500 text-cyan-900 px-4 flex justify-between items-center gap-x-4">
          <span
            style={
              orderFilter === "All"
                ? { backgroundColor: "#164e63", color: "white" }
                : { backgroundColor: "white", color: "#164e63" }
            }
            onClick={() => setOrderFilter("All")}
            className="border border-cyan-900 p-2"
          >
            All
          </span>
          <span
            style={
              orderFilter === "PROCESSING"
                ? { backgroundColor: "#164e63", color: "white" }
                : { backgroundColor: "white", color: "#164e63" }
            }
            onClick={() => setOrderFilter("PROCESSING")}
            className="border border-cyan-900 p-2"
          >
            New
          </span>
          <span
            style={
              orderFilter === "Delivered"
                ? { backgroundColor: "#164e63", color: "white" }
                : { backgroundColor: "white", color: "#164e63" }
            }
            onClick={() => setOrderFilter("Delivered")}
            className="border border-cyan-900 p-2"
          >
            Delivered
          </span>
          <span
            style={
              orderFilter === "Cancelled"
                ? { backgroundColor: "#164e63", color: "white" }
                : { backgroundColor: "white", color: "#164e63" }
            }
            onClick={() => setOrderFilter("Cancelled")}
            className="border border-cyan-900 p-2"
          >
            Cancelled
          </span>
        </div>
      </div>
      {processing ? (
        <ClipLoader
          color="#164e63"
          loading={true}
          size={60}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <motion.div
          layout
          className="products flex flex-col items-center gap-4 my-8 max-w-1200 p-2 mx-auto"
        >
          {orders.length === 0 && (
            <div className="text-center bg-yellow-400 px-6 py-4 rounded w-full max-w-500 shadow shadow-black">
              <span className="font-medium text-xl">
                Nothing yet bought from your shop
              </span>
              <img
                src={emptyStoreIcon}
                alt="empty store icon"
                className="w-40 h-40 mx-auto"
              />
            </div>
          )}
          <AnimatePresence>
            {orders
              .filter((order) =>
                orderFilter === "All"
                  ? true
                  : order?.orderStatus === orderFilter
              )
              .map((order, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={order?.id}
                  className="product overflow-hidden flex flex-wrap md:flex-nowrap justify-between gap-2 bg-gray-200 h-full rounded mx-4 text-gray-500 w-full shadow-sm shadow-black"
                >
                  <div className="product-about flex justify-between gap-8 w-full md:w-2/3">
                    <div className="product-image w-1/3 h-32 py-1">
                      <img
                        className="w-full h-full object-contain"
                        src={order?.cartProductDTO?.product_imageUrl}
                        alt="product_img"
                      />
                    </div>
                    <div className="product-details text-[.85rem] md:text-lg w-3/5 md:w-2/3">
                      <div className="flex flex-wrap justify-start items-center gap-x-4">
                        <div
                          title={order?.cartProductDTO?.product_name}
                          className="product-name text-lg md:text-xl font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full"
                        >
                          {order?.cartProductDTO?.product_name}
                        </div>
                        <div className="product-price whitespace-nowrap overflow-hidden text-ellipsis">
                          <span>Price: </span>
                          {order?.cartProductDTO?.product_price >
                            order?.cartProductDTO?.discountPrice && (
                            <span className="line-through">
                              &#8377;{order?.cartProductDTO?.product_price}{" "}
                            </span>
                          )}
                          <span>
                            &#8377;{order?.cartProductDTO?.discountPrice}
                          </span>
                        </div>
                        <div className="product-quantity whitespace-nowrap overflow-hidden text-ellipsis">
                          <span>Quantity: </span>
                          <span>{order?.cartProductDTO?.quantity}</span>
                        </div>
                      </div>
                      <div className="order-place-date whitespace-nowrap overflow-hidden text-ellipsis">
                        {`Order placed ${timeSince(new Date(order?.date))} ago`}
                      </div>
                      <div className="order-delivery-address md:whitespace-nowrap overflow-hidden text-ellipsis">
                        {`Delivery Address: ${order?.address}`}
                      </div>
                    </div>
                  </div>
                  <div className="product-actions flex md:flex-col justify-center md:justify-evenly w-full md:w-1/4">
                    {order?.orderStatus === "PROCESSING" ? (
                      <>
                        <ModalButton
                          onClick={() => {
                            setModalForm("Confirm Delivery");
                            currentOrderIndex.current = index;
                            open();
                          }}
                          className="group product-action-btn p-2 md:p-0 w-full md:w-auto bg-green-600 text-white md:rounded-tr h-full md:shadow-md md:shadow-black"
                        >
                          <span className="inline-block group-hover:scale-105 transition-transform duration-200">
                            {!mobileScreen && "Confirm Delivery  "}
                            <i className="fa fa-check"></i>
                          </span>
                        </ModalButton>
                        <ModalButton
                          onClick={() => {
                            setModalForm("cancel");
                            currentOrderIndex.current = index;
                            open();
                          }}
                          className="group product-action-btn p-2 md:p-0 w-full md:w-auto bg-red-600 text-white md:rounded-br h-full md:shadow-md md:shadow-black"
                        >
                          <span className="inline-block group-hover:scale-105 transition-transform duration-200">
                            {!mobileScreen && "Cancel Order  "}
                            <i className="fa fa-trash"></i>
                          </span>
                        </ModalButton>
                      </>
                    ) : (
                      <div className="bg-cyan-900 w-full p-2 md:p-0 md:w-auto text-[.85rem] md:text-lg font-medium text-white h-full flex justify-center items-center md:shadow-md md:shadow-black md:rounded-r">
                        <span>{order?.orderStatus}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageFadeTransitionContainer>
  );
}
