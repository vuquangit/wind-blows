import React from "react";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import { faSave } from "@fortawesome/free-regular-svg-icons";

import PersonalPageCover from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";
import Page404 from "Template/Pages/404";

const WrappedPersonalSaved = () => {
  const { id: viewerId = "" } = useSelector(
    state => get(state, "profile.data.user") || ""
  );
  const { id: ownerId = "" } = useSelector(
    state => get(state, "personalProfile.data.user") || ""
  );
  const isOwner = isEqual(viewerId, ownerId);

  return (
    <div>
      {isOwner ? (
        <PersonalPageCover>
          <FetchPosts
            method="get"
            endpoint="/saved/posts"
            iconEmpty={faSave}
            textEmpty="No Post Saved Yet"
          />
        </PersonalPageCover>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default WrappedPersonalSaved;
