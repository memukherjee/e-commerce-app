import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddReviewModalChild from "../../components/AddReviewModalChild";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import ProductDetailsContainer from "../../components/ProductDetailsContainer";
import ProductReviewSection from "../../components/ProductReviewSection";
import SimilarProductsSection from "../../components/SimilarProductsSection";
import useModal from "../../hooks/useModal";
import useObserver from "../../hooks/useObserver";
import useReview from "../../hooks/useReview";
import useScrollToHashElement from "../../hooks/useScrollToHashElement";
import useTitle from "../../hooks/useTitle";
import { getCookie } from "../../utils/cookie";
import ProductQnASection from "../../components/ProductQnASection";
import AddQuestionForm from "../../components/AddQuestionForm";
import useQnA from "../../hooks/useQnA";
import AddAnswerForm from "../../components/AddAnswerForm";
// import { isPng } from "../../utils/validateCredentials";

export default function Product() {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const productFetched = useRef(false);
  useScrollToHashElement([product]);
  useTitle(`${product?.product_name || "Product"} || Elegant Apparels`);
  useEffect(() => {
    const userCookie = getCookie("refreshToken");
    function fetchProduct() {
      axios
        .get(process.env.REACT_APP_API + "/products/getProduct/" + pid, {
          headers: {
            Authorization: userCookie,
          },
        })
        .then((res) => {
          // console.log(res);
          setProduct((prev) => {
            return {
              ...prev,
              ...res.data?.productAverageRatingDTO,
              wishListed: res.data?.wishlisted,
            };
          });
          document.title = `${res.data?.product?.product_name} || Elegant Apparels`;
        })
        .catch((err) => {
          console.log(err);
          navigate("/404");
        });
    }

    if (!productFetched.current) {
      fetchProduct();
    }
    return () => {
      productFetched.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid, navigate]);

  const { modalOpen, close, open } = useModal();
  const [modalChild, setModalChild] = useState("");

  const [containerRef, isVisible] = useObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  const { reviews, addReview, ratingCount, allFetched } = useReview(
    pid,
    isVisible
  );
  const { QnAs, setQnAs, loading: qnaLoading } = useQnA(pid);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return product ? (
    <PageFadeTransitionContainer className="mx-auto overflow-hidden flex flex-col justify-center items-center relative w-11/12 text-center pt-12">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          modalChild === "image" ? (
            <ImageModalChild product={product} />
          ) : modalChild === "addReview" ? (
            <AddReviewModalChild close={close} addReview={addReview} />
          ) : modalChild === "addQuestion" ? (
            <AddQuestionForm productId={pid} close={close} setQnAs={setQnAs} />
          ) : modalChild === "addAnswer" ? (
            <AddAnswerForm
              close={close}
              productId={pid}
              question={selectedQuestion}
              setQnAs={setQnAs}
            />
          ) : (
            ""
          )
        }
        // customStyles={
        //   isPng(product?.product_imageUrl) && modalChild === "image"
        //     ? {
        //         backgroundImage:
        //           "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,0.2) 100%)",
        //         backgroundColor: "transparent",
        //       }
        //     : {}
        // }
      />
      <ProductDetailsContainer
        product={product}
        setProduct={setProduct}
        setModalChild={setModalChild}
        open={open}
      />
      <SimilarProductsSection product={product} />
      <ProductQnASection
        product={product}
        setModalChild={setModalChild}
        open={open}
        QnAs={QnAs}
        loading={qnaLoading}
        setSelectedQuestion={setSelectedQuestion}
      />
      <ProductReviewSection
        reviews={reviews}
        stars={product?.averageRating}
        ratingCount={ratingCount}
        open={open}
        setModalChild={setModalChild}
        allFetched={allFetched}
        loaderRef={containerRef}
      />
    </PageFadeTransitionContainer>
  ) : (
    <Loader />
  );
}

const ImageModalChild = ({ product }) => {
  return (
    <div className="w-full min-h-[70vh]">
      <img
        className="w-full h-full object-contain"
        src={product?.product_imageUrl}
        alt={product?.product_name}
      />
    </div>
  );
};
