import axios from "axios";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/userContext";
import useImage from "../../hooks/useImageInput";
import { getCookie } from "../../utils/cookie";

export default function UpdateUserAvatarForm({ close }) {
  const { user, setUser } = useContext(UserContext);
  const { file, ImageInput } = useImage(user?.avatar);
  const [processing, setProcessing] = useState(false);

  const submitHandeler = (e) => {
    e.preventDefault();
    // console.log(file);
    setProcessing(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(process.env.REACT_APP_API + "/auth/avatar", formData, {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        setUser(res.data);
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
