// Library Imports
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { IoMdClose } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";

// Local Imports
import Story from "../Stories/Story";
import useQueryFn from "../../hooks/useQuery";
import TypingIndicator from "../../UI/TypingIndicator";
import { useSocket } from "../../contexts/socketContext";
import { getUserMessages } from "../../services/FormSubmitAPI";
import {
  setMessageBox,
  setMessages,
  addUserMessage,
  clearMessages,
  clearUnreadMessages,
  clearRecipientDetails,
} from "./messageSlice";

function MessageBox() {
  const bottomRef = useRef();
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const queryClient = useQueryClient();

  const [typing, setTyping] = useState("");
  const { _id: userId } = useSelector((state) => state.user.userDetails);
  const { allMessages, messageBox } = useSelector((state) => state.message);
  const {
    userId: receiverId,
    username,
    profilePicture,
  } = useSelector((state) => state.message.recipient);

  const {
    data: apiMessages = [],
    isPending,
    isSuccess,
  } = useQueryFn(["getUserMessages", receiverId], getUserMessages, {
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && apiMessages.length) {
      dispatch(setMessages(apiMessages));
    }
  }, [isSuccess, apiMessages, dispatch]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    if (receiverId) {
      dispatch(clearUnreadMessages(receiverId));
    }
  }, [receiverId, dispatch]);

  useEffect(() => {
    socket.on("typing", ({ sender }) => {
      if (sender === receiverId && messageBox) {
        setTyping("typing...");
        setTimeout(() => setTyping(""), 4000);
      }
    });
    return () => {
      socket.off("typing");
    };
  }, [socket, receiverId, messageBox]);

  function handleProfileClick() {
    dispatch(setMessageBox());
    navigate(`/profile/${username}`);
  }

  function handleClose() {
    socket.emit("bulk-mark-read", {userId, receiverId});
    queryClient.invalidateQueries(["messageCards"]);
    dispatch(setMessageBox());
    dispatch(clearRecipientDetails());
    dispatch(clearMessages());
  }

  function handleChangeMessage() {
    socket.emit("typing", { userId, receiverId });
  }

  function handleSendMessage() {
    
    const message = messageRef.current?.value?.trim();
    if (!message) return;

    const timeNow = moment().tz("Asia/Kolkata");

    const userMessage = {
      message,
      fullTime: timeNow.format("YYYY-MM-DD h:mm:ss A z"),
      messageSentAt: timeNow.format("h:mm A"),
      user: true,
      sender: userId,
      receiver: receiverId,
      _id: `${Date.now()}-${Math.random()}`,
    };

    socket.emit("private-message", userMessage);
    dispatch(addUserMessage(userMessage));
    messageRef.current.value = "";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40">
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-none border border-gray-300 bg-sky-200 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:top-auto sm:h-[50rem] sm:w-[40rem] sm:rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-sky-500 px-3 py-2 text-white">
          <div className="flex items-center gap-3 space-x-2">
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-2 px-2">
            {isPending && <p>Loading conversation</p>}
            {allMessages.map((msg) => (
              <Message key={msg._id} user={msg.user} time={msg.messageSentAt}>
                {msg.message}
              </Message>
            ))}
          </div>
          <div ref={bottomRef} />
        </div>

        {typing && <TypingIndicator />}

        {/* Input */}
        <div className="flex items-center border-t px-3 py-2">
          <input
            type="text"
            placeholder="Type a message..."
            ref={messageRef}
            onChange={handleChangeMessage}
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
        className={`relative inline-block max-w-[70%] break-words rounded-xl px-4 py-2 text-[1.3rem] font-medium text-white sm:text-[1.4rem] ${
          user
            ? "rounded-tr-none bg-sky-500"
            : "rounded-tl-none bg-sky-300 text-gray-900"
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
