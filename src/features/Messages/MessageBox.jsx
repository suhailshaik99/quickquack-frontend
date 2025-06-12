// Library Imports
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { IoMdClose } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

// Local Imports
import Story from "../Stories/Story";
import { setMessageBox } from "./messageSlice";
import { useNavigate } from "react-router-dom";

function MessageBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, profilePicture } = useSelector(
    (state) => state.message.recipient,
  );

  function handleProfileClick() {
    dispatch(setMessageBox());
    navigate(`/profile/${username}`);
  }

  function handleClose() {
    dispatch(setMessageBox());
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="fixed bottom-4 right-4 flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-sky-200 shadow-lg sm:right-96 sm:min-h-[50rem] sm:w-[40rem]">
        {/* Header */}
        <div className="flex items-center justify-between bg-sky-500 px-3 py-2 text-white">
          <div className="flex items-center gap-3 space-x-2">
            <button className="rounded p-1 hover:bg-sky-600">
              <IoMdArrowBack size={20} />
            </button>
            <div
              className="flex items-center gap-4 hover:cursor-pointer"
              onClick={handleProfileClick}
            >
              <Story height={4} width={4} profilePicture={profilePicture} />
              <span className="text-2xl font-medium">
                {username || "username"}
              </span>
            </div>
          </div>
          <button
            className="rounded p-1 transition-colors duration-300 hover:bg-sky-600"
            onClick={handleClose}
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3"></div>

        {/* Input Area */}
        <div className="flex items-center border-t px-3 py-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 sm:text-[1.3rem]"
          />
          <button className="ml-2 rounded-full bg-sky-500 p-2 text-white ring-2 hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2">
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
