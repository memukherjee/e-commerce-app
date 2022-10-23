import { useContext, useState } from "react";
import { MouseOverLinkContext, ScreenContext } from "../../App";
import InputBox from "../../components/InputBox";
import formBg from "./images/form-bg.jpg";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNewUser, setNewUser] = useState(true);

  const mobileScreen = useContext(ScreenContext);

  const handelAuthForm = () => {
    const route = isNewUser ? "/signup" : "/login";
    const data = isNewUser
      ? { name, email, password, confirmPassword }
      : { email, password };
    console.log(route, data);
  };

  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  return (
    <>
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
            <button
              type="submit"
              onMouseOver={() => setMouseOverLink(true)}
              onMouseOut={() => setMouseOverLink(false)}
              className="bg-black w-full text-white text-xl p-2 my-4 cursor-none"
            >
              {isNewUser ? "Sign Up" : "Log In"}
            </button>
            <span
              className="block mt-2 text-base underline underline-offset-2"
              onClick={() => {
                setNewUser(!isNewUser);
              }}
            >
              {isNewUser ? "Already a User? Log in" : "New User? Sign Up"}
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
