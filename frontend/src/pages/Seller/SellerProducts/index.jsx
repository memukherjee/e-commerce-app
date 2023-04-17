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

  useTitle("Your Products | Elegant Apparels");

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
    <PageFadeTransitionContainer className="min-h-100vh relative pt-16">
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
          className="text-2xl font-pen md:text-4xl font-bold text-cyan-900 mt-4 mb-8"
          text={`Your Products (${products.length})`}
          direction="y"
          size="large"
          align="center"
          delay={0.5}
        />
      <div className="flex flex-wrap justify-between items-center mx-auto px-2 w-full max-w-1200">
        <ModalButton
          onClick={() => {
            setModalForm("addNewProduct");
            open();
          }}
          className="product-action-btn bg-lime-600 w-max text-white rounded px-4 py-2 my-4 md:my-0 shadow shadow-black"
        >
          Add new product&nbsp;<i className="fas fa-plus"></i>
        </ModalButton>
        <div className="search-input-container flex justify-between items-center px-2 w-full md:w-4/6 md:text-xl border-b-2 border-cyan-900">
          <input
            type="text"
            placeholder="Search by name, id or company name"
            className="search-input outline-none bg-transparent text-cyan-900 h-8 md:h-auto w-11/12 placeholder:text-gray-400 placeholder:opacity-100 focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <span className="text-cyan-900 inline-block w-1/12 text-right">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      {processing ? (
        <ClipLoader
          color="#164e63"
          loading={true}
          size={60}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <motion.div
          layout
          className="products flex flex-col items-center gap-4 my-8 max-w-1200 p-2 mx-auto"
        >
          {products.length === 0 && (
            <div className="text-center bg-yellow-400 px-6 py-4 rounded w-full max-w-500 shadow shadow-black">
              <span className="font-medium text-xl">
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
                  className="product flex justify-between gap-2 bg-gray-200 h-full rounded mx-4 text-gray-500 w-full shadow-sm shadow-black"
                >
                  <div className="product-about flex justify-between gap-8 w-2/3">
                    <div className="product-image w-1/3 h-32 py-1">
                      <img
                        className="w-full h-full object-contain"
                        src={product.product_imageUrl}
                        alt="product_img"
                      />
                    </div>
                    <div className="product-details w-2/3">
                      <div
                        title={product.product_name}
                        className="product-name whitespace-nowrap overflow-hidden text-ellipsis w-full"
                      >
                        {product.product_name}
                      </div>
                      <div className="product-price whitespace-nowrap overflow-hidden text-ellipsis w-full">
                        <span>Price: </span>
                        {product.product_price > product.discountPrice && (
                          <span className="line-through">
                            &#8377;{product?.product_price.toLocaleString("en-IN")}{" "}
                          </span>
                        )}
                        <span>&#8377;{product.discountPrice.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="product-quantity whitespace-nowrap overflow-hidden text-ellipsis w-full">
                        <span>Quantity: </span>
                        <span>{product.product_quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="product-actions flex flex-col justify-evenly w-1/4">
                    <ModalButton
                      onClick={() => {
                        setModalForm("editDetails");
                        currentProductIndex.current = index;
                        open();
                      }}
                      className="group product-action-btn bg-cyan-900 text-white rounded-tr h-full shadow-md shadow-black"
                    >
                      <span className="inline-block group-hover:scale-105 transition-transform duration-200">
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
                      className="group product-action-btn bg-red-600 text-white rounded-br h-full shadow-md shadow-black"
                    >
                      <span className="inline-block group-hover:scale-105 transition-transform duration-200">
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
