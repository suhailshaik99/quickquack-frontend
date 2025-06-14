// Library Imports
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { IoMdClose } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

// Local Imports
import Story from "../Stories/Story";
import { setMessageBox } from "./messageSlice";
import TypingIndicator from "../../UI/TypingIndicator";
import { useSocket } from "../../contexts/socketContext";

function MessageBox() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typing, setTyping] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { _id: userId } = useSelector((state) => state.user.userDetails);
  const {
    userId: receiverId,
    username,
    profilePicture,
  } = useSelector((state) => state.message.recipient);

  // Handler Functions
  // F1
  function handleProfileClick() {
    dispatch(setMessageBox());
    navigate(`/profile/${username}`);
  }

  // F2
  function handleClose() {
    dispatch(setMessageBox());
  }

  // F3
  function handleChangeMessage(e) {
    setMessage(e.target.value);
    socket.emit("typing", { userId, receiverId });
  }

  // F4
  function handleSendMessage() {
    if(!message) return;
    const messageSentAt = moment().tz("Asia/Kolkata").format("h:mm:A");
    const fullTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD h:mm A z");

    const userMessage = {
      sender: userId,
      receiver: receiverId,
      message,
      messageSentAt,
      fullTime,
      user: true,
    };

    // Event Emitter
    socket.emit("private-message", userMessage);

    // Restoring state
    setMessage("");
    setMessages((prevMsgs) => [...prevMsgs, userMessage]);
  }

  useEffect(
    function () {
      socket.on("private-message", (msg) => {
        setMessages((prevMsgs) => [...prevMsgs, { ...msg, user: false }]);
      });
      socket.on("typing", () => {
        setTyping("typing");
        setTimeout(() => {
          setTyping("");
        }, 4000);
      });

      return () => socket.off("private-message");
    },
    [socket],
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-none border border-gray-300 bg-sky-200 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:top-auto sm:h-[50rem] sm:w-[40rem] sm:rounded-xl">
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
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-2 px-2">
            {messages?.map((msg, i) => (
              <Message key={i} user={msg.user} time={msg.messageSentAt}>
                {msg.message}
              </Message>
            ))}
          </div>
        </div>

        {typing && <TypingIndicator />}
        {/* Input Area */}
        <div className="flex items-center border-t px-3 py-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => handleChangeMessage(e)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-[1.4rem] font-medium placeholder:text-[1.2rem] focus:outline-none focus:ring-2 focus:ring-sky-400 sm:text-[1.3rem]"
          />
          <button
            className="ml-2 rounded-full bg-sky-500 p-2 text-white ring-2 hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2"
            onClick={handleSendMessage}
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Message({ children, user = true, time = "10:30 AM" }) {
  return (
    <div className={`flex ${user ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative inline-block max-w-[70%] rounded-xl px-4 py-2 text-[1.3rem] font-medium text-white sm:text-[1.4rem] ${
          user
            ? "rounded-tr-none bg-sky-500" // sent message
            : "rounded-tl-none bg-sky-300 text-gray-900" // received message
        }`}
      >
        <div className="pr-12">{children}</div>
        <span
          className={`absolute bottom-1 right-2 text-xs font-semibold opacity-70 ${
            user ? "text-gray-800" : "text-black"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

export default MessageBox;
