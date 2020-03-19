import React from "react";
import { Link } from "react-router-dom";

const About_2 = () => {
  return (
    <div className="a2">
      <div className="a2__content">
        <div className="a2__content--image">
          <div
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dnzsa2z7b/image/upload/v1584591521/the-wind-blows/Project%20image/5385ef3a75da8d84d4cb_xsizsi.jpg)`
            }}
            className="a2img"
          />
        </div>
        <div className="a2__content--text">
          <div className="a2ct">
            <div className="a2ct1">
              <div className="a2ct2">
                <p className="a2ct30"> ALL ARE WELCOME </p>
                <h2 className="a2ct31">
                  We're committed to fostering a safe and supportive community
                  for everyone.
                </h2>
                <Link to="/" className="a2ct32">
                  Comminity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_2;
