import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import BasicTemplate from "Template/BasicTemplate";
import { useTrail, animated } from "react-spring";
import "./home.scss";
import "./styles.scss";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const HomePage = () => {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow)
  }));

  return (
    <BasicTemplate>
      <div className="home">
        <div className="home__goo-blobs">
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="30"
              />
              <feColorMatrix
                in="blur"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
              />
            </filter>
          </svg>
          <div
            className="hooks-main"
            onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
          >
            {trail.map((props, index) => (
              <animated.div
                key={index}
                style={{ transform: props.xy.interpolate(trans) }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="home__icon">
            <FontAwesomeIcon icon={faFan} className="home__icon--svg" />
          </div>
        </div>
      </div>
    </BasicTemplate>
  );
};

export default withRouter(HomePage);
