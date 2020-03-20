import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="about-footer">
      <footer>
        <div className="_8gii">
          <ul className="_8gik">
            <Link to="/the-wind-blows/about" className="_8gio">
              Home
            </Link>
          </ul>
          <ul className="_8gik">
            <Link to="/the-wind-blows/about-me" className="_8gio">
              About me
            </Link>
          </ul>
        </div>
        <Link to="/" className="_8git _8kk1">
          <span>The Wind Blows</span>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
