import { toast } from "react-toastify";

export const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(email).toLowerCase());
  if (!isValid) {
    toast.error("Not a valid email");
  }
  return isValid;
};

export const isValidMobileNo = (mobileNo) => {
  const re = /^((\+91)?|91?|0)?[789][0-9]{9}/;
  const isValid = re.test(String(mobileNo));
  if (!isValid) {
    toast.error("Not a valid mobile no.");
  }
  return isValid;
};

export const isValidPassword = (password) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValid = re.test(String(password));
  if (!isValid) {
    toast.error(
      "Not a Strong password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character required."
    );
  }
  return isValid;
};

export const isValidConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword || confirmPassword === "";
};

export default function isValidAuthCredentials(
  isNewUser,
  email,
  mobileNo,
  password,
  confirmPassword
) {
  return (
    isValidEmail(email) &&
    (isNewUser ? isValidMobileNo(mobileNo) : true) &&
    (isNewUser ? isValidPassword(password) : true) &&
    (isNewUser ? password === confirmPassword : true)
  );
};
