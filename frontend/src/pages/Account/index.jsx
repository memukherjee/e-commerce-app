import { useContext, useEffect } from "react";
import { motion as m } from "framer-motion";
import AccountOptionCard from "../../components/AccountOptionCard";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import AnimatedText from "../../components/AnimatedText";

export default function Account() {
  useEffect(() => {
    document.title = "Account || Elegant Apparels";
  }, []);
  const { user } = useContext(UserContext);
  const accountOptions = [
    {
      name: "Profile",
      description:
        "Edit name, email, mobile no. and other profile informations",
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
    },
    {
      name: "Addresses",
      description: "View and manage your addresses",
      icon: "fas fa-map-marker-alt",
      link: "/account/addresses",
      color: "#fdba74",
    },
    {
      name: "Wishlist",
      description: "View and manage your wishlist",
      icon: "fas fa-heart",
      link: "/account/wishlist",
      color: "#fca5a5",
    },
    {
      name: "Coupons",
      description: "View and manage your coupons",
      icon: "fas fa-tags",
      link: "/account/coupons",
      color: "#d8b4fe",
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
  ];
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-100vh pt-16 pb-8 w-11/12 max-w-1000 mx-auto">
        <Link to="/account/profile">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
           className="profile-image-container w-16 mx-auto rounded-full overflow-hidden">
            <img
              src={user.profilePic}
              alt="profile"
              className="profile-image w-full h-full object-cover"
            />
          </m.div>
        </Link>
        <span className="font-pen text-cyan-900 text-4xl font-bold block mb-4">
          <AnimatedText
            text={`Hi, ${user.name.split(" ")[0]}`}
            align="center"
            direction="y"
          />
        </span>
        <div className="account-options flex flex-wrap justify-start gap-2">
          {accountOptions.map((option, index) => (
            <AccountOptionCard key={index} option={option} />
          ))}
        </div>
      </div>
    </m.div>
  );
}
