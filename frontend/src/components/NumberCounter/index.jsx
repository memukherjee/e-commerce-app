import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberCounter({
  from = 0,
  to = 100,
  duration = 1,
  className,
}) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString("en-IN");
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <span className={className} ref={nodeRef} />;
}
