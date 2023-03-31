import { useContext } from "react";
import { MouseTransparentContext } from "../../contexts/mouseTransparentContext";

export default function ProductSizePicker({
  productSizes,
  productSize,
  setProductSize,
  id,
}) {
  const { setMouseTransparent } = useContext(MouseTransparentContext);
  return (
    <>
      <span className="text-gray-400 font-medium">Size:</span>
      <div
        id={id}
        className="product-sizes relative w-full flex flex-wrap gap-4 justify-start items-center"
      >
        {productSizes.map((size) => (
          <div
            className="relative w-14 h-10 text-gray-400"
            key={size}
            onClick={() => setProductSize(size)}
            onMouseEnter={() => setMouseTransparent(true)}
            onMouseLeave={() => setMouseTransparent(false)}
          >
            <label
              htmlFor={`product-${size}`}
              className="py-2 rounded-full bg-gray-600 border-white transition-all shadow-md shadow-gray-800 text-black flex justify-center items-center"
              style={
                productSize === size
                  ? {
                      outline: "2px solid #fff",
                      backgroundColor: "#164e63",
                      color: "#fff",
                      fontWeight: "700",
                    }
                  : {}
              }
            >
              {/* {productColor === color && <i className="fa-solid fa-check" style={{mixBlendMode: "difference"}}></i>} */}
              <span className="text-lg font-medium text-white">{size}</span>
              <input
                type="radio"
                name="size"
                id={`product-${size}`}
                value={size}
                onChange={() => setProductSize(size)}
                checked={productSize === size}
                className="absolute inset-0 w-10 h-10 opacity-0"
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
