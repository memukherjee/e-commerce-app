import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import getUserAuthInputDetails from "../../assets/userAuthInputDetails";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import { UserContext } from "../../contexts/userContext";
import useForm from "../../hooks/useForm";
import { setCookie } from "../../utils/cookie";
import isValidAuthCredentials, {
  isValidConfirmPassword,
} from "../../utils/validateCredentials";
import InputBox from "../InputBox";

export default function UserAuthForm() {
  const [isNewUser, setNewUser] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { fetchUser } = useContext(UserContext);
  const { setMouseOverLink } = useContext(MouseOverLinkContext);
  const navigate = useNavigate();

  const handelUserAuthForm = (userData) => {
    const route = isNewUser ? "/auth/signup" : "/auth/login";
    const { name, email, mobileNo, password, confirmPassword } = userData;
    const authData = isNewUser
      ? {
          email,
          name,
          mobile: mobileNo,
          password,
        }
      : { email, password };

    if (
      isValidAuthCredentials(
        isNewUser,
        email,
        mobileNo,
        password,
        confirmPassword
      )
    ) {
      setProcessing(true);
      axios
        .post(process.env.REACT_APP_API + route, authData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          )
        .then((res) => {
          setProcessing(false);
          // console.log(res);
          if (res.status === 200) {
            setCookie("accessToken", res.data.accessToken, 7);
            setCookie("refreshToken", res.data.refreshToken, 7);
            fetchUser(res.data.refreshToken);
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

  const [values, handleInputChange, onSubmitHandler, clearForm] = useForm(
    {},
    handelUserAuthForm
  );

  const inputFields = getUserAuthInputDetails(values);
  const { password = "", confirmPassword = "" } = values;

  return (
    <div className="h-2/3 md:h-full form-container w-full md:w-1/3 relative text-center flex items-center">
      <form onSubmit={onSubmitHandler} className="w-full px-4 md:min-h-500">
        {inputFields.map(({ value, name, label, type, showAlways }) => {
          return (
            (showAlways || isNewUser) && (
              <InputBox
                key={name}
                value={value}
                name={name}
                onChange={handleInputChange}
                label={label}
                type={type}
              />
            )
          );
        })}

        {!isValidConfirmPassword(password, confirmPassword) && (
          <span className="text-base text-red-600 font-semibold">
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
          ) : isNewUser ? (
            "Sign Up"
          ) : (
            "Log In"
          )}
        </button>
        <span
          className="block mt-2 text-base underline underline-offset-2"
          onClick={() => {
            setNewUser(!isNewUser);
            clearForm();
          }}
        >
          {isNewUser ? "Already a User? Log in" : "New User? Sign Up"}
        </span>
        {!isNewUser && (
          <Link
            to="/forgot-password"
            className="block mt-2 text-base underline underline-offset-2"
          >
            Forgot Password ?
          </Link>
        )}
      </form>
    </div>
  );
}
