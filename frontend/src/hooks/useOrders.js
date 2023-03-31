import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { getCookie } from "../utils/cookie";
import { UserContext } from "../contexts/userContext";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const ordersFetched = useRef(false);
  const { setUser } = useContext(UserContext);

  const cancelOrder = (order) => {
    axios
      .put(process.env.REACT_APP_API + "/order/cancel", order, {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setOrders((prev) => [...prev.filter((o) => o.id !== order.id), { ...order, orderStatus: "Cancelled" }]);
        setUser((prev) => ({ ...prev, totalOrder: prev.totalOrder - 1 }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function fetchOrders() {
    axios
      .get(process.env.REACT_APP_API + "/order/showOrder", {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setOrders(prev=>[...prev, ...res.data]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!ordersFetched.current) {
      fetchOrders();
    }
    return () => {
      ordersFetched.current = true;
    };
  }, []);

  return { orders, cancelOrder, loading };
}
