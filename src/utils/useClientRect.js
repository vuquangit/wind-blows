import { useState, useRef, useEffect, useLayoutEffect } from "react";

// https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
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
    window.addEventListener("useClientRectEvent", set);
    return () => window.removeEventListener("useClientRectEvent", set);
  }, []);

  // useLayoutEffect(() => {
  //   set();
  //   window.addEventListener("useClientRectEvent", set);
  //   return () => window.removeEventListener("useClientRectEvent", set);
  // }, []);

  return [rect, ref];
};
