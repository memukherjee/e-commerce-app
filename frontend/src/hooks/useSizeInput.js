import { useState } from "react";

export default function useSizeInput(defaultSizes) {
  const [sizes, setSizes] = useState(defaultSizes || {});

  const addNewInput = () => {
    setSizes({ ...sizes, [Object.keys(sizes).length]: "" });
  };

  const deleteInput = (key) => {
    const newSizes = { ...sizes };

    for (let i = parseInt(key); i < Object.keys(sizes).length - 1; i++) {
      newSizes[i] = newSizes[i + 1];
    }
    
    delete newSizes[Object.keys(newSizes).length - 1];
    setSizes(newSizes);
  };

  const handleInputChange = (e) => {
    setSizes((oldSizes) => {
      return { ...oldSizes, [e.target.name]: e.target.value };
    });
  };

  return [sizes, handleInputChange, addNewInput, deleteInput];
}
