import { useContext, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useModal from "../../../hooks/useModal";
import useSellerOrders from "../../../hooks/useSellerOrders";
import emptyStoreIcon from "../../../assets/images/empty-store-icon.png";
import { ScreenContext } from "../../../contexts/screenContext";
import { timeSince } from "../../../utils/timeFormater";
import ConfirmationForm from "../../../components/ConfirmationForm";
import useTitle from "../../../hooks/useTitle";
import AnimatedText from "../../../components/AnimatedText";

export default function SellerOrder() {
  useTitle("Your Orders || Elegant Apparels");
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
    <PageFadeTransitionContainer className="relative pt-16 min-h-100vh">
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
      <AnimatedText
        className="my-4 text-2xl font-bold font-pen md:text-4xl text-cyan-900"
        text={"Your Orders"}
        direction="y"
        size="large"
        align="center"
        delay={0.5}
      />
      <div className="mx-auto mt-8 max-w-1200">
        <div className="flex items-center justify-between w-full px-4 max-w-500 text-cyan-900 gap-x-4">
          <span
            style={
              orderFilter === "All"
                ? { backgroundColor: "#164e63", color: "white" }
                : { backgroundColor: "white", color: "#164e63" }
            }
            onClick={() => setOrderFilter("All")}
            className="p-2 border border-cyan-900"
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
            className="p-2 border border-cyan-900"
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
            className="p-2 border border-cyan-900"
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
            className="p-2 border border-cyan-900"
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
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2"
        />
      ) : (
        <motion.div
          layout
          className="flex flex-col items-center gap-4 p-2 mx-auto my-8 products max-w-1200"
        >
          {orders.length === 0 && (
            <div className="w-full px-6 py-4 text-center bg-yellow-400 rounded shadow max-w-500 shadow-black">
              <span className="text-xl font-medium">
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
                  className="flex flex-wrap justify-between w-full h-full gap-2 mx-4 overflow-hidden text-gray-500 bg-gray-200 rounded shadow-sm product md:flex-nowrap shadow-black"
                >
                  <div className="flex justify-between w-full gap-8 product-about md:w-2/3">
                    <div className="w-1/3 h-32 py-1 product-image">
                      <img
                        className="object-contain w-full h-full"
                        src={order?.cartProductDTO?.product_imageUrl}
                        alt="product_img"
                      />
                    </div>
                    <div className="product-details text-[.85rem] md:text-lg w-3/5 md:w-2/3">
                      <div className="flex flex-wrap items-center justify-start gap-x-4">
                        <div
                          title={order?.cartProductDTO?.product_name}
                          className="w-full overflow-hidden text-lg font-medium product-name md:text-xl whitespace-nowrap text-ellipsis"
                        >
                          {order?.cartProductDTO?.product_name}
                        </div>
                        <div className="overflow-hidden product-price whitespace-nowrap text-ellipsis">
                          <span>Price: </span>
                          {order?.cartProductDTO?.product_price >
                            order?.cartProductDTO?.discountPrice && (
                            <span className="line-through">
                              &#8377;
                              {order?.cartProductDTO?.product_price.toLocaleString(
                                "en-IN"
                              )}{" "}
                            </span>
                          )}
                          <span>
                            &#8377;
                            {order?.cartProductDTO?.discountPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                        <div className="overflow-hidden product-quantity whitespace-nowrap text-ellipsis">
                          <span>Quantity: </span>
                          <span>{order?.cartProductDTO?.quantity}</span>
                        </div>
                      </div>
                      <div className="overflow-hidden order-place-date whitespace-nowrap text-ellipsis">
                        {`Order placed ${timeSince(new Date(order?.createdAt))} ago`}
                      </div>
                      <div className="overflow-hidden order-delivery-address md:whitespace-nowrap text-ellipsis">
                        {`Delivery Address: ${order?.address}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full product-actions md:flex-col md:justify-evenly md:w-1/4">
                    {order?.orderStatus === "PROCESSING" ? (
                      <>
                        <ModalButton
                          onClick={() => {
                            setModalForm("Confirm Delivery");
                            currentOrderIndex.current = index;
                            open();
                          }}
                          className="w-full h-full p-2 text-white bg-green-600 group product-action-btn md:p-0 md:w-auto md:rounded-tr md:shadow-md md:shadow-black"
                        >
                          <span className="inline-block transition-transform duration-200 group-hover:scale-105">
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
                          className="w-full h-full p-2 text-white bg-red-600 group product-action-btn md:p-0 md:w-auto md:rounded-br md:shadow-md md:shadow-black"
                        >
                          <span className="inline-block transition-transform duration-200 group-hover:scale-105">
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
