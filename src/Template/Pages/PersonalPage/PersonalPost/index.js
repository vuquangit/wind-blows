import React from "react";
import PersonalPageCover from "../PersonalPageCover";
// import PersonalPost from "./PersonalPost";
import FetchPosts from "../FetchPosts";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

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
