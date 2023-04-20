import { cloneElement, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonalImage1 from "./testimonial_1.jpg";
import TestimonalImage2 from "./testimonial_2.jpg";
import TestimonalImage3 from "./testimonial_3.jpg";
import TestimonalImage4 from "./testimonial_4.jpg";

export default function Testimonials() {
  const testimonialsData = [
    {
      id: 1,
      name: "Shreeja Chaturvedi",
      title: "Lucknow, India",
      image: TestimonalImage1,
      text: "I absolutely love Elegant Apparels! Their attention to detail and quality materials make their clothes worth the investment. Plus, their unique designs always make me feel stylish and confident. I constantly receive compliments when I wear their pieces. Highly recommend!",
    },
    {
      id: 2,
      name: "Swati Sachdeva",
      title: "Gurugram, India",
      image: TestimonalImage2,
      text: "The variety of stylish clothing and accessories is incredible, and the quality is unbeatable. Their customer service is also top-notch - I always receive prompt and helpful responses. I highly recommend this store to anyone looking for the latest fashion trends at affordable prices.",
    },
    {
      id: 3,
      name: "Neeti Palta",
      title: "Mumbai, India",
      image: TestimonalImage3,
      text: "I wanted to take a moment to express my deep appreciation and admiration for your brand. As a fashion enthusiast, I am constantly on the lookout for brands that embody style, quality, and sustainability, and I have found all of these qualities and more in your collections.",
    },
    {
      id: 4,
      name: "Rahul Dua",
      title: "Amritsar, India",
      image: TestimonalImage4,
      text: "I recently shopped from Elegant Apparels and was blown away by their amazing collection of clothing and accessories. The website was easy to navigate and the checkout process was smooth. I highly recommend this store to anyone looking for stylish and affordable fashion items!",
    },
  ];

  return (
    <motion.div
      className="testimonial-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <TestimonialCarousel>
        {testimonialsData.map((item) => {
          return <TestimonialCard data={item} key={item.id} />;
        })}
      </TestimonialCarousel>
    </motion.div>
  );
}

const TestimonialCarousel = ({ children }) => {
  const [index, setIndex] = useState(0);
  function next() {
    setIndex(index === children.length - 1 ? 0 : index + 1);
  }
  function previous() {
    setIndex(index === 0 ? children.length - 1 : index - 1);
  }
  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowRight":
        next();
        break;
      case "ArrowLeft":
        previous();
        break;
      default:
    }
  }

  // event listener for left/right keys
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  return (
    <div
      id="carousel"
      className="relative min-h-[46rem] overflow-hidden sm:min-h-[51rem] md:h-full md:min-h-fit md:w-full"
    >
      {children.map((child, i) => {
        if (child) {
          return cloneElement(child, {
            next: next,
            previous: previous,
            isVisible: i === index ? true : false,
          });
        }
        return null;
      })}
    </div>
  );
};

const TestimonialCard = ({
  data,
  previous = () => {},
  next = () => {},
  isVisible = true,
}) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={String(Math.random())}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <article
            style={{
              backgroundImage: `url('/images/pattern-bg.svg')`,
            }}
            className={
              "mt-8 overflow-auto bg-[length:87%] bg-[center_top_1.6rem] bg-no-repeat md:relative md:isolate md:mt-0 md:flex md:h-full md:w-full md:items-center md:justify-start md:bg-[length:48%] md:bg-testimonial"
            }
          >
            <h1 className="sr-only">Testimonial</h1>
            <div className="relative mx-auto mt-14 aspect-square w-[67.5%] md:absolute md:top-[48%] md:right-[11.5%] md:-z-[1] md:mt-0 md:h-[67.5%] md:w-auto md:-translate-y-1/2">
              <img
                alt={data.name}
                aria-hidden="true"
                src={data.image}
                className="h-full w-full rounded-lg object-cover shadow-xl"
              />
              <div className="absolute -bottom-[6%] left-0 right-0 mx-auto flex h-[2.5rem] w-[5rem] overflow-hidden rounded-full border-[1px] border-grayishBlue/50 bg-white shadow-xl hover:border-grayishBlue sm:h-[11%] sm:w-[21%] md:left-[11.5%] md:right-auto [&>button]:flex [&>button]:basis-1/2 [&>button]:items-center [&>button]:justify-center [&>button]:bg-white [&>button]:transition-all [&>button]:duration-500 hover:[&>button]:shadow-xl hover:[&>button]:brightness-75">
                <button aria-label="Previous Slide" onClick={() => previous()}>
                  <i className="fas fa-chevron-left text-grayishBlue text-[1.5rem] sm:text-[0.8rem] md:text-[1.5rem] lg:text-[0.8rem]"></i>
                </button>
                <button aria-label="Next Slide" onClick={() => next()}>
                  <i className="fas fa-chevron-right text-grayishBlue text-[1.5rem] sm:text-[0.8rem] md:text-[1.5rem] lg:text-[0.8rem]"></i>
                </button>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url('/images/pattern-quotes.svg')`,
              }}
              className="mx-auto mt-14 w-[86%] bg-[length:19%] bg-top bg-no-repeat pt-6 text-center text-lg leading-6 md:mt-0 md:ml-[11.5%] md:h-[45%] md:w-[40%] md:bg-[left_18%_top] md:pt-[4%] md:text-left md:text-[0.65rem] lg:text-[0.79rem] xl:text-base"
            >
              <q
                style={{
                  mixBlendMode: "color-burn",
                }}
                className="md:text-xl md:leading-[2.725rem]"
              >
                &nbsp;{data.text}&nbsp;
              </q>
              <div className="mt-4 gap-2 text-base md:mt-10 md:flex md:text-lg">
                <p className="font-bold">{data.name}</p>
                <p className="text-gray-400 font-medium">{data.title}</p>
              </div>
            </div>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
