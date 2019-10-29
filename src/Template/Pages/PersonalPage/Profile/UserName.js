import React from "react";

const Username = ({ verified = true }) => {
  return (
    <div className="personal__header--username">
      <h1 className="username">chang.gio</h1>
      {verified && (
        <span className="verified" title="Verified">
          Verified
        </span>
      )}
      <a className="edit-account " href="/accounts/edit/">
        <button type="button">Edit Profile</button>
      </a>
    </div>
  );
};

export default Username;
