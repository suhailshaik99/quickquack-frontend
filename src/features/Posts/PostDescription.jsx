import { useSelector } from "react-redux";

function PostDescription({ description, likes, comments }) {
  const { username } = useSelector((state) => state.user.userDetails);

  return (
    <div className="py-2">
      <div className="flex gap-5">
        <span className="text-[1.2rem] font-semibold">
          {likes?.length || 0} Likes
        </span>
        <span className="text-[1.2rem] font-semibold">
          {comments?.length || 0} Comments
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
