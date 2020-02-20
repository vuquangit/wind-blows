import React from "react";
import { animated } from "react-spring";

const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 8 + 3.5}px,${y / 8 - 23.0}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 25.0}px,${y / 6 - 20.0}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 5}px,${y / 5}px,0)`;

const MouseParallax = ({ mouseParallax }) => {
  return (
    <div className="icon__wrapper">
      <animated.div
        className="card1"
        style={{ transform: mouseParallax.xy.interpolate(trans1) }}
      />
      <animated.div
        className="card2"
        style={{ transform: mouseParallax.xy.interpolate(trans2) }}
      />
      <animated.div
        className="card3"
        style={{ transform: mouseParallax.xy.interpolate(trans3) }}
      />
      <animated.div
        className="card4"
        style={{ transform: mouseParallax.xy.interpolate(trans4) }}
      />
    </div>
  );
};

export default MouseParallax;
