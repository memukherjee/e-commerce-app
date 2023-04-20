import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputBox from "../../components/InputBox";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import { UserContext } from "../../contexts/userContext";
import usePayment from "../../hooks/usePayment";
import useTitle from "../../hooks/useTitle";

export default function Payment() {
  useTitle("Select Payment Details || Elegant Apparels");
  const { loading: paymentLoading, createPayment, placeOrder } = usePayment();
  const [paymentMethod, setPaymentMethod] = useState("default");
  const { user } = useContext(UserContext);
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");

  const orderData = useLocation()?.state?.orderData;
  const buyCartItems = (e) => {
    e.preventDefault();
    if (paymentMethod === "default") {
      toast.warn("Please select a payment method");
      return;
    } else if (paymentMethod === "online") {
      createPayment(orderData, deliveryAddress);
    } else if (paymentMethod === "cod") {
      placeOrder({}, orderData, deliveryAddress, null);
    }
  };
  return (
    <PageFadeTransitionContainer className="pt-16 text-center min-h-100vh">
      <div className="w-11/12 mx-auto text-left payment max-w-450">
        <h1 className="pt-8 pb-2 text-2xl font-bold underline font-pen text-cyan-900 underline-offset-8">
          Order Summary
        </h1>
        <div className="order-products">
          <h2 className="pb-8 text-lg font-medium text-gray-400">{`Total Products: ${orderData.total_quantity}`}</h2>
          <div className="flex flex-wrap items-center justify-center w-full gap-4 pb-4 overflow-auto order-product-images">
            {orderData.list.map((product) => (
              <div
                key={product.product_id + product.size}
                className="w-20 h-20 bg-orange-300 rounded-full"
              >
                <img
                  src={product.product_imageUrl}
                  alt={product.product_name}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={buyCartItems} className="w-full pt-8 mx-auto">
          <InputBox
            label="Delivery Address"
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <select
            className="w-full py-2 mb-4 overflow-auto text-xl placeholder-transparent bg-transparent border-b-2 border-gray-400 outline-none resize-none md:text-left peer focus:outline-none focus:border-cyan-900"
            name="paymentMethod"
            id="paymentMethod"
            style={
              paymentMethod === "default"
                ? { color: "#9CA3AF" }
                : { color: "#164e63" }
            }
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option disabled value="default">
              Select a Payment Method
            </option>
            <option value="online">Online Payment</option>
            <option value="cod">Cash On Delivery</option>
          </select>
          <button
            className="w-full p-2 text-xl text-white rounded-sm bg-cyan-900"
            type="submit"
          >
            {paymentLoading ? (
              <PulseLoader color="#fff" loading={true} size={10} />
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>
    </PageFadeTransitionContainer>
  );
}
