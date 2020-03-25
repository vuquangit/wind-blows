import React from "react";
import { useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import { faSave } from "@fortawesome/free-regular-svg-icons";

import PersonalPageCover from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";
import Page404 from "Template/Pages/404";
import { withRouter } from "react-router-dom";

const WrappedPersonalSaved = ({ match = {} }) => {
  const ownerUsername = get(match, "params.username", "");
  const viewerUsername = useSelector(state =>
    get(state, "profile.data.user.username", "")
  );

  const isOwner = isEqual(ownerUsername, viewerUsername);

  return (
    <>
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
    </>
  );
};

export default withRouter(WrappedPersonalSaved);
