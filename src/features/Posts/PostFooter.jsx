// Library Imports
import moment from "moment-timezone";
import { useSelector } from "react-redux";

// Icon Imports
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { BiCollection } from "react-icons/bi";
import { TbLocationShare } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";

// Local Imports
import { useSocket } from "../../contexts/socketContext";
import { useLikePost, useUnlikePost } from "../../hooks/useLikePost";

function SpanElement({ children, handleClick = undefined }) {
  return (
    <span className="hover:cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}

function PostFooter({ handleOpenCommentBox, postId, isLikedByUser, postedBy }) {
  const socket = useSocket();
  const { mutate: likeFn } = useLikePost();
  const { mutate: unLikeFn } = useUnlikePost();
  const { _id: userId } = useSelector((state) => state.user.userDetails);

  function handleLike(postId, handleLike) {
    handleLike(postId);
    socket.emit("trigger-like-notification", {
      userId,
      postedBy,
      postId,
      isLikedByUser,
      actionAt: moment().tz("Asia/Kolkata").format("h:mm A"),
      fullTime: moment().tz("Asia/Kolkata").format("DD/MM/YYYY h:mm:ss A z")
    });
  }

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
