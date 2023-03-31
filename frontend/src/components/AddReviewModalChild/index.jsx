import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { MouseTransparentContext } from "../../contexts/mouseTransparentContext";
import InputBox from "../InputBox";
import StarInput from "../StarRatingInput";

export default function AddReviewModalChild({ addReview, close }) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { setMouseTransparent } = useContext(MouseTransparentContext);
  
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold text-cyan-900">
        Add Your Review
      </h1>
      <InputBox
        value={reviewMessage}
        onChange={(e) => setReviewMessage(e.target.value)}
        name="reviewMessage"
        label="Review"
        type="text"
        autoComplete="off"
      />
      <div
        className="flex justify-start items-center gap-2 mb-8"
        onMouseEnter={() => setMouseTransparent(true)}
        onMouseLeave={() => setMouseTransparent(false)}
      >
        <label className="text-xl text-cyan-900" htmlFor="star-input">
          Select Rating:
        </label>
        <StarInput
          id="star-input"
          className="text-xl"
          rating={rating}
          setRating={setRating}
        />
      </div>
      <button
        type="submit"
        className="text-xl font-semibold bg-cyan-900 text-white w-full rounded-sm py-2"
        onClick={(e) => {
          e.preventDefault();
          if (reviewMessage !== "" && rating) {
            addReview(reviewMessage, rating);
            close();
          } else toast.warning("Please fill all the fields");
        }}
      >
        Submit
      </button>
    </div>
  );
}
