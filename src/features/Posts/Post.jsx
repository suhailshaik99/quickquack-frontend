import PostImage from "./PostImage";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostDescription from "./PostDescription";
import { useState } from "react";
import CommentBox from "../Comments/CommentBox";

function Post() {
  const [openCommentBox, setOpenCommentBox] = useState(false);

  function handleOpenCommentBox() {
    setOpenCommentBox((prev) => !prev);
  }

  return (
    <div className="mt-3 flex h-auto w-[48rem] flex-col pt-4">
      <PostHeader />
      <PostImage />
      <PostFooter handleOpenCommentBox={handleOpenCommentBox} />
      <PostDescription />
      {openCommentBox && <CommentBox />}
    </div>
  );
}

export default Post;
