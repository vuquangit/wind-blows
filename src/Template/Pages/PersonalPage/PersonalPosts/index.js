import React from "react";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import PersonalPageCover from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";

const WrappedPersonalPost = () => {
  return (
    <div>
      <PersonalPageCover>
        <FetchPosts
          method={`get`}
          endpoint={`/posts`}
          iconEmpty={faCameraRetro}
          textEmpty={`No Post Yet`}
        />
      </PersonalPageCover>
    </div>
  );
};

export default WrappedPersonalPost;
