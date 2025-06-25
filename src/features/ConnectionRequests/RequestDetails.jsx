// Library Imports
import { useNavigate } from "react-router-dom";

// Local Imports
import Story from "../Stories/Story";
import { useDispatch } from "react-redux";
import { closeRequestsBox } from "./requestSlice";
import { useConfirmReq, useDeleteReq } from "../../hooks/useConfirmDeleteReq";

const buttonStyles =
  "rounded-lg bg-sky-300 p-2 text-[1.2rem] font-semibold text-slate-700 transition-colors duration-300 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2 cusor:pointer";

const cancelButtonStyles =
  "rounded-lg bg-red-400 p-2 text-[1.2rem] font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2";

function RequestDetails({ docId, userId, username, profilePicture }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: deleteReqFn, isPending: pendingDel } = useDeleteReq();
  const { mutate: confirmReqFn, isPending: pendingConf } = useConfirmReq();

  // onClick Handler functions
  // F1
  function handleProfileViewClick() {
    dispatch(closeRequestsBox());
    navigate(`/profile/${username}`);
    return;
  }

  // F2
  function handleConfirmRequest(userId) {
    return confirmReqFn({ docId, userId });
  }

  // F3
  function handleDeleteRequest(userId) {
    return deleteReqFn(userId);
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => handleProfileViewClick(userId)}
      >
        <Story height={5} width={5} profilePicture={profilePicture} />
        <div className="">
          <p className="text-xl font-semibold tracking-wide text-slate-700 sm:text-2xl">
            {username || "username"}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className={cancelButtonStyles}
          onClick={() => handleDeleteRequest(userId)}
          disabled={pendingDel}
        >
          delete
        </button>
        <button
          className={buttonStyles}
          onClick={() => handleConfirmRequest(userId)}
          disabled={pendingConf}
        >
          confirm
        </button>
      </div>
    </div>
  );
}

export default RequestDetails;
