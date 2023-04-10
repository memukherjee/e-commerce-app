export default function TooltipText({
  text,
  className,
  tooltipText,
  tooltipClassName,
  tooltipPosition,
}) {
  return (
    <div className="group flex relative">
      <span className={className}>{text}</span>
      <span
        style={
          tooltipPosition === "top"
            ? { bottom: "100%", left: "50%", transform: "translateX(-50%)" }
            : tooltipPosition === "left"
            ? { right: "100%", top: "50%", transform: "translateY(-50%)" }
            : tooltipPosition === "right"
            ? { left: "100%", top: "50%", transform: "translateY(-50%)" }
            : { top: "100%", left: "50%", transform: "translateX(-50%)" }
        }
        className={`group-hover:opacity-100 transition-opacity absolute opacity-0 mx-auto ${tooltipClassName}`}
      >
        {tooltipText}
      </span>
    </div>
  );
}
