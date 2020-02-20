import React, { useState } from "react";
import Header from "../Pages/Header";
import "./basicTemplate.scss";
import Footer from "Template/Pages/Footer";

const BasicTemplate = ({ children }) => {
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  const [isScrolled, setIsScrolled] = useState(false);

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
      setIsScrolled(false);
    } else {
      document.getElementById("navbar").style.top = "-60px";
      setIsScrolled(true);
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div className="basic-template">
      <div className="basic-template__header" id="navbar">
        <Header isScrolled={isScrolled} />
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
