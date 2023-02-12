import { useEffect, useRef, useState } from "react";

export default function useObserver(options){
    const containerRef = useRef(null);
    const [isVisble, setIsVisible] = useState(false);

    const callback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        if(containerRef.current){
            observer.observe(containerRef.current);
        }
        return () => {
            if(containerRef.current){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisble];

}