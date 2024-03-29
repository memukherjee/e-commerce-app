const getAccountOptions = (userData) => [
  {
    name: "Profile",
    description: "Edit name, email, mobile no. and other profile informations",
    icon: "fas fa-user",
    link: "/account/profile",
    color: "#93c5fd",
  },
  {
    name: "Orders",
    description: "View your orders and track their status",
    icon: "fas fa-shopping-bag",
    link: "/account/orders",
    color: "#86efac",
    count: userData?.totalOrder ?? 0,
  },
  {
    name: "Cart",
    description: "Checkout your cart",
    icon: "fas fa-shopping-cart",
    link: "/cart",
    color: "#fcc135",
    count: userData?.totalCartItems ?? 0,
  },
  {
    name: "Wishlist",
    description: "View and manage your wishlist",
    icon: "fas fa-heart",
    link: "/account/wishlist",
    color: "#fca5a5",
    count: userData?.totalWishListItems ?? 0,
  },
  {
    name: "Contact Us",
    description: "Get in touch with us",
    icon: "fas fa-headset",
    link: "/contact-us",
    color: "#67e8f9",
  },
  {
    name: "Logout",
    description: "Logout from your account",
    icon: "fas fa-sign-out-alt",
    link: "/logout",
    color: "#aaa69d",
  },
  {
    name: "Logout All",
    description: "Logout from all devices",
    icon: "fa-solid fa-person-walking-arrow-right",
    link: "/logout?all=true",
    color: "#ccc",
  },
];

export default getAccountOptions;
