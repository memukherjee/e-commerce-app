import { useContext, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import ProductDetailsForm from "../../../components/ProductDetailsForm";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useModal from "../../../hooks/useModal";
import useSellerProducts from "../../../hooks/useSellerProducts";
import emptyStoreIcon from "../../../assets/images/empty-store-icon.png";
import ConfirmationForm from "../../../components/ConfirmationForm";
import { getCookie } from "../../../utils/cookie";
import useTitle from "../../../hooks/useTitle";
import { ScreenContext } from "../../../contexts/screenContext";
import { SellerContext } from "../../../contexts/sellerContext";
import AnimatedText from "../../../components/AnimatedText";

export default function SellerProducts() {
  const { modalOpen, close, open } = useModal();
  const [modalForm, setModalForm] = useState("");
  const [processing, setProcessing] = useState(true);
  const [products, setProducts] = useSellerProducts(setProcessing);
  const mobileScreen = useContext(ScreenContext);
  const { fetchSellerStat } = useContext(SellerContext);
  const currentProductIndex = useRef(0);
  const [filterQuery, setFilterQuery] = useState("");

  useTitle("Your Products || Elegant Apparels");

  const deleteProduct = () => {
    const productId = products[currentProductIndex.current].product_id;
    setProcessing(true);
    const sellerToken = getCookie("seller-refreshToken");
    axios
      .delete(
        process.env.REACT_APP_API + "/seller/deleteProduct/" + productId,
        {
          headers: {
            authorization: sellerToken,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setProducts(
            products.filter((product) => product.product_id !== productId)
          );
          close();
          toast(res.data);
          fetchSellerStat(sellerToken);
        }
      })
      .catch((err) => {
        toast("Something went wrong", { type: "error" });
        console.log(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <PageFadeTransitionContainer className="relative pt-16 min-h-100vh">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          modalForm === "addNewProduct" || modalForm === "editDetails" ? (
            <ProductDetailsForm
              close={close}
              setProducts={setProducts}
              formType={modalForm}
              productDetails={
                modalForm === "editDetails"
                  ? products[currentProductIndex.current]
                  : null
              }
            />
          ) : modalForm === "deleteProduct" ? (
            <ConfirmationForm
              text="Are you sure you want to delete this product?"
              close={close}
              success="Delete"
              successAction={deleteProduct}
            />
          ) : null
        }
      />
      <AnimatedText
        className="mt-4 mb-8 text-2xl font-bold font-pen md:text-4xl text-cyan-900"
        text={`Your Products (${products.length})`}
        direction="y"
        size="large"
        align="center"
        delay={0.5}
      />
      <div className="flex flex-wrap items-center justify-between w-full px-2 mx-auto max-w-1200">
        <ModalButton
          onClick={() => {
            setModalForm("addNewProduct");
            open();
          }}
          className="px-4 py-2 my-4 text-white rounded shadow product-action-btn bg-lime-600 w-max md:my-0 shadow-black"
        >
          Add new product&nbsp;<i className="fas fa-plus"></i>
        </ModalButton>
        <div className="flex items-center justify-between w-full px-2 border-b-2 search-input-container md:w-4/6 md:text-xl border-cyan-900">
          <input
            type="text"
            placeholder="Search by name, id or company name"
            className="w-11/12 h-8 bg-transparent outline-none search-input text-cyan-900 md:h-auto placeholder:text-gray-400 placeholder:opacity-100 focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <span className="inline-block w-1/12 text-right text-cyan-900">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      {processing ? (
        <ClipLoader
          color="#164e63"
          loading={true}
          size={60}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2"
        />
      ) : (
        <motion.div
          layout
          className="flex flex-col items-center gap-4 p-2 mx-auto my-8 products max-w-1200"
        >
          {products.length === 0 && (
            <div className="w-full px-6 py-4 text-center bg-yellow-400 rounded shadow max-w-500 shadow-black">
              <span className="text-xl font-medium">
                Nothing yet in your shop
              </span>
              <img
                src={emptyStoreIcon}
                alt="empty store icon"
                className="w-40 h-40 mx-auto"
              />
            </div>
          )}
          <AnimatePresence>
            {products
              .filter(
                (product) =>
                  product?.product_name
                    .toLowerCase()
                    .includes(filterQuery.toLowerCase()) ||
                  product?.product_id
                    .toLowerCase()
                    .includes(filterQuery.toLowerCase()) ||
                  product?.product_company
                    .toLowerCase()
                    .includes(filterQuery.toLowerCase())
              )
              .map((product, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={product.product_id}
                  className="flex justify-between w-full h-full gap-2 mx-4 text-gray-500 bg-gray-200 rounded shadow-sm product shadow-black"
                >
                  <div className="flex justify-between w-2/3 gap-8 product-about">
                    <div className="w-1/3 h-32 py-1 product-image">
                      <img
                        className="object-contain w-full h-full"
                        src={product.product_imageUrl}
                        alt="product_img"
                      />
                    </div>
                    <div className="w-2/3 product-details">
                      <div
                        title={product.product_name}
                        className="w-full overflow-hidden product-name whitespace-nowrap text-ellipsis"
                      >
                        {product.product_name}
                      </div>
                      <div className="w-full overflow-hidden product-price whitespace-nowrap text-ellipsis">
                        <span>Price: </span>
                        {product.product_price > product.discountPrice && (
                          <span className="line-through">
                            &#8377;
                            {product?.product_price.toLocaleString("en-IN")}{" "}
                          </span>
                        )}
                        <span>
                          &#8377;{product.discountPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="w-full overflow-hidden product-quantity whitespace-nowrap text-ellipsis">
                        <span>Quantity: </span>
                        <span>{product.product_quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/4 product-actions justify-evenly">
                    <ModalButton
                      onClick={() => {
                        setModalForm("editDetails");
                        currentProductIndex.current = index;
                        open();
                      }}
                      className="h-full text-white rounded-tr shadow-md group product-action-btn bg-cyan-900 shadow-black"
                    >
                      <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                        {!mobileScreen && "Edit Details  "}
                        <i className="fa fa-edit"></i>
                      </span>
                    </ModalButton>
                    <ModalButton
                      onClick={() => {
                        setModalForm("deleteProduct");
                        currentProductIndex.current = index;
                        open();
                      }}
                      className="h-full text-white bg-red-600 rounded-br shadow-md group product-action-btn shadow-black"
                    >
                      <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                        {!mobileScreen && "Remove from Inventory  "}
                        <i className="fa fa-trash"></i>
                      </span>
                    </ModalButton>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageFadeTransitionContainer>
  );
}
