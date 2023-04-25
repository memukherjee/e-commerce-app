import { useState } from "react";
import InputBox from "../InputBox";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddQuestionForm({ productId, close, setQnAs }) {
  const [question, setQuestion] = useState("");
  const [processing, setProcessing] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(question);
    setProcessing(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/products/qa`,
        {
          question,
          productId,
        },
        {
          headers: {
            Authorization: getCookie("refreshToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setQnAs((prev) => [...prev, res.data]);
        close();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setProcessing(false);
      });
  };
  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold text-cyan-900 mb-8 underline underline-offset-4">
        Ask your query
      </h1>
      <form onSubmit={onSubmitHandler}>
        <InputBox
          label="Question"
          name="question"
          type="textarea"
          required="true"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="w-full py-2 text-xl font-bold text-white bg-cyan-900 rounded hover:bg-cyan-800 order-last"
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
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
}
