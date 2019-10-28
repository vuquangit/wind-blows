import React, { Fragment } from "react";

const Description = ({
  name = "Chàng Gió 🐾",
  bio = "I'm the wind.... October🍃 Love photography 📷 \n바람 \n:) 🎼❄️🐥 ®"
}) => {
  const _renderBio = bio.split("\n").map((item, key) => {
    return (
      <Fragment key={key}>
        {item}
        <br />
      </Fragment>
    );
  });
  return (
    <div className="personal__header--description">
      <h1 className="description-name">{name}</h1>
      <span className="description-bio">{_renderBio}</span>
    </div>
  );
};

export default Description;
