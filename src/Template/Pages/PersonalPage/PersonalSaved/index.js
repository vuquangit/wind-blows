import React from "react";
import PersonalPageCover from "../PersonalPageCover";
import FetchPosts from "../FetchPosts";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const WrappedPersonalSaved = () => {
  return (
    <div>
      <PersonalPageCover>
        <FetchPosts
          method={`get`}
          endpoint={`/saved/posts`}
          iconEmpty={faSave}
          textEmpty={`No Post Saved Yet`}
        />
      </PersonalPageCover>
    </div>
  );
};

export default WrappedPersonalSaved;
