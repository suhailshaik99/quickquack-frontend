// Library Imports
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useRef } from "react";

// Local Imports
import {
  addMessage,
  addUnreadMessage,
  addUnreadMessagesBatch,
} from "../features/Messages/messageSlice";
import useQueryFn from "../hooks/useQuery";
import {
  setConnectionRequestsCount,
  incrementConnectionRequestsCount,
} from "../features/ConnectionRequests/requestSlice";
import { getFriendRequests, getUnreadCount } from "../services/FormSubmitAPI";
import { setUnreadNotificationsCount } from "../features/Notifications/notificationSlice";

const SocketContext = createContext();
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function SocketProvider({ children }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // --- State and Selectors ---
  const { messageBox } = useSelector((state) => state.message);
  const { userId: recipientId } = useSelector(
    (state) => state.message.recipient,
  );
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const userId = userDetails?._id;

  // --- Data Fetching for Initial Count ---
  const { data: pendingRequests, isSuccess } = useQueryFn(
    ["pendingRequests"],
    getFriendRequests,
    { enabled: !!isAuthenticated },
  );

  // Fetching unread count initially
  const { data: unreadCountData, isSuccess: notificationsSuccess } = useQueryFn(
    ["unreadNotificationsCount"],
    getUnreadCount,
    { enabled: !!isAuthenticated },
  );

  // Refs for state values that change often
  const messageBoxRef = useRef(messageBox);
  const recipientIdRef = useRef(recipientId);

  useEffect(() => {
    recipientIdRef.current = recipientId;
    messageBoxRef.current = messageBox;
  }, [recipientId, messageBox]);

  // --- This effect correctly sets the initial request count on load ---
  useEffect(() => {
    if (isSuccess && pendingRequests) {
      dispatch(setConnectionRequestsCount(pendingRequests.length));
    }
  }, [isSuccess, pendingRequests, dispatch]);

  useEffect(() => {
  if (notificationsSuccess && unreadCountData) {
    dispatch(setUnreadNotificationsCount(unreadCountData.unreadCount));
  }
}, [notificationsSuccess, unreadCountData, dispatch]);

  // --- Main Socket Logic ---
  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    // --- Event Handlers ---
    const handleIncomingMessage = (msg) => {
      const isChatBoxOpen =
        messageBoxRef.current && recipientIdRef.current === msg.sender;

      if (isChatBoxOpen) {
        dispatch(addMessage({ ...msg, user: false }));
      } else {
        queryClient.invalidateQueries(["messageCards"]);
        dispatch(addUnreadMessage(msg));
      }
    };

    const handleUnreadMessages = (messages) => {
      if (Array.isArray(messages) && messages.length > 0) {
        const formatted = messages.map((msg) => ({
          ...msg,
          user: msg.sender === userId,
        }));
        dispatch(addUnreadMessagesBatch(formatted));
      }
    };

    const handleNewFriendRequest = () => {
      queryClient.invalidateQueries(["pendingRequests"]);
      dispatch(incrementConnectionRequestsCount());
    };

    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
      setTimeout(() => socket.connect(), 3000);
    };

    const handleRefreshNotifications = () => {
      queryClient.invalidateQueries(["unreadNotificationsCount"]);
    }

    const handleConnect = () => {
      console.log("Socket connected! Emitting user info.");
      socket.emit("add-user", userId);
      socket.emit("get-unread-messages", userId);
    };

    // --- Socket Connection and Listeners ---
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("unread-messages", handleUnreadMessages);
    socket.on("private-message", handleIncomingMessage);
    socket.on("new-friend-request", handleNewFriendRequest);
    socket.on("refresh-notifications", handleRefreshNotifications);

    // --- Cleanup Function ---
    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("unread-messages", handleUnreadMessages);
      socket.off("private-message", handleIncomingMessage);
      socket.off("new-friend-request", handleNewFriendRequest);
      socket.disconnect();
    };

  }, [isAuthenticated, userId, dispatch, queryClient]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
