import Story from "../Stories/Story";
import { GoDotFill } from "react-icons/go";

function NotificationCard({ notification }) {
  const {
    sender: { username, profilePicture },
    type,
    post: { postUrl },
    actionAt,
    fullTime,
    isRead,
  } = notification;
  let message = "";
  if (type === "new-post") {
    message = "has uploaded a new post, check it out.!";
  } else if (type === "comment") {
    message = "has commented on your post.";
  } else if (type === "like") {
    message = "has liked your post.!!";
  }
  return (
    <div className="flex min-h-28 w-full items-center gap-4 rounded-2xl bg-sky-100 px-3 shadow-md shadow-gray-400 hover:cursor-pointer hover:bg-sky-200">
      <Story profilePicture={profilePicture} height={6} width={6} />
      <div className="flex flex-1 flex-col gap-2 sm:gap-1">
        <p className="text-2xl font-medium">
          <span className="font-bold">{username}</span> {message}
        </p>
        <p className="text-[1.2rem] font-bold text-sky-500">
          {fullTime.split(" ")[0]} {actionAt}
        </p>
      </div>
      <div>{!isRead && <GoDotFill size={18} className="text-sky-500" />}</div>
      <Story profilePicture={postUrl} height={6} width={6} />
    </div>
  );
}

export default NotificationCard;
