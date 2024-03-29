import { useRef } from "react";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";

function NotFound() {
  const circle1 = useRef(null);
  const circle2 = useRef(null);
  const circle3 = useRef(null);
  const circle4 = useRef(null);
  const circle5 = useRef(null);

  const getRandom = () => {
    const min = 0.2;
    const max = 0.8;
    return Math.random() * (max - min) + min;
  };

  useTitle("404 Not Found || Elegant Apparels");

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bubbleMove = setInterval(() => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      circle1.current.style.backgroundColor = randomColor;
      circle2.current.style.backgroundColor = randomColor;
      circle3.current.style.backgroundColor = randomColor;
      circle4.current.style.backgroundColor = randomColor;
      circle5.current.style.backgroundColor = randomColor;
      circle1.current.style.left = `${getRandom() * w}px`;
      circle1.current.style.top = `${getRandom() * h}px`;
      circle2.current.style.left = `${getRandom() * w}px`;
      circle2.current.style.top = `${getRandom() * h}px`;
      circle3.current.style.left = `${getRandom() * w}px`;
      circle3.current.style.top = `${getRandom() * h}px`;
      circle4.current.style.left = `${getRandom() * w}px`;
      circle4.current.style.top = `${getRandom() * h}px`;
      circle5.current.style.left = `${getRandom() * w}px`;
      circle5.current.style.top = `${getRandom() * h}px`;
    }, 1000);
    return () => {
      clearInterval(bubbleMove);
    };
  }, []);

  return (
    <PageFadeTransitionContainer className="relative flex items-center justify-center w-full mx-auto overflow-hidden text-center h-100vh">
      <h1 className="font-bold text-gray-400 text-8xl">404 Not Found</h1>

      {[1, 2, 3, 4, 5].map((i) => {
        return (
          <div
            key={i}
            // eslint-disable-next-line no-eval
            ref={eval(`circle${i}`)}
            style={{
              width: `${50 * i}px`,
              height: `${50 * i}px`,
            }}
            className={`circle ${i % 2 === 0 ? "-left-400" : "left-full"} ${
              i % 2 === 0 ? "-top-400" : "top-full"
            } left transition-all duration-1000 absolute opacity-50 bg-cyan-500 rounded-full`}
          ></div>
        );
      })}
    </PageFadeTransitionContainer>
  );
}

export default NotFound;
