import axios from "axios";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/userContext";
import useForm from "../../hooks/useForm";
import { getCookie } from "../../utils/cookie";
import { isValidConfirmPassword, isValidPassword } from "../../utils/validateCredentials";
import InputBox from "../InputBox";

export default function UpdateUserPasswordForm({ close }) {
  const [processing, setProcessing] = useState(false);
  const { setUser } = useContext(UserContext);
  const submitHandeler = (values) => {
    if(!isValidConfirmPassword(values.newPassword, values.confirmPassword)) {
        toast.error("Password and Confirm Password do not match");
        return;
    }
    if (!isValidPassword(values.newPassword)) {
      return;
    }
    setProcessing(true);
    axios
      .post(process.env.REACT_APP_API + "/auth/profile", values, {
        headers: {
          Authorization: getCookie("refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
        toast.success("Password Updated");
        clearForm();
        close();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setProcessing(false);
      });
  };
  const [values, handleInputChange, onSubmitHandler, clearForm] = useForm(
    {},
    submitHandeler
  );
  return (
    <form className="px-2 pt-4" onSubmit={onSubmitHandler}>
      <InputBox
        name="oldPassword"
        label="Old Password"
        type="password"
        value={values.oldPassword}
        onChange={handleInputChange}
        required={true}
      />
      <InputBox
        name="newPassword"
        label="New Password"
        type="password"
        value={values.newPassword}
        onChange={handleInputChange}
        required={true}
      />
      <InputBox
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={values.confirmPassword}
        onChange={handleInputChange}
        required={true}
      />
      <button
        className="bg-cyan-900 text-white px-4 py-2 rounded mt-4 w-full text-xl font-medium"
        type="submit"
      >
        {processing ? (
          <PulseLoader
            color="#fff"
            loading={true}
            size={10}
            aria-label="Loading Spinner"
          />
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  );
}
