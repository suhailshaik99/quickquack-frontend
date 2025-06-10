import Story from "../Stories/Story";

function Comment({ comment }) {
  const {
    comment: commentText,
    userId: { profilePicture, username },
  } = comment;
  return (
    <div className="flex gap-3 py-2">
      <div className="flex-shrink-0">
        <Story height={3.5} width={3.5} profilePicture={profilePicture} />
      </div>

      <div className="flex flex-col gap-2 text-[1.4rem]">
        <p className="flex flex-wrap">
          <span className="mr-2 font-semibold">{username || "username"}</span>
          &nbsp;&nbsp;
          <span className="font-medium text-slate-800">
            {commentText ||
              "comment here comment here comment here comment here comment here comment here comment here"}
          </span>
        </p>
        <p className="text-xl font-medium">2h</p>
      </div>
    </div>
  );
}

export default Comment;
