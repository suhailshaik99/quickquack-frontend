import { useState } from "react";

import PostImage from "./PostImage";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostDescription from "./PostDescription";
import CommentBox from "../Comments/CommentBox";

function Post({ post }) {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const { postUrl, description, likes, comments, isLikedByUser } = post;

  function handleOpenCommentBox() {
    setOpenCommentBox((prev) => !prev);
  }
  // w-[48rem]
  return (
    <div className="mt-3 flex h-auto w-[41rem] flex-col justify-center px-2 pt-4 sm:w-[48rem]">
      <PostHeader />
      <PostImage postUrl={postUrl} />
      <PostFooter
        handleOpenCommentBox={handleOpenCommentBox}
        postId={post._id}
        isLikedByUser={isLikedByUser}
      />
      <PostDescription
        description={description}
        likes={likes}
        comments={comments}
        postId={post._id}
      />
      {openCommentBox && (
        <CommentBox
          postId={post._id}
          handleOpenCommentBox={handleOpenCommentBox}
        />
      )}
    </div>
  );
}

export default Post;
