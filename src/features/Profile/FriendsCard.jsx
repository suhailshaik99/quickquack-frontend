// Library Imports
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import Story from "../Stories/Story";
import {
  closeFriendsBox,
  setViewFollowers,
  setViewFollowing,
} from "./profileSlice";
import { useRemoveFollower, useUnfollow } from "../../hooks/useRemoveUnfollow";
import { setMessageBox, setRecipientDetails } from "../Messages/messageSlice";

const buttonStyles =
  "rounded-lg bg-sky-300 p-2 text-[1.2rem] font-semibold text-slate-700 transition-colors duration-300 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2 cusor:pointer";

const cancelButtonStyles =
  "rounded-lg bg-red-400 p-2 text-[1.2rem] font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2";

function FriendsCard({ userId, username, profilePicture }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { viewFollowers, viewFollowing } = useSelector(
    (state) => state.profile,
  );
  const { mutate: unfollowUser, isPending: remFollowing } = useUnfollow();
  const { mutate: removeFollower, isPending: remFollower } =
    useRemoveFollower();

  // onClick Handler functions
  // F1
  function handleProfileViewClick() {
    dispatch(closeFriendsBox());
    navigate(`/profile/${username}`);
    return;
  }

  // F2
  function handleRemoveUnfollow(userId) {
    if (viewFollowers) {
      removeFollower(userId);
    } else if (viewFollowing) {
      unfollowUser(userId);
    }
  }

  //F3
  function handleMessageClick() {
    const details = {
      userId,
      username,
      profilePicture,
    };
    dispatch(setRecipientDetails(details));
    if (viewFollowers) {
      dispatch(setViewFollowers());
    } else if (viewFollowing) {
      dispatch(setViewFollowing());
    }
    dispatch(closeFriendsBox());
    dispatch(setMessageBox());
    return;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => handleProfileViewClick(userId)}
      >
        <Story height={5} width={5} profilePicture={profilePicture} />
        <div className="">
          <p className="text-xl font-semibold tracking-wide break-words text-slate-700 sm:text-2xl">
            {username || "username"}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className={cancelButtonStyles}
          onClick={() => handleRemoveUnfollow(userId)}
          disabled={viewFollowers ? remFollower : remFollowing}
        >
          {viewFollowers ? "Remove" : "Unfollow"}
        </button>
        <button className={buttonStyles} onClick={handleMessageClick}>
          Message
        </button>
      </div>
    </div>
  );
}

export default FriendsCard;
