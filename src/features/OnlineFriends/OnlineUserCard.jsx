import { LuDot } from "react-icons/lu";

// Local Imports
import Story from "../Stories/Story";
import { useDispatch } from "react-redux";
import { setMessageBox, setRecipientDetails } from "../Messages/messageSlice";

function OnlineUserCard({ userId, username, profilePicture }) {
  const dispatch = useDispatch();

  function handleClick() {
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
      className="flex items-center justify-between gap-3 rounded-2xl border-b-2 border-gray-200 bg-sky-100 p-4 shadow-sm"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 hover:cursor-pointer">
        <Story height={4} width={4} profilePicture={profilePicture} />
        <div className="flex items-center">
          <p className="text-2xl font-semibold tracking-wide text-slate-700">
            {username || "username"}
          </p>
          <LuDot size={39} className="text-green-600" />
        </div>
      </div>
    </div>
  );
}

export default OnlineUserCard;
