import React from "react";
import IsLoading from "Components/IsLoading";
import "./postsLoading.scss";

const PostsLoading = () => {
  return (
    <div className="posts-loading">
      <IsLoading isLoading size={64} />
      <p>Loading...</p>
    </div>
  );
};

export default PostsLoading;
