import Story from "../Stories/Story";
import moment from "moment-timezone";

function Comment({ comment }) {
  const {
    comment: commentText,
    createdAt,
    userId: { profilePicture, username },
  } = comment;
  return (
    <div className="flex gap-4 px-5 py-2">
      <div className="flex-shrink-0">
        <Story height={5} width={5} profilePicture={profilePicture} />
      </div>

      <div className="flex flex-col justify-center gap-1 text-[1.4rem]">
        <div className="flex flex-wrap">
          <span className="mr-2 font-semibold">{username || "username"}</span>
          &nbsp;&nbsp;
          <span className="font-medium text-slate-800">
            {commentText ||
              "comment here comment here comment here comment here comment here comment here comment here"}
          </span>
        </div>
        <p className="text-xl font-medium">
          {moment(createdAt).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A")}
        </p>
      </div>
    </div>
  );
}

export default Comment;
