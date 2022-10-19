import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  MouseOverLinkContext,
  MouseOverNavItemContext,
  ScrollContext,
} from "../../App";
import "./styles.css";

export default function Cursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const { mouseOverLink } = useContext(MouseOverLinkContext);
  const { mouseOverNavItem } = useContext(MouseOverNavItemContext);
  const scroll = useContext(ScrollContext);
  const cursorStyles = useMemo(
    () => ({
      left: cursorPosition.x + "px",
      top: cursorPosition.y + "px",
      transform: mouseOverNavItem || mouseOverLink ? "scale(2)" : "",
      backgroundColor: (mouseOverNavItem && !scroll) ? "#000" : "initial",
      zIndex: scroll ? "50" : "15",
    }),
    [cursorPosition, mouseOverNavItem, mouseOverLink, scroll]
  );


  useEffect(() => {
    const onMouseMove = (e) => {
      setCursorPosition({ x: e.pageX, y: e.pageY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div style={cursorStyles} className="cursor hidden md:block"></div>;
}
