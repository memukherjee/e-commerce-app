import axios from "axios";
import { useState } from "react";
import getAddNewProductInputDetails from "../../assets/addNewProductInputDetails";
import useCategories from "../../hooks/useCategories";
import useForm from "../../hooks/useForm";
import useImage from "../../hooks/useImageInput";
import useSizeInput from "../../hooks/useSizeInput";
import { getCookie } from "../../utils/cookie";
import formatProductData from "../../utils/formatProductData";
import { PulseLoader } from "react-spinners";
import InputBox from "../InputBox";
import { useContext } from "react";
import { SellerContext } from "../../contexts/sellerContext";
import clothingTypes from "../../assets/clothingTypes";
import { toast } from "react-toastify";

export default function ProductDetailsForm({
  productDetails,
  setProducts,
  close,
  formType,
}) {
  const productData = productDetails ? formatProductData(productDetails) : {};

  const { fetchSellerStat } = useContext(SellerContext);
  const [processing, setProcessing] = useState(false);

  const { file, ImageInput } = useImage(productData?.imageUrl);

  const handelAddNewProductForm = (userData) => {
    setProcessing(true);
    const productSizes = Object.values(sizes);
    const {
      name: product_name,
      company: product_company,
      category: product_category,
      clothingType,
      description: product_description,
      mrp: product_price,
      discountPrice,
      quantity: product_quantity,
    } = userData;

    const data = {
      product_name,
      product_company,
      product_category,
      clothingType,
      product_description,
      product_price,
      discountPrice,
      product_quantity,
      size: productSizes,
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productData", JSON.stringify(data));
    const sellerToken = getCookie("seller-refreshToken");

    axios
      .post(process.env.REACT_APP_API + "/seller/addProduct", formData, {
        headers: {
          Authorization: sellerToken,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setProducts((prevProducts) => {
            return [...prevProducts, res.data];
          });
          close();
          fetchSellerStat(sellerToken);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const handelEditProductForm = (userData) => {
    const productSizes = Object.values(sizes);
    const {
      name: product_name,
      company: product_company,
      category: product_category,
      clothingType,
      description: product_description,
      mrp: product_price,
      discountPrice,
      quantity: product_quantity,
    } = userData;

    const data = {
      product_id: productData.product_id,
      product_name,
      product_company,
      product_category,
      clothingType,
      product_description,
      product_price,
      discountPrice,
      product_quantity,
      size: productSizes,
    };

    setProcessing(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productData", JSON.stringify(data));
    // console.log(formData);
    axios
      .put(process.env.REACT_APP_API + "/seller/updateProducts", formData, {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);

        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) => {
            if (product.product_id === productData.product_id) {
              return res.data;
            }
            return product;
          });
          return updatedProducts;
        });

        close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("finally");
        setProcessing(false);
      });
  };

  const [sizes, handleSizeInputChange, addNewSizeInput, deleteSizeInput] =
    useSizeInput(productData?.productSizes);

  const [values, handleInputChange, onSubmitHandler] = useForm(
    productData,
    formType === "addNewProduct"
      ? handelAddNewProductForm
      : handelEditProductForm
  );

  const categories = useCategories();

  const {
    description = "",
    category = "defaultCategory",
    clothingType = "defaultClothingType",
  } = values;

  const inputFields = getAddNewProductInputDetails(values);
  return (
    <div className="add-new-product-form overflow-hidden">
      <form
        className="flex flex-col h-500 overflow-y-auto px-2 pt-4"
        onSubmit={onSubmitHandler}
      >
        {inputFields.map(({ value, name, label, type, order }) => {
          return (
            <InputBox
              key={name}
              value={value || ""}
              onChange={handleInputChange}
              name={name}
              label={label}
              type={type}
              order={order}
            />
          );
        })}

        <div className="order-0">
          <select
            className="w-full py-2 mb-4 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
            name="category"
            value={category}
            onChange={handleInputChange}
            style={
              category === "defaultCategory"
                ? { color: "#9CA3AF" }
                : { color: "#164e63" }
            }
          >
            <option value="defaultCategory" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="order-0">
          <select
            className="w-full py-2 mb-4 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
            name="clothingType"
            value={clothingType}
            onChange={handleInputChange}
            style={
              clothingType === "defaultClothingType"
                ? { color: "#9CA3AF" }
                : { color: "#164e63" }
            }
          >
            <option value="defaultClothingType" disabled>
              Select Clothing Type
            </option>
            {clothingTypes.map((type) => (
              <option key={type.id} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="order-0 text-xl text-gray-400">
          <label htmlFor="product-sizes">Sizes</label>
          <span
            className="text-cyan-900 bg-gray-200 rounded-full ml-2 px-2 py-1"
            onClick={addNewSizeInput}
          >
            <i className="fa-solid fa-plus"></i>
          </span>
          <div id="product-sizes" className="mt-4">
            {Object.entries(sizes).map(([key, value], index) => (
              <div
                key={key}
                className="flex w-full justify-between items-center gap-10"
              >
                <InputBox
                  value={value}
                  onChange={handleSizeInputChange}
                  name={key}
                  label="Size"
                  type="text"
                />
                <span
                  onClick={() => {
                    deleteSizeInput(key);
                  }}
                  className="w-1/20 inline-block text-xl mb-2 md:mb-4 hover:text-red-400"
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-3">
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 outline-none bg-transparent text-cyan-900 md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Description"
          />
          <label
            htmlFor="description"
            className="absolute text-lg -top-3.5 text-cyan-900 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-900 peer-focus:text-lg left-0"
          >
            Description
          </label>
        </div>
        <div className="order-7">
          <ImageInput />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-xl font-bold text-white bg-cyan-900 rounded-md hover:bg-cyan-800 order-last"
        >
          {processing ? (
            <PulseLoader
              color="#fff"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
            />
          ) : (
            <span>
              {formType === "addNewProduct" ? "Add Product" : "Update Details"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
