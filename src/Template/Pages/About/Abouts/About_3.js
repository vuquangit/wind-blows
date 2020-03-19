import React from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const About_3 = () => {
  return (
    <div className="a3">
      <div className="a3img">
        <Image
          publicId="the-wind-blows/Project image/d635c36bdc6e25307c7f_m2l4zw.jpg"
          className="a3img"
        />
      </div>
      <div className="a3t0">
        <div className="a3t1">
          <div className="a3t2">
            <div>
              <p className="_8g86 _8kjd _8iq5 _8ird"> GROW WITH US </p>
              <h2 className="_8iq3 _8g86 _8kjd _8iq7">
                Share and grow your brand with our diverse, global community.
              </h2>
              <Link to="/" className="_8giz _8g86 _8kis">
                <img
                  className="_8gj0 _8gj2 img"
                  src="https://static.xx.fbcdn.net/rsrc.php/yo/r/vKeJd7vs2s4.svg"
                  alt=""
                />
                <img
                  className="_8gj0 _8gj1 img"
                  src="https://static.xx.fbcdn.net/rsrc.php/yK/r/jlkARBBRcFY.svg"
                  alt=""
                />
                <div className="_8iqa _8gi_"> Business </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_3;
