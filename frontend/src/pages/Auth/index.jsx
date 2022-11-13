import { useContext, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { MouseOverLinkContext, ScreenContext } from "../../App";
import InputBox from "../../components/InputBox";
import formBg from "./images/form-bg.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNewUser, setNewUser] = useState(true);

  const mobileScreen = useContext(ScreenContext);

  useEffect(() => {
    document.title = "Sign Up or Log In || Elegant Apparels";
  }, []);

  const clearForm = () => {
    setName("");
    setEmail("");
    setMobileNo("");
    setPassword("");
    setConfirmPassword("");
  };

  const isValidEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());
    if (!isValid) {
      toast.error("Not a valid email");
    }
    return isValid;
  };

  const isValidMobileNo = () => {
    if (!isNewUser) {
      return true;
    }
    const re = /^((\+91)?|91?|0)?[789][0-9]{9}/;
    const isValid = re.test(String(mobileNo));
    if (!isValid) {
      toast.error("Not a valid mobile no.");
    }
    return isValid;
  };

  const isValidPassword = () => {
    if (!isNewUser) {
      return true;
    }
    // Minimum eight characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = re.test(String(password));
    if (!isValid) {
      toast.error(
        "Not a Strong password. Minimum eight characters, at least one letter and one number required."
      );
    }
    return isValid;
  };

  const handelAuthForm = (e) => {
    e.preventDefault();
    const route = isNewUser ? "/signup" : "/login";
    const data = isNewUser
      ? { name, email, mobileNo, pass: password }
      : { email, pass: password };

    if (
      isValidEmail() &&
      isValidMobileNo() &&
      isValidPassword() &&
      (isNewUser ? password === confirmPassword : true)
    ) {
      axios
        .post(process.env.REACT_APP_API + route, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          responseType: "json",
        })
        .then((res) => {
          console.log(res);
          // if (res.data.success) {
          //   console.log(res.data.message);
          //   clearForm();
          // } else {
          //   toast.error(res.data.message, toastOptions);
          // }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="h-100vh gap-5 md:gap-0 bg-gray-200 w-full relative flex flex-col md:flex-row">
        <div
          style={
            mobileScreen
              ? {
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }
              : {
                  clipPath:
                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                }
          }
          className="image-container h-1/3 md:h-full w-full md:w-2/3 overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src={formBg}
            alt="Background"
          />
        </div>
        <div className="h-2/3 md:h-full form-container w-full md:w-1/3 relative text-center flex items-center">
          <form onSubmit={handelAuthForm} className="w-full px-4 md:min-h-500">
            {isNewUser && (
              <InputBox
                value={name}
                setValue={setName}
                label="Name"
                type="text"
              />
            )}
            <InputBox
              value={email}
              setValue={setEmail}
              label="Email Id"
              type="email"
            />
            {isNewUser && (
              <InputBox
                value={mobileNo}
                setValue={setMobileNo}
                label="Mobile No."
                type="tel"
              />
            )}
            <InputBox
              value={password}
              setValue={setPassword}
              label="Password"
              type="password"
            />
            {isNewUser && (
              <InputBox
                value={confirmPassword}
                setValue={setConfirmPassword}
                label="Confirm Password"
                type="password"
              />
            )}
            {password !== confirmPassword && confirmPassword !== "" && (
              <span className="text-base text-red-400 font-semibold">
                Passwords doesn't match
              </span>
            )}
            <button
              type="submit"
              onMouseOver={() => setMouseOverLink(true)}
              onMouseOut={() => setMouseOverLink(false)}
              className="bg-black w-full text-white text-xl p-1 md:p-2 md:my-4 cursor-none"
            >
              {isNewUser ? "Sign Up" : "Log In"}
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
            <Link
              to="/forgot-password"
              className="block mt-2 text-base underline underline-offset-2"
            >
              Forgot Password ?
            </Link>
          </form>
        </div>
      </div>
    </m.div>
  );
}
