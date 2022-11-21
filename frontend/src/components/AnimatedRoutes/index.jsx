import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "../Loader";

const Home = lazy(() => import("../../pages/Home"));
const Products = lazy(() => import("../../pages/Products"));
const Product = lazy(() => import("../../pages/Product"));
const Account = lazy(() => import("../../pages/Account"));
const Auth = lazy(() => import("../../pages/Auth"));
const About = lazy(() => import("../../pages/About"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const ContactUs = lazy(() => import("../../pages/ContactUs"));
const Category = lazy(() => import("../../pages/Category"));
const NotFound = lazy(() => import("../../pages/404-NotFound"));

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const ifAuthed = (Component) => {
    return user ? Component : <Auth />;
  };

  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/account" element={ifAuthed(<Account />)} />
          <Route path="/categories" element={<Category />} />
          <Route path="/product/:pid" element={<Product />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
