import { useNavigate } from "react-router-dom";
import Story from "../features/Stories/Story";

function PeopleBrief({ userId, username, profilePicture }) {
  const navigate = useNavigate();
  function handleProfileClick(userId) {
    navigate(`/profile/${username}`);
    console.log(userId);
    return;
  }
  return (
    <div
      className="flex items-center justify-between gap-3"
      onClick={() => handleProfileClick(userId)}
    >
      <div className="flex items-center gap-4 hover:cursor-pointer">
        <Story height={5} width={5} profilePicture={profilePicture} />
        <div className="flex flex-col">
          <p className="text-2xl font-semibold tracking-wide text-slate-700">
            {username || "username"}
          </p>
          <span className="font-medium tracking-wider">suggested for you</span>
        </div>
      </div>
      <button className="rounded-lg bg-sky-300 p-2 text-[1.2rem] font-semibold text-slate-700 transition-colors duration-300 hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2">
        connect
      </button>
    </div>
  );
}

export default PeopleBrief;
