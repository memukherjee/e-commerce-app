import axios from "axios";
import { toast } from "react-toastify";

export default async function isValidPinCode(pinCode) {
  try {
    const res = await axios.get(
      `https://api.postalpincode.in/pincode/${pinCode}`
    );
    return res.data[0].Status === "Success";
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");
    return false;
  }
}
