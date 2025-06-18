// Library Imports
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import Story from "../../features/Stories/Story";
import { setMessageBox, setRecipientDetails } from "./messageSlice";

function MessageCard({ msg }) {
  const {
    username,
    otherUserId: userId,
    lastMessage,
    messageSentAt,
    profilePicture,
  } = msg;

  const dispatch = useDispatch();
  const unreadCount = useSelector(
    (state) => state.message.unreadMessages[userId]?.length || 0,
  );

  function handleCardClick() {
    const details = {
      userId,
      username,
      profilePicture,
    };
    dispatch(setRecipientDetails(details));
    dispatch(setMessageBox());
  }
  return (
    <div
      className="w-inherit flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-sky-100 px-4 py-3 shadow-md shadow-sky-200 transition-all duration-200 hover:bg-sky-300"
      onClick={handleCardClick}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <Story height={4} width={4} profilePicture={profilePicture} />
      </div>

      {/* Username and Last Message */}
      <div className="flex-1 overflow-hidden">
        <h4 className="truncate text-[1.5rem] font-semibold text-black">
          {username || "Username"}
        </h4>
        <p className="truncate text-[1.2rem] text-gray-500">
          {lastMessage || "Last message will be shown here"}
        </p>
      </div>

      {/* Time */}
      <div className="ml-auto flex flex-col gap-1 whitespace-nowrap pl-2 text-sm text-gray-900">
        {/* {formatTime(lastMessage.createdAt)} */}
        <p className="font-bold">{messageSentAt}</p>
        {unreadCount > 0 && (
          <div className="ml-4 flex h-7 w-7 items-center justify-center rounded-[2rem] bg-sky-600 text-[1rem] font-bold text-white">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility function to format time (you can customize this)
// const formatTime = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// };

export default MessageCard;
