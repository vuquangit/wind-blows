import React, { Fragment } from "react";

import "./scss/about.scss";
import About1 from "./About_1";
import Devider from "./Devider";
import About2 from "./About_2";
import AboutItem from "./AboutItem";
import aboutList from "./aboutList";
import WrapperAbout from "../WrapperAbout";

const Abouts = () => {
  return (
    <WrapperAbout>
      <div className="abouts">
        <About1 />
        <Devider />
        <About2 />
        <Devider />
        {aboutList &&
          aboutList.map((item, idx) => (
            <Fragment key={idx}>
              <AboutItem {...item} alignImage={idx % 2 === 0} />
              <Devider />
            </Fragment>
          ))}
      </div>
    </WrapperAbout>
  );
};

export default Abouts;
