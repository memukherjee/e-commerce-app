import { useRef } from "react";
import { useEffect } from "react";
import { motion as m } from "framer-motion";

function NotFound() {
  const circle1 = useRef(null);
  const circle2 = useRef(null);
  const circle3 = useRef(null);
  const circle4 = useRef(null);
  const circle5 = useRef(null);

  useEffect(() => {
    document.title = "404 Not Found";
    const w = window.innerWidth * 0.8;
    const h = window.innerHeight * 0.8;
    const bubbleMove = setInterval(() => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      circle1.current.style.backgroundColor = randomColor;
      circle2.current.style.backgroundColor = randomColor;
      circle3.current.style.backgroundColor = randomColor;
      circle4.current.style.backgroundColor = randomColor;
      circle5.current.style.backgroundColor = randomColor;
      circle1.current.style.left = `${Math.random() * w}px`;
      circle1.current.style.top = `${Math.random() * h}px`;
      circle2.current.style.left = `${Math.random() * w}px`;
      circle2.current.style.top = `${Math.random() * h}px`;
      circle3.current.style.left = `${Math.random() * w}px`;
      circle3.current.style.top = `${Math.random() * h}px`;
      circle4.current.style.left = `${Math.random() * w}px`;
      circle4.current.style.top = `${Math.random() * h}px`;
      circle5.current.style.left = `${Math.random() * w}px`;
      circle5.current.style.top = `${Math.random() * h}px`;
    }, 1000);
    return () => {
      clearInterval(bubbleMove);
    };
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-100vh mx-auto overflow-hidden flex justify-center items-center relative w-11/12 text-center"
    >
      <h1 className="font-bold text-8xl text-gray-400">
        404 Not Found
      </h1>
      {[1, 2, 3, 4, 5].map((i) => {
        return (
          <div
            key={i}
            // eslint-disable-next-line no-eval
            ref={eval(`circle${i}`)}
            style={{
              width: `${50*i}px`,
              height: `${50*i}px`,
            }}
            className={`circle ${i%2===0?"-left-400":"left-full"} ${i%2===0?"-top-400":"top-full"} left transition-all duration-1000 absolute opacity-50 bg-cyan-500 rounded-full`}
          ></div>
        );
      })}
    </m.div>
  );
}

export default NotFound;
