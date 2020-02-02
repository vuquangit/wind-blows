import React, { useState, useEffect } from "react";
import Header from "../Pages/Header";
import "./basicTemplate.scss";
import Footer from "Template/Pages/Footer";

const BasicTemplate = ({ children }) => {
  // eslint-disable-next-line
  const [isScroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = e => {
    // let element = e.target.scrollingElement;
    // if (element && element.scrollTop > 0) {
    //   // do something at end of scroll
    //   setScroll(true);
    // } else setScroll(false);
  };

  return (
    <div className="basic-template" onScroll={handleScroll}>
      <div className="basic-template__header">
        <Header isScroll={isScroll} />
      </div>
      <div className="basic-template__children">
        <div className="basic-template__children--content">{children}</div>
      </div>
      <div className="basic-template__footer">
        <Footer />
      </div>
    </div>
  );
};

export default BasicTemplate;
