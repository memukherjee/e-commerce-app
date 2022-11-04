import React from "react";

export default function InputBox({ value, setValue, label, type, align, autoComplete }) {
  const elementId = label.toLowerCase().replace(" ", "-");
  return (
    <div className="flex justify-between mb-6 md:mb-8 relative">
      <input
        className={"w-full bg-transparent px-0.5 py-1 text-xl text-cyan-900 placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"+ (typeof align!== 'undefined' ? " text-"+align: "")}
        placeholder={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={"input-" + elementId}
        autoComplete={autoComplete}
      />
      <label
        htmlFor={"input-" + elementId}
        className={"absolute text-lg -top-5 text-cyan-900 transition-all duration-200 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-cyan-900 peer-focus:text-lg"+ (typeof align!== 'undefined' ? " "+align+"-0": " left-0")}
      >
        {label}
      </label>
    </div>
  );
}
