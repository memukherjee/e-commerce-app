import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/userContext";
import { getCookie } from "../utils/cookie";
import loadScript from "../utils/loadScript";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const usePayment = () => {
  const { user, fetchUserStat } = useContext(UserContext);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async (
    response,
    paymentData,
    deliveryAddress,
    orderId
  ) => {
    setLoading(true);
    const data = {
      cartDTO: paymentData,
      address: deliveryAddress,
      orderCreationId: orderId,
      razorpayPaymentId: response?.razorpay_payment_id,
      razorpayOrderId: response?.razorpay_order_id,
      razorpaySignature: response?.razorpay_signature,
    };

    // console.log(data);

    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/order/placeOrder",
        data,
        {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        }
      );

      console.log(result);
      fetchUserStat(getCookie("refreshToken"));
      toast.success("Order placed successfully");
      navigate("/account/orders");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (paymentData, deliveryAddress) => {
    setLoading(true);
    const resp = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!resp) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_API + "/order/payment",
        paymentData,
        {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        }
      );
      // console.log(res);
      setPayment(res.data);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: res.data?.amount_due,
        currency: res.data?.currency,
        name: "Elegant Apparels",
        description: "Test Transaction",
        image: { logo },
        order_id: res.data?.id,
        handler: async (response) =>
          await placeOrder(
            response,
            paymentData,
            deliveryAddress,
            res?.data?.id
          ),
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.mobile,
        },
        notes: {
          address: user?.address,
        },
        theme: {
          color: "#164e63",
        },
      };

      // console.log(options);

      const paymentObject = new window.Razorpay(options);
      await paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { payment, loading, createPayment, placeOrder };
};

export default usePayment;
