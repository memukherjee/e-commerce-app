import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "../Loader";

const Home = lazy(() => import("../../pages/Home"));
const Products = lazy(() => import("../../pages/Products"));
const Product = lazy(() => import("../../pages/Product"));
const Auth = lazy(() => import("../../pages/Auth"));
const ContactUs = lazy(() => import("../../pages/ContactUs"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:pid" element={<Product />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="*" element={<Products />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default AnimatedRoutes;
