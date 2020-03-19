import React from "react";

import About1 from "./About_1";
import Devider from "./Devider";
import "./about.scss";
import About2 from "./About_2";
import About3 from "./About_3";

const Abouts = () => {
  return (
    <div className="abouts">
      <About1 />
      <Devider />
      <About2 />
      <Devider />
      <About3 />
      <Devider />
    </div>
  );
};

export default Abouts;
