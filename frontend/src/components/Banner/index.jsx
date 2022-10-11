import React, { useEffect, useRef, useState } from "react";
import banner1 from "./images/banner1-sm.jpg";
import banner2 from "./images/banner2-sm.jpg";
import banner3 from "./images/banner3-sm.jpg";
import "./styles.css";

const fadeIn = (e) =>
  new Promise((resolve) => {
    e.classList.add("fade-in");
    return setTimeout(() => {
      e.classList.remove("fade-in");
      resolve();
    }, 1000);
  });

const fadeOut = (e) =>
  new Promise((resolve) => {
    e.classList.add("fade-out");
    return setTimeout(() => {
      e.classList.remove("fade-out");
      resolve();
    }, 1000);
  });

export default function Banner() {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);

  const imgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fadeOut(imgRef.current);
      setIndex((index + 1) % banners.length);
      await fadeIn(imgRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, index]);

  return (
    <div className="max-h-70vh overflow-hidden banners bg-orange-200">
      <img ref={imgRef} src={banners[index]} alt="Banner" />
    </div>
  );
}
