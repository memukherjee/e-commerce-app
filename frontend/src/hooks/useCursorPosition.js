import { useEffect, useState } from "react";

export default function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState({
    x: -100,
    y: -100,
    position: "in",
  });

  useEffect(() => {
    const cursorMoveHandler = (event) => {
      const { pageX, pageY } = event;
      setCursorPosition({
        x: pageX,
        y: pageY,
        position: "in",
      });
    };
    const onMouseOutOfWindow = (e) => {
      setCursorPosition((prev) => ({ ...prev, position: "out" }));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cursorPosition;
}
