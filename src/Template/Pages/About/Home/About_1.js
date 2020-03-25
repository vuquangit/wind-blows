import React from "react";
import { Image } from "cloudinary-react";

const About_1 = () => {
  return (
    <div className="a1">
      <div className="a1__background">
        <div className="_8ip8">
          <div className="_8gtg _8la5" id="u_0_e">
            <div className="_8la4">
              <div className="_8jh6" id="u_0_f" />
            </div>
          </div>
        </div>
      </div>
      <div className="a1__text">
        <h1 className="a1__text--content">
          Bringing you closer to the people and things you{" "}
          <span className="text-animation">
            <span className="text-animation__content"> love </span>
          </span>
        </h1>
      </div>
      <div className="a1__images">
        <div className="a1__images--content">
          <div className="_8gif">
            <Image
              publicId="the-wind-blows/Project image/37cf96bbb95b4005194a_qvwf4m.jpg"
              className="_8gsr _8gif1"
            />
          </div>
          <div className="_8gig">
            <Image
              publicId="the-wind-blows/Project image/274a8fc8a02859760039_cjbzjv.jpg"
              className="_8gsr"
            />
          </div>
          <div className="_8gie">
            <Image
              publicId="the-wind-blows/Project image/6824d912f0f209ac50e3_dxzbkz.jpg"
              className="_8gsr _8gie1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_1;
