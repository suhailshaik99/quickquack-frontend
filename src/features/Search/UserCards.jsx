// Library Imports
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Local Imports
import Story from "../Stories/Story";
import {
  cancelFriendRequest,
  sendFriendRequest,
} from "../../services/FormSubmitAPI";
import { useSocket } from "../../contexts/socketContext";
import { setMessageBox, setRecipientDetails } from "../Messages/messageSlice";

const revokeStyles = "bg-gradient-to-r from-pink-400 to-blue-500";
const connectStyles = "bg-gradient-to-r from-teal-400 to-blue-500";

function UserCards({ user, updateUserCard }) {
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    _id: userId,
    username,
    profilePicture,
    isFriend,
    isFollowing,
    isRequestedByMe,
  } = user || {};
  const { _id: loggedUserId } = useSelector((state) => state.user.userDetails);

  let buttonText = "";
  let buttonHandler = () => {};

  switch (true) {
    case isFriend:
      buttonText = "Message";
      buttonHandler = handleMessageClick;
      break;

    case isFollowing:
      buttonText = "Message";
      buttonHandler = handleMessageClick;
      break;

    case isRequestedByMe:
      buttonText = "Revoke Connect";
      buttonHandler = handleRevokeConnectClick;
      break;

    default:
      (buttonText = "Connect"), (buttonHandler = handleConnectClick);
      break;
  }

  function handleNameClick() {
    navigate(`/profile/${username}`);
  }

  function handleMessageClick() {
    const details = {
      userId,
      username,
      profilePicture,
    };
    dispatch(setRecipientDetails(details));
    dispatch(setMessageBox());
  }

  async function handleRevokeConnectClick() {
    try {
      if (!isRequestedByMe) return;
      updateUserCard(userId, { isRequestedByMe: false });
      await cancelFriendRequest(userId);
      socket.emit("req-confirmation-notifications", loggedUserId);
    } catch (error) {
      updateUserCard(userId, { isRequestedByMe: true });
    }
  }

  async function handleConnectClick() {
    try {
      if (isRequestedByMe) return;
      updateUserCard(userId, { isRequestedByMe: true });
      await sendFriendRequest(userId);
      socket.emit("send-friend-request", userId);
      socket.emit("req-confirmation-notifications", loggedUserId);
    } catch (error) {
      updateUserCard(userId, { isRequestedByMe: false });
    }
  }

  return (
    <div className="flex h-[24rem] w-[17rem] flex-col items-center overflow-hidden rounded-2xl border-2 border-gray-100 bg-sky-50 shadow-md sm:h-[22rem] sm:w-[20rem]">
      <div className="flex-1 pt-3">
        <Story height={13} width={13} profilePicture={profilePicture} />
      </div>
      <div
        className="flex min-h-[4rem] w-full items-center justify-center px-3 py-2 hover:cursor-pointer"
        onClick={handleNameClick}
      >
        <p className="line-clamp-2 break-all text-center text-2xl font-medium text-gray-700">
          {username || "username"}
        </p>
      </div>
      <div className="w-full">
        <button
          className={`w-full rounded-xl py-2 text-2xl font-medium text-gray-100 sm:py-3 ${isRequestedByMe ? revokeStyles : connectStyles}`}
          onClick={buttonHandler}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default UserCards;
