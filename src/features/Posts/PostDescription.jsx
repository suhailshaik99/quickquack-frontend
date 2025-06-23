// Library Imports
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { openCommentsListBox, setPostId } from "./postSlice";

function PostDescription({ description, likesCount, commentsCount, postId }) {
  
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user.userDetails);

  function handleOpenCommentsList() {
    dispatch(setPostId(postId));
    dispatch(openCommentsListBox());
  }

  return (
    <div className="py-2">
      <div className="flex gap-5">
        <span className="text-[1.2rem] font-semibold">
          {likesCount || 0} Likes
        </span>
        <span
          className="text-[1.2rem] font-semibold hover:cursor-pointer"
          onClick={handleOpenCommentsList}
        >
          {commentsCount || 0} Comments
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[1.5rem] font-semibold">{username}</span>
        <p className="text-[1.3rem]">{description}</p>
      </div>
    </div>
  );
}

export default PostDescription;
