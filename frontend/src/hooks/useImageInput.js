import { useEffect } from "react";
import { useState } from "react";
import urlToFile from "../utils/urlToFile";

export default function useImage(defaultImage) {


  useEffect(() => {
    if (typeof defaultImage === "string") {
      urlToFile(defaultImage).then((file) => setFile(file));
    }
  }, [defaultImage]);

  const [file, setFile] = useState(defaultImage || null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const clearFile = () => setFile();

  const ImageInput = ({ className }) => (
    <div
      className={
        "flex justify-between mb-6 md:mb-8 relative" +
        (className ? " " + className : "")
      }
    >
      <input
        className={"hidden"}
        id="input-image"
        type="file"
        onChange={onChange}
        placeholder="Upload Image"
        accept="image/*"
      />
      <label
        htmlFor="input-image"
        className="bg-gray-200 text-cyan-900 font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        {file ? "Change Image" : "Add Image"}
      </label>
      {file && (
        <div>
          <span className=" font-semibold py-2 px-4 rounded inline-flex items-center">
            {file.name}
          </span>
          <button
            className="bg-red-500 text-white font-semibold  rounded-full w-6 h-6 self-center"
            onClick={clearFile}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </div>
  );

  return { file, clearFile, ImageInput };
}
