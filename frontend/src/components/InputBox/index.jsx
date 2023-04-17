export default function InputBox({
  value,
  onChange,
  name,
  label,
  type,
  align,
  autoComplete,
  autoCorrect,
  order,
  required,
  className,
  containerClassName,
}) {
  const elementId = label.toLowerCase().replace(" ", "-");
  return (
    <div
      style={{ order: order }}
      className={
        "w-full flex justify-between mb-6 md:mb-8 relative" +
        (containerClassName ? " " + containerClassName : "")
      }
    >
      {type === "textarea" ? (
        <>
          <textarea
            id={"input-" + elementId}
            name={name}
            value={value}
            onChange={onChange}
            className={
              "w-full p-2  mb-4 outline-none bg-transparent text-cyan-900 md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900" +
              (typeof align !== "undefined" ? " text-" + align : "") +
              (className ? " " + className : "")
            }
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            placeholder={label}
          />
          <label
            htmlFor={"input-" + elementId}
            className={
              "absolute text-lg -top-5 text-cyan-900 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-cyan-900 peer-focus:text-lg left-0" +
              (typeof align !== "undefined" ? " " + align + "-0" : " left-0")
            }
          >
            {label}
          </label>
        </>
      ) : (
        <>
          <input
            className={
              "w-full bg-transparent px-0.5 py-1 text-xl text-cyan-900 placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900" +
              (typeof align !== "undefined" ? " text-" + align : "") +
              (className ? " " + className : "")
            }
            placeholder={label}
            name={name}
            type={type}
            value={value ?? ""}
            onChange={onChange}
            onWheel={(e) => e.target.blur()}
            id={"input-" + elementId}
            autoComplete={autoComplete}
            required={required}
          />
          <label
            htmlFor={"input-" + elementId}
            className={
              "absolute text-lg -top-5 text-cyan-900 transition-all duration-200 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-cyan-900 peer-focus:text-lg" +
              (typeof align !== "undefined" ? " " + align + "-0" : " left-0")
            }
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
}
