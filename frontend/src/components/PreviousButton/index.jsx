import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ScreenContext } from "../../contexts/screenContext";

export default function PreviousButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    navigate(-1);
  };
  const mobileScreen = useContext(ScreenContext);
  const path =
    location.pathname[location.pathname.length - 1] === "/"
      ? location.pathname.slice(0, -1)
      : location.pathname;
  const prohibitedRoutes = new Set([
    "",
    "/auth",
    "/seller",
    "/admin",
    "/products",
    "/products/all",
  ]);
  return (
    !mobileScreen && !prohibitedRoutes.has(path) && (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 p-6 flex justify-center items-center rounded-full fixed z-[16] top-14 left-5 md:left-10 bg-black bg-opacity-50 shadow-sm shadow-black backdrop-blur-sm"
        onClick={goBack}
      >
        <span className="text-white">
          <i className="fa-solid fa-chevron-left"></i>
        </span>
      </motion.div>
    )
  );
}
