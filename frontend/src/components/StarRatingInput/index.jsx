import { useState } from "react";

export default function StartRatingInput({ rating, setRating, className }) {
  const [hover, setHover] = useState(0);
  return (
    <div className={"star-rating "+className}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className="star-rating-button bg-transparent border-none outline-none text-yellow-400"
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onDoubleClick={() => setRating(0)}
          >
            <span className="star">
              {index <= (hover || rating) ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
