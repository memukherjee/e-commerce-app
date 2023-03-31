export default function ProductQuantityPicker({
  quantity,
  setQuantity,
  id,
  className,
}) {
  return (
    <div
      id={id}
      className={"flex items-center justify-between w-full " + className}
    >
      <button
        type="button"
        className="bg-gray-400 shadow-sm shadow-black text-white px-4 py-2 rounded-full"
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
      >
        -
      </button>
      <span className="">{quantity}</span>
      <button
        type="button"
        className="bg-gray-400 shadow-sm shadow-black text-white px-4 py-2 rounded-full"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
