import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToHashElement(dependencies = []) {
  const location = useLocation();

  let getHashElement = useCallback(() => {
    let hash = location.hash;
    const removeHashCharacter = (str) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      let element = document.getElementById(removeHashCharacter(hash));
      return element;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    let hashElement = getHashElement();
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: "smooth",
        // block: "end",
        inline: "nearest",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHashElement, ...dependencies]);
}
