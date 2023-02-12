import { useRef, useState } from "react";
import ProductDetailsForm from "../../components/ProductDetailsForm";
import Modal from "../../components/Modal";
import ModalButton from "../../components/ModalButton";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useModal from "../../hooks/useModal";
import useSellerProducts from "../../hooks/useSellerProducts";
import emptyStoreIcon from "../../assets/images/empty-store-icon.png";
import ConfirmationForm from "../../components/ConfirmationForm";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";

export default function SellerProducts() {
  const { modalOpen, close, open } = useModal();
  const [modalForm, setModalForm] = useState("");
  const [processing, setProcessing] = useState(true);
  const [products, setProducts] = useSellerProducts(setProcessing);
  const currentProductIndex = useRef(0);

  useTitle("Your Products | Elegant Apparels");

  const deleteProduct = () => {
    const productId = products[currentProductIndex.current].product_id;
    setProcessing(true);
    axios
      .delete(
        process.env.REACT_APP_API + "/seller/deleteProduct/" + productId,
        {
          headers: {
            authorization: getCookie("seller-refreshToken"),
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
    <PageFadeTransitionContainer className="min-h-100vh relative pt-12">
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
      <h1 className="text-center text-2xl font-semibold text-cyan-900 underline underline-offset-8">
        Your Products ({products.length})
      </h1>
      {processing ? (
        <ClipLoader
          color="#164e63"
          loading={true}
          size={60}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <div className="products flex flex-col items-center gap-4 my-8 max-w-1200 p-2 mx-auto">
          <ModalButton
            onClick={() => {
              setModalForm("addNewProduct");
              open();
            }}
            className="product-action-btn self-start bg-lime-600 w-max text-white rounded px-4 py-2 mx-4 shadow shadow-black"
          >
            Add new product&nbsp;<i className="fas fa-plus"></i>
          </ModalButton>
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
          {products.map((product, index) => (
            <div
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
                  <div title={product.product_name} className="product-name whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {product.product_name}
                  </div>
                  <div className="product-price whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    <span>Price: </span>
                    {
                      product.product_price > product.discountPrice &&
                      <span className="line-through">
                      &#8377;{product?.product_price}{" "}
                    </span>}
                    <span>&#8377;{product.discountPrice}</span>
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
                    Edit Details&nbsp;&nbsp;<i className="fa fa-edit"></i>
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
                    Remove from Inventory&nbsp;&nbsp;
                    <i className="fa fa-trash"></i>
                  </span>
                </ModalButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageFadeTransitionContainer>
  );
}
