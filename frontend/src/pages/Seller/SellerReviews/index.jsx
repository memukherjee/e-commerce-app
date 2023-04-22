import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import StarRating from "../../../components/StarRating";
import useSellerReviews from "../../../hooks/useSellerReviews";
import AnimatedText from "../../../components/AnimatedText";
import { timeSince } from "../../../utils/timeFormater";
import useTitle from "../../../hooks/useTitle";

export default function SellerReviews() {
  useTitle("Your Products' Reviews || Elegant Apparels");
  const { reviews, processing } = useSellerReviews();
  return (
    <PageFadeTransitionContainer className="pt-16 min-h-100vh">
      <div className="mb-8 seller-reviews md:mb-16">
        <AnimatedText
          className="my-4 text-2xl font-bold font-pen md:text-4xl text-cyan-900"
          text={"Check your products' Reviews"}
          direction="y"
          size="large"
          align="center"
          delay={0.5}
        />
        <div className="w-11/12 mx-auto reviews-container max-w-1000">
          {processing ? (
            <div className="w-full text-center loader">
              <ClipLoader color="#164e63" loading={true} size={50} />
            </div>
          ) : (
            <div className="flex flex-col-reverse reviews gap-y-8">
              {reviews.length === 0 && (
                <div className="text-xl text-center text-gray-400 no-reviews">
                  <span>No reviews yet</span>
                </div>
              )}
              {reviews.map((review) => (
                <div
                  key={review?.id}
                  className="flex flex-col justify-between py-2 border-b review md:flex-row md:items-start"
                >
                  <div className="flex flex-wrap items-start justify-between review-left">
                    <div className="flex items-center justify-start w-full reviewer gap-x-4">
                      <div className="overflow-hidden rounded-full reviewer-image w-14 h-14">
                        <img
                          className="object-cover w-full h-full"
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
                        <div className="font-medium reviewer-name text-cyan-900">
                          {review?.user?.name ?? "Anonymous"}
                        </div>
                        <div className="text-base text-gray-400 reviewer-date">
                          Reviewed{" "}
                          {timeSince(new Date(review?.createdAt))}{" "}
                          ago
                        </div>
                      </div>
                    </div>
                    <div className="review-rating">
                      <div className="rating">
                        <StarRating stars={review?.star} />
                      </div>
                      <div className="text-gray-500 review-text">
                        {review?.message ?? "No review message"}
                      </div>
                    </div>
                  </div>
                  <div className="review-right">
                    <div className="review-for flex flex-col justify-between md:items-end gap-y-1 text-[.9rem]">
                      <span className="inline-block overflow-hidden text-gray-400 review-for-product max-w-300 whitespace-nowrap text-ellipsis">{`Review for ${review?.product?.product_name}`}</span>
                      <div className="hidden w-20 h-20 overflow-hidden reviewed-product-image md:block">
                        <img
                          className="object-cover w-full h-full"
                          src={review?.product?.product_imageUrl ?? ""}
                          alt="reviewer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                          }}
                        />
                      </div>
                      <span className="px-2 py-1 text-center text-white rounded-sm product-link bg-cyan-900">
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
