import React from "react";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";

import FollowStatus from "Containers/FollowStatus";

const EditFollows = () => {
  const { user: userProfile = {}, relationship = {} } = useSelector(
    (state = {}) => get(state, "personalProfile.data", {}),
    isEqual()
  );
  const viewerId = useSelector((state = {}) =>
    get(state, "profile.data.user.id", "")
  );

  return (
    <div className="profile-edit-follows">
      <FollowStatus
        user={userProfile}
        viewerId={viewerId}
        relationship={relationship}
      />
    </div>
  );
};

export default EditFollows;
