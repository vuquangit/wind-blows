import { useState, useRef, useEffect } from "react";

// export function useClientRect() {
//   const [rect, setRect] = useState(null);
//   const ref = useCallback(node => {
//     if (node !== null) {
//       setRect(node.getBoundingClientRect());
//     }
//   }, []);
//   return [rect, ref];
// }

export const useClientRect = () => {
  const ref = useRef();
  const [rect, setBbox] = useState({});
  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});
  useEffect(() => {
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return [rect, ref];
};
