import { useState } from "react";

export default function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);

  const clearForm = () => setValues(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return [values, handleInputChange, onSubmitHandler, clearForm];
}
