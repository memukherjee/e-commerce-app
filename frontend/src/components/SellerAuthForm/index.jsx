import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import InputBox from "../InputBox";
import { setCookie } from "../../utils/cookie";
import isValidAuthCredentials, {
  isValidConfirmPassword,
} from "../../utils/validateCredentials";
import useTitle from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";
import getSellerAuthInputDetails from "../../assets/sellerAuthInputDetails";
import { SellerContext } from "../../contexts/sellerContext";

export default function SellerAuthForm() {
  const [isNewSeller, setNewSeller] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { setMouseOverLink } = useContext(MouseOverLinkContext);
  const { fetchSeller, fetchSellerStat } = useContext(SellerContext);
  const navigate = useNavigate();

  useTitle("Sign Up or Log In for Sellers || Elegant Apparels");

  const handelAuthForm = (sellerData) => {
    const route = `/seller/auth/${isNewSeller ? "signup" : "login"}`;
    // console.log(sellerData);

    const { name, email, mobileNo, password, confirmPassword } = sellerData;

    const authData = isNewSeller
      ? { name, email, mobile: mobileNo, password }
      : { email, password };

    if (
      isValidAuthCredentials(
        isNewSeller,
        email,
        mobileNo,
        password,
        confirmPassword
      )
    ) {
      setProcessing(true);
      axios
        .post(process.env.REACT_APP_API + route, authData)
        .then((res) => {
          setProcessing(false);
          // console.log(res);
          if (res.status === 200) {
            if (isNewSeller) {
              toast.success(res.data);
            } else {
              setCookie("seller-accessToken", res.data.accessToken, 7);
              setCookie("seller-refreshToken", res.data.refreshToken, 7);
              fetchSeller(res.data.refreshToken);
              fetchSellerStat(res.data.refreshToken);
              navigate("/seller");
            }
            clearForm();
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

  const { password = "", confirmPassword = "" } = values;

  const inputFields = getSellerAuthInputDetails(values);

  return (
    <div className="h-2/3 md:h-full form-container w-full md:w-1/3 relative text-center flex items-center">
      <form onSubmit={onSubmitHandler} className="w-full px-4 md:min-h-500">
        {inputFields.map(({ value, name, label, type, showAlways }) => {
          return (
            (showAlways || isNewSeller) && (
              <InputBox
                key={name}
                value={value}
                name={name}
                onChange={handleChange}
                label={label}
                type={type}
              />
            )
          );
        })}

        {!isValidConfirmPassword(password, confirmPassword) && (
          <span className="text-base text-red-400 font-semibold">
            Passwords doesn't match
          </span>
        )}

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
          ) : isNewSeller ? (
            "Sign Up"
          ) : (
            "Log In"
          )}
        </button>
        <span
          className="block mt-2 text-base underline underline-offset-2"
          onClick={() => {
            setNewSeller(!isNewSeller);
            clearForm();
          }}
        >
          {isNewSeller ? "Already a Seller? Log in" : "New Seller? Sign Up"}
        </span>
        {!isNewSeller && (
          <Link
            to="/seller/forgot-password"
            className="block mt-2 text-base underline underline-offset-2"
          >
            Forgot Password ?
          </Link>
        )}
      </form>
    </div>
  );
}
