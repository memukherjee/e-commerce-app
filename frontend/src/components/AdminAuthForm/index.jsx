import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import { UserContext } from "../../contexts/userContext";
import InputBox from "../InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookie";
import { PulseLoader } from "react-spinners";
import { isValidEmail } from "../../utils/validateCredentials";
import useTitle from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";
import getAdminAuthInputDetails from "../../assets/adminAuthInputDetails";

export default function SellerAuth() {
  const [processing, setProcessing] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Admin Login || Elegant Apparels");

  const handelAuthForm = (userData) => {
    const { email, password } = userData;
    console.log(userData);
    const route = "/admin/login";
    const authData = { email, pass: password };

    if (isValidEmail(email)) {
      setProcessing(true);
      axios
        .post(process.env.REACT_APP_API + route, authData)
        .then((res) => {
          setProcessing(false);
          if (res.status === 200) {
            setUser(res.data);
            setCookie("user", res.data.email, 1);
            clearForm();
            navigate("/");
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
