// Library Imports
import { useDispatch } from "react-redux";

// Local Imports
import { openCommentsListBox, setPostId } from "./postSlice";

function PostDescription({
  description,
  likesCount,
  commentsCount,
  postId,
  postedOn,
  postedBy,
}) {
  const dispatch = useDispatch();

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
      <div className="mt-4 flex flex-col">
        <p className="text-[1.2rem] font-bold text-slate-700">
          {postedOn?.split(" ")[0] || "24/06/2025"}
        </p>
        <span className="text-[1.5rem] font-semibold">{postedBy.username}</span>
        <p className="text-[1.3rem]">{description}</p>
      </div>
    </div>
  );
}

export default PostDescription;
