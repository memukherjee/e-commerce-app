import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import InputBox from "../InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookie";
import { PulseLoader } from "react-spinners";
import { isValidEmail } from "../../utils/validateCredentials";
import useTitle from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";
import getAdminAuthInputDetails from "../../assets/adminAuthInputDetails";
import { AdminContext } from "../../contexts/adminContext";

export default function SellerAuth() {
  const [processing, setProcessing] = useState(false);
  const { fetchAdmin, fetchAdminStat } = useContext(AdminContext);
  const navigate = useNavigate();
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Admin Login || Elegant Apparels");

  const handelAuthForm = (adminData) => {
    const { email, password } = adminData;
    // console.log(adminData);
    const route = "/admin/auth/login";
    const authData = { email, password };

    if (isValidEmail(email)) {
      setProcessing(true);
      axios
        .post(process.env.REACT_APP_API + route, authData)
        .then((res) => {
          setProcessing(false);
          if (res.status === 200) {
            setCookie("admin-accessToken", res.data.accessToken, 7);
            setCookie("admin-refreshToken", res.data.refreshToken, 7);
            fetchAdmin(res.data.refreshToken);
            fetchAdminStat(res.data.refreshToken);
            clearForm();
            navigate("/admin");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data);
          setProcessing(false);
        });
    }
  };

  const [values, handleChange, onSubmitHandler, clearForm] = useForm(
    {},
    handelAuthForm
  );
  const inputFields = getAdminAuthInputDetails(values);

  return (
    <div className="h-2/3 md:h-full form-container w-full md:w-1/3 relative text-center flex items-center">
      <form onSubmit={onSubmitHandler} className="w-full px-4 md:min-h-500">
        {inputFields.map(({ value, name, label, type }) => {
          return (
            <InputBox
              key={name}
              value={value}
              name={name}
              onChange={handleChange}
              label={label}
              type={type}
            />
          );
        })}

        <button
          type="submit"
          onMouseOver={() => setMouseOverLink(true)}
          onMouseOut={() => setMouseOverLink(false)}
          onClick={() => setMouseOverLink(false)}
          className="bg-black w-full text-white text-xl p-1 md:p-2 md:my-4 cursor-none"
        >
          {processing ? (
            <PulseLoader
              color="#fff"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
            />
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
}
