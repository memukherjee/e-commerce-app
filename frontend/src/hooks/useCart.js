import axios from "axios";
import { useRef } from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/userContext";
import { getCookie } from "../utils/cookie";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const cartFetched = useRef(false);

  const fetchCart = () => {
    axios
      .get(process.env.REACT_APP_API + "/cart/showcart", {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setCart(res.data.list);
        setTotalPrice(res.data.total);
        setQuantity(res.data.total_quantity);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!cartFetched.current) {
      fetchCart();
    }
    return () => {
      cartFetched.current = true;
    };
  }, []);

  const addToCart = useCallback(
    async (product, productQuantity, productSize) => {
      if (!user) {
        navigate("/auth");
        toast("Login first to add to cart");
        return Promise.reject("Login first to add to cart");
      }

      if (product.size.length !== 0 && productSize === "") {
        toast.warn("Select a size first");
        return Promise.reject("Select a size first");
      }

      axios
        .post(
          process.env.REACT_APP_API + "/cart/add",
          {
            product_id: product.product_id,
            cart_quantity: productQuantity,
            size: productSize,
          },
          {
            headers: {
              Authorization: getCookie("refreshToken"),
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setUser((prevUser) => {
              return {
                ...prevUser,
                totalCartItems: prevUser.totalCartItems + productQuantity,
              };
            });
            return Promise.resolve("res.data");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to add to cart");
          return Promise.reject(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const removeFromCart = useCallback(
    (item) => {
      axios
        .delete(process.env.REACT_APP_API + `/cart/remove/${item.cart_id}`, {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        })
        .then((res) => {
          //   console.log(res);
          if (res.status === 200) {
            setUser((prevUser) => {
              return {
                ...prevUser,
                totalCartItems: prevUser.totalCartItems - item.quantity,
              };
            });
            const newCart = cart.filter(
              (cartItem) =>
                cartItem.product_id !== item.product_id ||
                cartItem.size !== item.size
            );
            setCart(newCart);
            setTotalPrice(
              newCart.reduce(
                (acc, item) => acc + item.discountPrice * item.quantity,
                0
              )
            );
            setQuantity(newCart.reduce((acc, item) => acc + item.quantity, 0));
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const increaseItemQuantity = useCallback(
    (item) => {
      addToCart(item, 1, item.size)
        .then(() => {
          setCart((prevCart) => {
            const newCart = prevCart.map((cartItem) => {
              const newItem = Object.assign({}, cartItem);
              if (
                cartItem.product_id === item.product_id &&
                cartItem.size === item.size
              ) {
                newItem.quantity = parseInt(newItem.quantity) + 1;
              }
              return newItem;
            });
            return newCart;
          });
          setTotalPrice(totalPrice + item.discountPrice);
          setQuantity(quantity + 1);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    },
    [totalPrice, quantity, addToCart]
  );

  const decreaseItemQuantity = useCallback(
    (item) => {
      if (item.quantity === 1) {
        removeFromCart(item);
        return;
      }
      addToCart(item, -1, item.size)
        .then(() => {
          setCart((prevCart) => {
            const newCart = prevCart.map((cartItem) => {
              const newItem = Object.assign({}, cartItem);
              if (
                cartItem.product_id === item.product_id &&
                cartItem.size === item.size
              ) {
                newItem.quantity = parseInt(newItem.quantity) - 1;
              }
              return newItem;
            });
            return newCart;
          });
          setTotalPrice(totalPrice - item.discountPrice);
          setQuantity(quantity - 1);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    },
    [totalPrice, quantity, addToCart, removeFromCart]
  );

  return {
    cart,
    totalPrice,
    quantity,
    loading,
    increaseItemQuantity,
    decreaseItemQuantity,
    addToCart,
    removeFromCart,
  };
}
