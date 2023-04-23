import axios from "axios";
import { useContext, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { getCookie } from "../../utils/cookie";
import InputBox from "../InputBox";
import { SellerContext } from "../../contexts/sellerContext";

export default function UserProfileDetailsForm({ close }) {
  const [processing, setProcessing] = useState(false);
  const { seller, setSeller } = useContext(SellerContext);
  const submitFormHandler = (values) => {
    setProcessing(true);
    axios
      .post(process.env.REACT_APP_API + "/seller/auth/profile", values, {
        headers: {
          Authorization: getCookie("seller-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        setSeller(res.data);
        toast.success("Profile Updated");
        clearForm();
        setProcessing(false);
        close();
      })
      .catch((err) => {
        setProcessing(false);
        toast.error(err.response.data);
      });
  };

  const [values, handleInputChange, onSubmitHandler, clearForm] = useForm(
    seller,
    submitFormHandler
  );
  return (
    <div>
      <h1 className="text-2xl text-center font-semibold underline underline-offset-4 text-cyan-900 mb-8">
        Change Details
      </h1>
      <form onSubmit={onSubmitHandler}>
        {getSellerDetailsFormFields(values).map((field) => (
          <InputBox
            key={field?.name}
            name={field?.name}
            label={field?.label}
            value={field?.value}
            type={field?.type}
            placeholder={field?.placeholder}
            required={field?.required}
            onChange={handleInputChange}
          />
        ))}
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
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

const getSellerDetailsFormFields = ({
  name = "",
  email = "",
  mobile = "",
  address = "",
}) => [
  {
    name: "name",
    label: "Name",
    value: name,
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    value: email,
    type: "email",
    required: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    value: mobile,
    type: "tel",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    value: address,
    type: "text",
    required: true,
  },
];
