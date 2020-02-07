import React from "react";
import { faSave } from "@fortawesome/free-regular-svg-icons";

import PersonalPageCover from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";

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
