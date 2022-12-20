import React, { useContext } from "react";
import { MouseTransparentContext } from "../../contexts/mouseTransparentContext";

export default function ProductColorPicker({
  productColors,
  productColor,
  setProductColor,
}) {
  const { setMouseTransparent } = useContext(MouseTransparentContext);
  return (
    <div className="product-colors relative w-full flex justify-evenly">
      {productColors.map((color) => (
        <div
          className="relative w-8 h-8 text-gray-400"
          key={color}
          onClick={() => setProductColor(color)}
          onMouseEnter={() => setMouseTransparent(true)}
          onMouseLeave={() => setMouseTransparent(false)}
        >
          <label
            htmlFor={`product-${color}`}
            className="inline-block w-8 h-8 rounded-full bg-gray-400 border-white transition-all shadow-md shadow-gray-600"
            style={{
              backgroundColor: color,
              border:
                productColor === color ? `4px solid #777` : "2px solid #777",
            }}
          >
            {productColor === color && <i className="fa-solid fa-check" style={{mixBlendMode: "difference"}}></i>}
            <input
              type="radio"
              name="color"
              id={`product-${color}`}
              value={color}
              onChange={() => setProductColor(color)}
              checked={productColor === color}
              style={{ accentColor: color }}
              className="absolute inset-0 w-8 h-8 opacity-0"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
