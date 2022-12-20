import { useEffect, useState } from "react";

export default function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const cursorMoveHandler = (event) => {
      const { pageX, pageY } = event;
      setCursorPosition({ x: pageX, y: pageY });
    };
    const onMouseOutOfWindow = (e) => {
      setCursorPosition({ x: -100, y: -100 });
    };
    document.addEventListener("mousemove", cursorMoveHandler);
    document.documentElement.addEventListener("mouseleave", onMouseOutOfWindow);

    return () => {
      document.removeEventListener("mousemove", cursorMoveHandler);
      document.documentElement.removeEventListener(
        "mouseleave",
        onMouseOutOfWindow
      );
    };
  }, []);

  return cursorPosition;
}
