import { useEffect, useRef, useState } from "react";

export default function useObserver(options){
    const containerRef = useRef(null);
    const [isVisble, setIsVisible] = useState(false);

    const callback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        let observerRefValue = null;
        const observer = new IntersectionObserver(callback, options);
        if(containerRef.current){
            observer.observe(containerRef.current);
            observerRefValue = containerRef.current;
        }
        return () => {
            if(observerRefValue){
                observer.unobserve(observerRefValue);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisble, setIsVisible];

}