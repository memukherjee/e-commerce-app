import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../contexts/userContext";
import { timeSince } from "../../utils/timeFormater";
import ModalButton from "../ModalButton";
import StarRating from "../StarRating";

export default function ProductReviewSection({
  open,
  setModalChild,
  reviews,
  stars,
  ratingCount,
  loaderRef,
  allFetched,
}) {
  const { user } = useContext(UserContext);
  return (
    <div className="reviews w-full text-left">
      <h1 className="text-xl md:text-2xl text-center md:text-left font-bold text-cyan-900">
        <span className="underline underline-offset-4">Customer reviews</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-start items-center md:items-start md:gap-x-12">
        <div className="md:w-1/5 text-center md:text-left flex flex-col gap-y-8 justify-start items-start">
          <StarRating
            stars={stars}
            className="block no-underline text-xl font-medium"
          />
          <div className="rating-count w-full">
            <h3 className="text-lg font-medium text-gray-400">
              {ratingCount["Total Reviews"]}{" "}
              {ratingCount["Total Reviews"] > 1 ? "reviews" : "review"}
            </h3>
            {[5, 4, 3, 2, 1].map((star) => (
              <div className="flex flex-wrap justify-between" key={star}>
                <StarRating noText stars={star} className="text-[.9rem]" />
                <span className="text-gray-400 text-base">
                  {`${
                    (ratingCount["Total Reviews"] ?? 0) === 0
                      ? 0
                      : Math.round(
                          ((ratingCount[star] ?? 0) /
                            ratingCount["Total Reviews"]) *
                            100
                        )
                  }%`}
                </span>
                <div className="mb-6 h-5 w-full bg-gray-300">
                  <div
                    className="h-5 bg-cyan-900"
                    style={{
                      width: `${
                        ratingCount["Total Reviews"] === 0
                          ? 0
                          : ((ratingCount[star] ?? 0) /
                              ratingCount["Total Reviews"]) *
                            100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {user && (
            <div className="">
              <ModalButton
                className="text-white bg-cyan-900 bg-opacity-95 font-semibold rounded-sm border-cyan-900 border-2 px-2 py-2 mx-auto mb-4 shadow-md shadow-gray-900 hover:bg-opacity-100 transition-colors duration-300 ease-in-out"
                onClick={() => {
                  setModalChild("addReview");
                  open();
                }}
              >
                Write a Product Review
              </ModalButton>
            </div>
          )}
        </div>
        <div className="review-container flex flex-col justify-start items-start gap-y-6 w-full md:w-3/5 py-8">
          {
            // If there are no reviews
            reviews.length === 0 && (
              <div className="flex flex-col self-center justify-center items-center gap-y-4">
                <h3 className="text-lg font-medium text-gray-400">
                  No reviews yet
                </h3>
                {user && (
                  <ModalButton
                    className="text-white bg-cyan-900 bg-opacity-95 font-semibold rounded-sm border-cyan-900 border-2 px-2 py-2 mx-auto mb-4 shadow-md shadow-gray-900 hover:bg-opacity-100 transition-colors duration-300 ease-in-out"
                    onClick={() => {
                      setModalChild("addReview");
                      open();
                    }}
                  >
                    Write a Product Review
                  </ModalButton>
                )}
              </div>
            )
          }
          {reviews.map((review) => (
            <div key={review.id} className="review w-full">
              <div className="border-b-2 px-2">
                <div className="reviewer flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      review.avatar ||
                      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                    alt=""
                  />
                  <div className="reviewer-info">
                    <h4 className="text-lg font-medium text-gray-400">
                      {review?.name || "Anonymous"}
                    </h4>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <StarRating stars={review.star} className="text-[.9rem]" />
                  <span className="block text-gray-400 text-base">
                    Reviewed{" "}
                    {timeSince(new Date(review.date + " " + review.time))} ago
                  </span>
                </div>
              </div>
              <p className="text-gray-400 px-2 text-lg md:text-xl mt-1">
                {review.message}
              </p>
            </div>
          ))}
          {!allFetched && (
            <div ref={loaderRef} className="w-full text-center">
              <ClipLoader color="rgb(22,78,99)" loading={true} size={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
