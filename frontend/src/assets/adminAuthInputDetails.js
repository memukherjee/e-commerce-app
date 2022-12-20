export default function getAdminAuthInputDetails({
  email = "",
  password = "",
}) {
  return [
    {
      value: email,
      name: "email",
      label: "Email Id",
      type: "email",
    },
    {
      value: password,
      name: "password",
      label: "Password",
      type: "password",
    },
  ];
}
