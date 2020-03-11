import { useState, useRef, useEffect } from "react";
export const useBbox = () => {
  const ref = useRef();
  const [rect, setRect] = useState({});

  const set = () =>
    setRect(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return [rect, ref];
};
