import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import imgBackground1 from "../Images/imgbtn1.svg";
import imgBackground2 from "../Images/imgbtn2.svg";

const Paragraph = ({
  title = "",
  description = "",
  directText = "",
  href = "",
  colorWhite = false
}) => {
  const classTitle = classNames("a2ct30", { a2ct36: colorWhite });
  const classDescription = classNames("a2ct31", { a2ct36: colorWhite });
  const classDirect = classNames("a2ct35", { a2ct36: colorWhite });

  return (
    <>
      <p className={classTitle}>{title}</p>
      <h2 className={classDescription}>{description}</h2>
      <Link to={href} className="a2ct32">
        <img className="a2ct33" src={imgBackground2} alt="" />
        <img className="a2ct34" src={imgBackground1} alt="" />
        <div className={classDirect}>{directText}</div>
      </Link>
    </>
  );
};

Paragraph.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  directText: PropTypes.string,
  href: PropTypes.string,
  colorWhite: PropTypes.bool
};

export default Paragraph;
