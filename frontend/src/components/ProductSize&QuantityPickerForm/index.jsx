import { useState } from "react";
import { toast } from "react-toastify";
import ProductQuantityPicker from "../ProductQuantityPicker";
import ProductSizePicker from "../ProductSizePicker";

export default function ProductSizeAndQuantityPickerForm({
  product,
  actionText,
  action,
  close,
}) {
  const [productSize, setProductSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    if(productSize === ""){ 
      toast.warn("Please select a size, before adding to cart")
      return;
    }
    action(product, productSize, quantity);
    close();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="product-size-and-quantity-picker-form text-cyan-900"
    >
      <label className="block text-xl font-medium mb-2" htmlFor="size-picker">
        Pick a size
      </label>
      <ProductSizePicker
        id="size-picker"
        productSize={productSize}
        setProductSize={setProductSize}
        productSizes={product?.size}
      />
      <label
        className="block text-xl font-medium my-2"
        htmlFor="quantity-picker"
      >
        Choose Quantity
      </label>
      <ProductQuantityPicker
        id="quantity-picker"
        className="ml-10 max-w-200"
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <button
        className="bg-cyan-900 text-white text-xl font-medium w-full py-2 mt-12 rounded shadow shadow-black"
        type="submit"
      >
        {actionText ?? "NULL"}
      </button>
    </form>
  );
}
