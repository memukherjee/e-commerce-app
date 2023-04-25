import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { SellerContext } from "../contexts/sellerContext";
import { getCookie } from "../utils/cookie";
import { toast } from "react-toastify";

export default function useSellerOrder() {
  const [orders, setOrders] = useState([]);
  const [processing, setProcessing] = useState(false);
  const ordersFetched = useRef(false);
  const { setSeller } = useContext(SellerContext);

  function cancelDelivery(order) {
    axios
      .put(process.env.REACT_APP_API + "/sellerOrder/cancel", order, {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setOrders((prev) => {
          return [
            ...prev.filter((o) => o.id !== order.id),
            { ...order, orderStatus: "Cancelled by Seller" },
          ];
        });
        setSeller((prev) => {
          return {
            ...prev,
            totalOrderCount: prev.totalOrderCount - 1,
          };
        });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }

  function confirmDelivery(order) {
    axios
      .put(process.env.REACT_APP_API + "/sellerOrder/deliver", order, {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setOrders((prev) => {
          return [
            ...prev.filter((o) => o.id !== order.id),
            { ...order, orderStatus: "Delivered" },
          ];
        });
        setSeller((prev) => {
          return {
            ...prev,
            totalOrderCount: prev.totalOrderCount - 1,
          };
        });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }

  function fetchOrders() {
    setProcessing(true);
    axios
      .get(process.env.REACT_APP_API + "/sellerOrder/getOrderedProduct", {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => setProcessing(false));
  }

  useEffect(() => {
    if (!ordersFetched.current) {
      fetchOrders();
    }
    return () => {
      ordersFetched.current = true;
    };
  }, []);

  return { orders, processing, confirmDelivery, cancelDelivery };
}
