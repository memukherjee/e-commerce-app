import React, { useCallback, useEffect, useRef } from "react";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({
  min,
  max,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
}) => {
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="slider-container relative flex items-center justify-center w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="slider-thumb thumb--left z-[3] appearance-none pointer-events-none absolute h-0 w-full outline-none"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="slider-thumb thumb--right z-[4] appearance-none pointer-events-none absolute h-0 w-full outline-none"
      />

      <div className="slider relative w-full">
        <div className="slider__track absolute rounded h-[5px] bg-orange-200 w-full z-[1]" />
        <div ref={range} className="slider__range absolute rounded h-[5px] bg-cyan-900 z-[2]" />
        <div className="slider__left-value absolute text-white text-xs mt-4 left-1">{minVal}</div>
        <div className="slider__right-value absolute text-white text-xs mt-4 -right-1">{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
