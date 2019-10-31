import React from "react";

const Avatar = () => {
  return (
    <div className="personal__header--avatar">
      <div className="avatar-layer1">
        <div className="avatar-layer2">
          <button className="avatar-button" title="Change Profile Photo">
            {/* eslint-disable-next-line */}
            <img
              className="avatar-image"
              src="https://instagram.fsgn3-1.fna.fbcdn.net/vp/48530ae1e3dde2754e0c04e65e35189e/5E5F4C5C/t51.2885-19/s150x150/69995268_1404715403009677_541419338201038848_n.jpg?_nc_ht=instagram.fsgn3-1.fna.fbcdn.net"
              alt="Change Profile Photo"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
