import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import StarRating from "../../../components/StarRating";
import useSellerReviews from "../../../hooks/useSellerReviews";
import AnimatedText from "../../../components/AnimatedText";
import { timeSince } from "../../../utils/timeFormater";
import useTitle from "../../../hooks/useTitle";

export default function SellerReviews() {
  useTitle("Product Reviews | Elegant Apparels");
  const { reviews, processing } = useSellerReviews();
  return (
    <PageFadeTransitionContainer className="min-h-100vh pt-16">
      <div className="seller-reviews mb-8 md:mb-16">
        <AnimatedText
          className="text-2xl font-pen md:text-4xl font-bold text-cyan-900 my-4"
          text={"Check your products' Reviews"}
          direction="y"
          size="large"
          align="center"
          delay={0.5}
        />
        <div className="reviews-container w-11/12 max-w-1000 mx-auto">
          {processing ? (
            <div className="loader w-full text-center">
              <ClipLoader color="#164e63" loading={true} size={50} />
            </div>
          ) : (
            <div className="reviews flex flex-col-reverse gap-y-8">
              {reviews.length === 0 && (
                <div className="no-reviews text-center text-xl text-gray-400">
                  <span>No reviews yet</span>
                </div>
              )}
              {reviews.map((review) => (
                <div
                  key={review?.id}
                  className="review flex flex-col md:flex-row justify-between md:items-start border-b py-2"
                >
                  <div className="review-left flex flex-wrap justify-between items-start">
                    <div className="reviewer w-full flex justify-start items-center gap-x-4">
                      <div className="reviewer-image w-14 h-14 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={review?.user?.avatar ?? ""}
                          alt="reviewer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                          }}
                        />
                      </div>
                      <div className="reviewer-info">
                        <div className="reviewer-name text-cyan-900 font-medium">
                          {review?.user?.name ?? "Anonymous"}
                        </div>
                        <div className="reviewer-date text-base text-gray-400">
                          Reviewed{" "}
                          {timeSince(new Date(review.date + " " + review.time))}{" "}
                          ago
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      <div className="rating">
                        <StarRating stars={review?.star} />
                      </div>
                      <div className="review-text text-gray-500">
                        {review?.message ?? "No review message"}
                      </div>
                    </div>
                  </div>
                  <div className="review-right">
                    <div className="review-for flex flex-col justify-between md:items-end gap-y-1 text-[.9rem]">
                      <span className="review-for-product max-w-300 text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis inline-block">{`Review for ${review?.product?.product_name}`}</span>
                      <div className="reviewed-product-image w-20 h-20 overflow-hidden hidden md:block">
                        <img
                          className="w-full h-full object-cover"
                          src={review?.product?.product_imageUrl ?? ""}
                          alt="reviewer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                          }}
                        />
                      </div>
                      <span className="product-link bg-cyan-900 rounded-sm text-white text-center px-2 py-1">
                        <Link
                          to={`/product/${review?.product?.product_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View product
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
