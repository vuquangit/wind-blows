import React, { useState } from "react";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import WrapperPersonalPage from "../WrapperPersonalPage";
import FetchPosts from "../FetchPosts";

const WrappedPersonalPost = () => {
  const [newPosts, setNewPosts] = useState([]);
  // new post status
  const handleAddNewPost = item => {
    setNewPosts([item]);
  };

  return (
    <WrapperPersonalPage handleAddNewPost={handleAddNewPost}>
      <FetchPosts
        method={`get`}
        endpoint={`/posts`}
        iconEmpty={faCameraRetro}
        textEmpty={`No Post Yet`}
        newPosts={newPosts}
      />
    </WrapperPersonalPage>
  );
};

export default WrappedPersonalPost;
