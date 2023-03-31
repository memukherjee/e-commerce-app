export default function StarRating({
  stars = 0,
  className,
  starColor,
  textColor,
  noText,
}) {
  return (
    <span
      style={starColor ? { color: starColor } : {}}
      className={"rating text-yellow-400 " + className}
    >
      {[...Array(Math.floor(stars ?? 0)).keys()].map((index) => {
        return (
          <span key={index}>
            <i className="fa-solid fa-star"></i>
          </span>
        );
      })}

      {Math.ceil(stars) === Math.floor(stars) ? null : (
        <span>
          <i className="fa-regular fa-star-half-stroke"></i>
        </span>
      )}

      {[...Array(5 - Math.ceil(stars ?? 0)).keys()].map((index) => {
        return (
          <span key={index}>
            <i className="fa-regular fa-star"></i>
          </span>
        );
      })}
      {!noText && (
        <span
          style={textColor ? { color: textColor } : {}}
          className="text-gray-400 text-base no-underline ml-1"
        >
          ({Math.round(parseFloat(stars) * 100) / 100 ?? 0}{" "}
          {stars > 1 ? "Stars" : "Star"})
        </span>
      )}
    </span>
  );
}
