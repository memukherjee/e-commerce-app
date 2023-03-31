import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ProductCarouselSlideDetails from "../ProductCarouselSlideDetails";
import { motion } from "framer-motion";

export default function ProductsCarousel({
  products,
  allFetched,
  containerRef,
  setIsVisible,
}) {
  return (
    <div className="2xl:mx-auto 2xl:container flex justify-center">
      <div className="w-full">
        {/* Carousel for Small-Sized Screen */}
        <CarouselProvider
          className="relative block sm:hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={allFetched ? products.length : products.length + 1}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="js-flickity flex justify-center items-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white bg-opacity-50 hover:bg-opacity-70 border border-gray-300 hover:bg-gray-300 absolute z-[15] left-0 outline-none"
              id="prev"
            >
              <svg
                width={8}
                height={16}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="#444"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <Slider>
              {products.map((product) => (
                <Slide key={product?.product_id} index={product?.product_id}>
                  <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <img
                        src={product?.product_imageUrl}
                        alt={product?.product_name}
                        className="object-center object-contain w-full h-full"
                      />
                      <ProductCarouselSlideDetails product={product} />
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <img
                        src={product?.product_imageUrl}
                        alt={product?.product_name}
                        className="object-center object-contain w-full h-full"
                      />
                      <ProductCarouselSlideDetails product={product} />
                    </div>
                  </div>
                </Slide>
              ))}
              {!allFetched && (
                <Slide
                  key={"loader"}
                  index={"loader"}
                  className="carousel__inner-slideLarge h-full"
                >
                  <div className="h-64">
                    <div className="flex w-full h-full justify-center items-center">
                      <button
                        onClick={() => {
                          setIsVisible(true);
                          setTimeout(() => {
                            setIsVisible(false);
                          }, 500);
                        }}
                        className="bg-gray-400 text-white p-4"
                      >
                        Show More
                      </button>
                    </div>
                  </div>
                </Slide>
              )}
            </Slider>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white bg-opacity-50 hover:bg-opacity-70 border border-gray-300 hover:bg-gray-300 absolute z-[15] right-0 outline-none"
              id="next"
            >
              <svg
                width={8}
                height={16}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="#444"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for Medium and Large-Sized Screen */}
        <CarouselProvider
          className="relative hidden sm:block"
          naturalSlideWidth={300}
          isIntrinsicHeight={true}
          totalSlides={allFetched ? products.length : products.length + 1}
          visibleSlides={3}
          step={1}
          infinite={true}
          currentSlide={1}
        >
          <ButtonBack
            role="button"
            aria-label="slide backward"
            className="w-12 h-12 md:w-1/5 md:h-full flex justify-center items-center bg-transparent backdrop-blur-sm text-cyan-900 absolute z-[15] top-1/2 -translate-y-1/2 -left-8 ml-8"
            id="prev"
          >
            <svg
              style={{
                filter: "drop-shadow(3px 5px 2px rgb(222 222 255 / 0.7))",
              }}
              width={24}
              height={24}
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="rgb(22,78,99)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonBack>
          <ButtonNext
            role="button"
            aria-label="slide forward"
            className="w-12 h-12 md:w-1/5 md:h-full flex justify-center items-center bg-transparent backdrop-blur-sm text-cyan-900 absolute z-[15] top-1/2 -translate-y-1/2 -right-5 ml-8"
            id="next"
          >
            <svg
              style={{
                filter: "drop-shadow(3px 5px 2px rgb(222 222 255 / 0.7))",
              }}
              width={24}
              height={24}
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="rgb(22,78,99)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonNext>
          <div className="js-flickity flex justify-center items-center border-y-2">
            <Slider className="carousel__sliderLarge">
              {products.map((product) => (
                <Slide
                  className="carousel__inner-slideLarge"
                  key={product?.product_id}
                  index={product?.product_id}
                >
                  <div className="gallery-cell w-full h-full">
                    <motion.div
                      className="relative w-full h-full lg:block hidden"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <div
                        style={{
                          clipPath: "ellipse(30% 25% at 50% 50%)",
                          transform: "rotate(45deg)",
                        }}
                        className="absolute inset-0 bg-orange-300 z-[1] ml-5"
                      ></div>
                      <img
                        src={product?.product_imageUrl}
                        alt={product?.product_name}
                        className="relative object-center object-contain w-full h-full z-[5]"
                      />
                      <ProductCarouselSlideDetails product={product} />
                    </motion.div>
                    <div className="relative w-full h-full lg:hidden">
                      <div
                        style={{
                          clipPath: "ellipse(35% 40% at 50% 50%)",
                          transform: "rotate(45deg)",
                        }}
                        className="absolute inset-0 bg-orange-300 z-[1] "
                      ></div>
                      <img
                        src={product?.product_imageUrl}
                        alt={product?.product_name}
                        className="object-center object-contain w-full h-full relative z-[5]"
                      />
                      <ProductCarouselSlideDetails product={product} />
                    </div>
                  </div>
                </Slide>
              ))}
              {!allFetched && (
                <Slide
                  key={"loader"}
                  index={"loader"}
                  className="carousel__inner-slideLarge h-full"
                >
                  <div
                    ref={containerRef}
                    className="loader mx-auto text-center translate-y-1/2"
                  >
                    <div className="h-48 animate-pulse flex justify-center items-center">
                      <div
                        style={{
                          clipPath: "ellipse(35% 40% at 50% 50%)",
                          transform: "rotate(45deg)",
                        }}
                        className="h-64 w-56 bg-orange-300"
                      ></div>
                    </div>
                  </div>
                </Slide>
              )}
            </Slider>
          </div>
        </CarouselProvider>
      </div>

      <style>
        {`
                    .gallery-cell {
                        height: 386px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .gallery-cell {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .gallery-cell {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .carousel__inner-slideLarge {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
      </style>
    </div>
  );
}
