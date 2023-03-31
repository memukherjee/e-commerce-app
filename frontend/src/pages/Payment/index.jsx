import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputBox from "../../components/InputBox";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import { UserContext } from "../../contexts/userContext";
import usePayment from "../../hooks/usePayment";

export default function Payment() {
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
    <PageFadeTransitionContainer className="min-h-100vh text-center">
      <div className="payment w-11/12 max-w-450 mx-auto text-left">
        <h1 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 pt-8 pb-2">
          Order Summary
        </h1>
        <div className="order-products">
          <h2 className="pb-8 text-lg text-gray-400 font-medium">{`Total Products: ${orderData.total_quantity}`}</h2>
          <div className="order-product-images w-full pb-4 flex flex-wrap justify-center items-center gap-4 overflow-auto">
            {orderData.list.map((product) => (
              <div key={product.product_id + product.size} className="w-20 h-20 bg-orange-300 rounded-full">
                <img
                  src={product.product_imageUrl}
                  alt={product.product_name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={buyCartItems} className="w-full mx-auto pt-8">
          <InputBox
            label="Delivery Address"
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <select
            className="w-full py-2 mb-4 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
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
            className="bg-cyan-900 text-white text-xl w-full p-2 rounded-sm"
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
