import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import WrapperAbout from "../WrapperAbout";
import Page1 from "./Page1";
import "./scss/aboutMe.scss";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const AboutMe = () => {
  return (
    <WrapperAbout>
      <div className="about-me">
        <StickyContainer>
          <Page1 />
          <Page2 />
          <Sticky distanceFromTop={80}>
            {({ style }) => (
              <div style={style}>
                <Page3 />
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <Page4 />
      </div>
    </WrapperAbout>
  );
};

export default AboutMe;
