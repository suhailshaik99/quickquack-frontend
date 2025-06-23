// Library Imports
import { useState } from "react";

// Local Imports
import PostImage from "./PostImage";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostDescription from "./PostDescription";
import CommentBox from "../Comments/CommentBox";

function Post({ post }) {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const {
    postUrl,
    description,
    likesCount,
    commentsCount,
    isLikedByUser,
    postedBy,
  } = post;
  
  function handleOpenCommentBox() {
    setOpenCommentBox((prev) => !prev);
  }
 
  return (
    <div className="mt-3 flex h-auto w-[38rem] flex-col justify-center px-2 pt-4 sm:w-[48rem]">
      <PostHeader postedBy={postedBy} />
      <PostImage postUrl={postUrl} />
      <PostFooter
        handleOpenCommentBox={handleOpenCommentBox}
        postId={post._id}
        isLikedByUser={isLikedByUser}
        postedBy={postedBy._id}
      />
      <PostDescription
        description={description}
        likesCount={likesCount}
        commentsCount={commentsCount}
        postId={post._id}
      />
      {openCommentBox && (
        <CommentBox
          postId={post._id}
          postedBy={postedBy._id}
          handleOpenCommentBox={handleOpenCommentBox}
        />
      )}
    </div>
  );
}

export default Post;
