import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast-custom.css";

import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import PreviousButton from "./components/PreviousButton";

function App() {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <PreviousButton />
      <ToastContainer
        transition={Slide}
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        // draggable
        pauseOnHover
        theme="colored"
      />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}
export default App;
