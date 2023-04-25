import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/category/getAllCategory`)
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        navigate("/404");
      });
  }, [navigate]);

  return categories;
}
