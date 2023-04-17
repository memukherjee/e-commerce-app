import { useState } from "react";
import InputBox from "../InputBox";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddAnswerForm({ productId, close, setQnAs, question }) {
  const [answer, setAnswer] = useState("");
  const [processing, setProcessing] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(answer);
    setProcessing(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/products/qa/answers`,
        {
          questionId: question.id,
          answer,
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
        // setQnAs((prev) => [...prev, res.data]);
        setQnAs((prev) => {
            const newQnAs = prev.map((qna) => {
                if(qna.id === question.id){
                    return {...qna, answer: res.data.answer}
                }
                return qna
            })
            return newQnAs
        })
        close();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data)
      })
      .finally(() => {
        setProcessing(false);
      });
  };
  return (
    <div className="px-4">
      <h1 className="text-xl font-semibold text-cyan-900 mb-8">
        Question:&nbsp;
        <span className="text-gray-500 font-medium">{question?.question}</span>
      </h1>
      <form onSubmit={onSubmitHandler}>
        <InputBox
          label="Answer"
          name="answer"
          type="textarea"
          required="true"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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
