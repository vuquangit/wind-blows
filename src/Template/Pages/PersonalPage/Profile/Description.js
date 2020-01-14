import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Description = () => {
  const profile = useSelector((state = {}) => state.personalProfile.data);
  const { bio = "", fullName = "" } = profile;

  const _bio = bio.split("\n").map((item, key) => {
    return (
      <Fragment key={key}>
        {item}
        <br />
      </Fragment>
    );
  });

  return (
    <div className="personal__header--description">
      <h1 className="description-name">{fullName}</h1>
      <span className="description-bio">{_bio}</span>
    </div>
  );
};

export default Description;
