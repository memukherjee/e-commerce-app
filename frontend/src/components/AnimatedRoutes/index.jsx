import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { lazy, Suspense, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { SellerContext } from "../../contexts/sellerContext";
import formBgUser from "../../assets/images/form-bg-user.jpg";
import formBgSeller from "../../assets/images/form-bg-seller.jpg";
import formBgAdmin from "../../assets/images/form-bg-admin.jpg";
import formBgForgotPassword from "../../assets/images/form-bg-forgot-password.jpg";
import Loader from "../Loader";

const Navbar = lazy(() => import("../Navbar"));
const Home = lazy(() => import("../../pages/Home"));
const Products = lazy(() => import("../../pages/Products"));
const Product = lazy(() => import("../../pages/Product"));
const Account = lazy(() => import("../../pages/Account"));
const Profile = lazy(() => import("../../pages/Account/Profile"));
const Auth = lazy(() => import("../../pages/Auth"));
const UserAuthForm = lazy(() => import("../UserAuthForm"));
const SellerAuthForm = lazy(() => import("../SellerAuthForm"));
const SellerDashboard = lazy(() => import("../../pages/SellerDashboard"));
const SellerProducts = lazy(() => import("../../pages/SellerProducts"));
const AdminAuthForm = lazy(() => import("../AdminAuthForm"));
const ForgotPasswordAuthForm = lazy(() => import("../ForgotPasswordAuthForm"));
const LogOut = lazy(() => import("../../pages/LogOut"));
const About = lazy(() => import("../../pages/About"));
const ContactUs = lazy(() => import("../../pages/ContactUs"));
const Category = lazy(() => import("../../pages/Category"));
const NotFound = lazy(() => import("../../pages/404-NotFound"));

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { seller } = useContext(SellerContext);

  const ifAuthed = (condition, Component, AlternateComponent) => {
    return condition ? Component : AlternateComponent;
  };

  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Navbar route={location.pathname} />
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route
            path="auth"
            element={<Auth Form={UserAuthForm} formBg={formBgUser} />}
          />
          <Route path="seller">
            <Route
              index
              element={ifAuthed(
                seller,
                <SellerDashboard />,
                <Auth Form={SellerAuthForm} formBg={formBgSeller} />
              )}
            />
            <Route path="products" element={<SellerProducts />} />
            <Route path="logout" element={<LogOut sellerRoute />} />
          </Route>
          <Route
            path="admin"
            element={<Auth Form={AdminAuthForm} formBg={formBgAdmin} />}
          />
          <Route
            path="forgot-password"
            element={
              <Auth
                Form={ForgotPasswordAuthForm}
                formBg={formBgForgotPassword}
              />
            }
          />
          <Route path="logout" element={<LogOut />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="account">
            <Route
              index
              element={ifAuthed(
                user,
                <Account />,
                <Auth Form={UserAuthForm} />
              )}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="categories" element={<Category />} />
          <Route path="product/:pid" element={<Product />} />
          <Route path="products/" element={<Products />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default memo(AnimatedRoutes);
