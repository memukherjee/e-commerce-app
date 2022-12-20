export default function getSellerAuthInputDetails({ name="", email="", mobileNo="", password="", confirmPassword="" }) {
    return [
    {
      value: name,
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      value: email,
      name: "email",
      label: "Email Id",
      type: "email",
      showAlways: true,
    },
    {
      value: mobileNo,
      name: "mobileNo",
      label: "Mobile No.",
      type: "tel",
    },
    {
      value: password,
      name: "password",
      label: "Password",
      type: "password",
      showAlways: true,
    },
    {
      value: confirmPassword,
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
    },
  ]
}