// Library Imports
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import { TbLocationShare } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";

// Local Imports
import { useLikePost, useUnlikePost } from "../../hooks/useLikePost";

function SpanElement({ children, handleClick = undefined }) {
  return (
    <span className="hover:cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}

function handleLike(postId, handleLike) {
  handleLike(postId);
}

function PostFooter({ handleOpenCommentBox, postId, isLikedByUser }) {
  const { mutate: likeFn } = useLikePost();
  const { mutate: unLikeFn } = useUnlikePost();
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-8">
        <SpanElement
          handleClick={() =>
            handleLike(postId, isLikedByUser ? unLikeFn : likeFn)
          }
        >
          {isLikedByUser ? (
            <FaHeart size={24} fill="red" />
          ) : (
            <FaRegHeart size={24} />
          )}
        </SpanElement>
        <SpanElement handleClick={handleOpenCommentBox}>
          <FaRegCommentAlt size={21} />
        </SpanElement>
        <SpanElement>
          <TbLocationShare size={24} />
        </SpanElement>
      </div>
      <div>
        <SpanElement>
          <BiCollection size={24} />
        </SpanElement>
      </div>
    </div>
  );
}

export default PostFooter;
