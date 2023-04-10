import axios from "axios";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import useImage from "../../hooks/useImageInput";
import { getCookie } from "../../utils/cookie";
import { SellerContext } from "../../contexts/sellerContext";

export default function UpdateSellerAvatarForm({ close }) {
  const { seller, setSeller } = useContext(SellerContext);
  const { file, ImageInput } = useImage(seller?.avatar);
  const [processing, setProcessing] = useState(false);

  const submitHandeler = (e) => {
    e.preventDefault();
    // console.log(file);
    setProcessing(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(process.env.REACT_APP_API + "/seller/auth/avatar", formData, {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        setSeller(res.data);
        toast.success("Avatar Updated Successfully");
        close();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <form onSubmit={submitHandeler}>
      <ImageInput />
      <button
        type="submit"
        className="w-full py-2 mt-4 text-xl font-bold text-white bg-cyan-900 rounded-md hover:bg-cyan-800"
      >
        {processing ? (
          <PulseLoader color="#fff" loading={true} size={10} />
        ) : (
          "Update Avatar"
        )}
      </button>
    </form>
  );
}
