import React, { useContext, useMemo } from "react";
import { MouseOverNavItemContext } from "../../contexts/mouseOverNavItemContext";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import { ScrollContext } from "../../contexts/scrollContext";
import useCursorPosition from "../../hooks/useCursorPosition";
import "./styles.css";
import { MouseTransparentContext } from "../../contexts/mouseTransparentContext";
import { ModalContext } from "../../contexts/modalContext";

function Cursor() {
  const cursorPosition = useCursorPosition();

  const { mouseOverLink } = useContext(MouseOverLinkContext);
  const { mouseOverNavItem } = useContext(MouseOverNavItemContext);
  const { mouseTransparent } = useContext(MouseTransparentContext);
  const scroll = useContext(ScrollContext);
  const {modalOpen} = useContext(ModalContext);
  const cursorStyles = useMemo(
    () => ({
      left: cursorPosition.x + "px",
      top: cursorPosition.y + "px",
      transform: mouseOverNavItem || mouseOverLink ? "scale(2)" : "",
      backgroundColor: mouseOverNavItem && !scroll ? "#000" : "initial",
      zIndex: scroll || modalOpen ? "50" : "17",
      backdropFilter: mouseTransparent?"invert(0)":"invert(1)",
      opacity: cursorPosition.position==="in"?"1":"0",
    }),
    [cursorPosition, mouseOverNavItem, mouseOverLink, scroll, mouseTransparent, modalOpen]
  );

  return <div style={cursorStyles} className="cursor hidden md:block"></div>;
}

export default Cursor;
