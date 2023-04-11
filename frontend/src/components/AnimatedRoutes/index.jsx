import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { lazy, Suspense, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { SellerContext } from "../../contexts/sellerContext";
import { AdminContext } from "../../contexts/adminContext";
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
const Wishlist = lazy(() => import("../../pages/Wishlist"));
const Orders = lazy(() => import("../../pages/Orders"));
const Profile = lazy(() => import("../../pages/Account/Profile"));
const Auth = lazy(() => import("../../pages/Auth"));
const Payment = lazy(() => import("../../pages/Payment"));
const UserAuthForm = lazy(() => import("../UserAuthForm"));
const SellerAuthForm = lazy(() => import("../SellerAuthForm"));
const SellerDashboard = lazy(() =>
  import("../../pages/Seller/SellerDashboard")
);
const SellerProducts = lazy(() => import("../../pages/Seller/SellerProducts"));
const SellerAccount = lazy(() => import("../../pages/Seller/SellerAccount"));
const SellerOrder = lazy(() => import("../../pages/Seller/SellerOrder"));
const SellerReviews = lazy(() => import("../../pages/Seller/SellerReviews"));
const AdminAuthForm = lazy(() => import("../AdminAuthForm"));
const AdminDashboard = lazy(() => import("../../pages/Admin/AdminDashboard"));
const Broadcast = lazy(() => import("../../pages/Admin/Broadcast"));
const CustomerManagementPage = lazy(() =>
  import("../../pages/Admin/CustomerManagementPage")
);
const SellerManagementPage = lazy(() =>
  import("../../pages/Admin/SellerManagementPage")
);
const SellerRequests = lazy(() => import("../../pages/Admin/SellerRequests"));
const ForgotPasswordAuthForm = lazy(() => import("../ForgotPasswordAuthForm"));
const LogOut = lazy(() => import("../../pages/LogOut"));
const About = lazy(() => import("../../pages/About"));
const ContactUs = lazy(() => import("../../pages/ContactUs"));
const Category = lazy(() => import("../../pages/Category"));
const Cart = lazy(() => import("../../pages/Cart"));
const NotFound = lazy(() => import("../../pages/404-NotFound"));

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { seller } = useContext(SellerContext);
  const { admin } = useContext(AdminContext);

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
            <Route path="account" element={<SellerAccount />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="orders" element={<SellerOrder />} />
            <Route path="reviews" element={<SellerReviews />} />
            <Route path="logout" element={<LogOut sellerRoute />} />
          </Route>
          <Route path="admin">
            <Route
              index
              element={ifAuthed(
                admin,
                <AdminDashboard />,
                <Auth Form={AdminAuthForm} formBg={formBgAdmin} />
              )}
            />
            <Route path="customers" element={<CustomerManagementPage />} />
            <Route path="sellers" element={<SellerManagementPage />} />
            <Route path="seller-requests" element={<SellerRequests />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="logout" element={<LogOut adminRoute />} />
          </Route>
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
            <Route
              path="profile"
              element={ifAuthed(
                user,
                <Profile />,
                <Auth Form={UserAuthForm} />
              )}
            />
            <Route
              path="wishlist"
              element={ifAuthed(
                user,
                <Wishlist />,
                <Auth Form={UserAuthForm} />
              )}
            />
            <Route
              path="orders"
              element={ifAuthed(user, <Orders />, <Auth Form={UserAuthForm} />)}
            />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="categories" element={<Category />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:pid" element={<Product />} />
          <Route path="products/" element={<Products />} />
          <Route path="products/:classifier" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default memo(AnimatedRoutes);
