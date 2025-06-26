// Library Imports
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Local Imports
import Story from "../Stories/Story";
import { useSocket } from "../../contexts/socketContext";
import { useCancelReq, useSendReq } from "../../hooks/useSendCancelReq";

const buttonStyles =
  "rounded-lg bg-sky-300 p-2 text-[1.2rem] font-semibold text-slate-700 transition-colors duration-300 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2 cusor:pointer";

function CancelButton({ userId, handleDeleteRequest }) {
  return (
    <button
      className="rounded-lg bg-red-400 p-2 text-[1.2rem] font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2"
      onClick={() => handleDeleteRequest(userId)}
    >
      cancel
    </button>
  );
}

function PeopleBrief({ userId, username, profilePicture, requested }) {
  const socket = useSocket();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: sendReqFn } = useSendReq();
  const { mutate: cancelReqFn } = useCancelReq();

  // onClick Handler functions
  // F1
  function handleProfileViewClick() {
    navigate(`/profile/${username}`);
    return;
  }

  // F2
  function handleSendRequest(userId) {
    sendReqFn(userId);
    queryClient.invalidateQueries(["profileDetails"]);
    socket.emit("send-friend-request", userId);
    return;
  }

  // F3
  function handleCancelRequest(userId) {
    cancelReqFn(userId);
    return;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => handleProfileViewClick(userId)}
      >
        <Story height={5} width={5} profilePicture={profilePicture} />
        <div className="flex flex-col">
          <p className="text-2xl font-semibold tracking-wide text-slate-700">
            {username || "username"}
          </p>
          <span className="font-medium tracking-wider">suggested for you</span>
        </div>
      </div>
      <div className="flex gap-3">
        {requested ? (
          <CancelButton
            userId={userId}
            handleDeleteRequest={handleCancelRequest}
          />
        ) : (
          ""
        )}
        <button
          className={buttonStyles}
          disabled={requested}
          onClick={() => handleSendRequest(userId)}
        >
          {requested ? "pending.." : "connect"}
        </button>
      </div>
    </div>
  );
}

export default PeopleBrief;
