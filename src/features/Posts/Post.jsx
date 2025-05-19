import { useState } from "react";

import PostImage from "./PostImage";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostDescription from "./PostDescription";
import CommentBox from "../Comments/CommentBox";

function Post({ post }) {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const { postUrl, description, likes, isLikedByUser } = post;

  function handleOpenCommentBox() {
    setOpenCommentBox((prev) => !prev);
  }

  return (
    <div className="mt-3 flex h-auto w-[48rem] flex-col pt-4">
      <PostHeader />
      <PostImage postUrl={postUrl}/>
      <PostFooter handleOpenCommentBox={handleOpenCommentBox} postId={post._id} isLikedByUser={isLikedByUser} />
      <PostDescription description={description} likes={likes} />
      {openCommentBox && <CommentBox />}
    </div>
  );
}

export default Post;
