// // Library Imports
// import { io } from "socket.io-client";
// import { useSelector, useDispatch } from "react-redux";
// import { useQueryClient } from "@tanstack/react-query";
// import { createContext, useContext, useEffect } from "react";

// // Local Imports
// import {
//   addMessage,
//   addUnreadMessage,
//   addUnreadMessagesBatch,
// } from "../features/Messages/messageSlice";

// const SocketContext = createContext();
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   autoConnect: false,
// });

// function SocketProvider({ children }) {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { _id: userId } = useSelector((state) => state.user.userDetails);
//   const { messageBox } = useSelector((state) => state.message);
//   const {userId: recipientId} = useSelector(state => state.message.recipient);
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

//   // useEffect(() => {
//   //   if (isAuthenticated && userId) {
//   //     // Connect the socket
//   //     socket.connect();

//   //     // Emitting the events
//   //     socket.emit("add-user", userId);
//   //     socket.emit("get-unread-messages", userId);

//   //     // Event Listeners
//   //     socket.on("connect", () => {
//   //       socket.emit(
//   //         "front-connection",
//   //         "socket connected successfully at frontend",
//   //       );
//   //     });
//   //     socket.on("back-connection", (message) =>
//   //       console.log("Message from backend:", message),
//   //     );
//   //   }

//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, [isAuthenticated, userId]);

//   useEffect(() => {
//   if (isAuthenticated && userId) {
//     socket.connect();

//     socket.on("connect", () => {
//       console.log("Socket connected! Emitting user info.");

//       // ✅ Solution: Emit events AFTER connection is confirmed
//       socket.emit("add-user", userId);
//       socket.emit("get-unread-messages", userId);

//       socket.emit(
//         "front-connection",
//         "socket connected successfully at frontend",
//       );
//     });

//     socket.on("back-connection", (message) =>
//       console.log("Message from backend:", message),
//     );
//   }

//   return () => {
//     // Clean up listeners to prevent memory leaks
//     socket.off("connect");
//     socket.off("back-connection");
//     socket.disconnect();
//   };
// }, [isAuthenticated, userId]);

//   useEffect(() => {
//     // Make sure we don't set up listeners before the socket is connected.
//     if (!socket.connected) return;

//     // const handleIncomingMessage = (msg) => {
//     //   const isChatBoxOpenForSender =
//     //     messageBox && recipientId === msg.sender;

//     //   if (isChatBoxOpenForSender) {
//     //     dispatch(addMessage({ ...msg, user: false }));
//     //   } else {
//     //     queryClient.invalidateQueries(["messageCards"]);
//     //     dispatch(addUnreadMessage(msg));
//     //   }
//     // };
//     const handleIncomingMessage = (msg) => {
//       const isChatBoxOpenForSender =
//         messageBox && recipientId === msg.sender;
//       if (isChatBoxOpenForSender) {
//         dispatch(addMessage({ ...msg, user: false }));
//       } else {
//         queryClient.invalidateQueries(["messageCards"]);
//         dispatch(addUnreadMessage(msg));
//       }
//     };
//     socket.on("private-message", handleIncomingMessage);

//     return () => {
//       socket.off("private-message", handleIncomingMessage);
//     };
//   }, [dispatch, messageBox, recipientId, queryClient]);

//   useEffect(
//     function () {
//       function handleUnreadMessages(messages) {
//         if (Array.isArray(messages) && messages.length > 0) {
//           const formatted = messages.map((msg) => ({
//             ...msg,
//             user: msg.sender === userId,
//           }));
//           dispatch(addUnreadMessagesBatch(formatted));
//         }
//       }
//       socket.on("unread-messages", handleUnreadMessages);

//       return () => socket.off("unread-messages");
//     },
//     [dispatch, userId],
//   );

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// }

// function useSocket() {
//   return useContext(SocketContext);
// }

// export { SocketProvider, useSocket };

//*************************************//
// // Library Imports
// import { io } from "socket.io-client";
// import { useSelector, useDispatch } from "react-redux";
// import { useQueryClient } from "@tanstack/react-query";
// import { createContext, useContext, useEffect } from "react";

// // Local Imports
// import {
//   addMessage,
//   addUnreadMessage,
//   addUnreadMessagesBatch,
// } from "../features/Messages/messageSlice";

// const SocketContext = createContext();
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   autoConnect: false,
// });

// function SocketProvider({ children }) {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { _id: userId } = useSelector((state) => state.user.userDetails);
//   const { messageBox } = useSelector((state) => state.message);
//   const { userId: recipientId } = useSelector((state) => state.message.recipient);
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       socket.connect();

//       const handleIncomingMessage = (msg) => {
//         const isChatBoxOpenForSender =
//           messageBox && recipientId === msg.sender;
//         if (isChatBoxOpenForSender) {
//           dispatch(addMessage({ ...msg, user: false }));
//         } else {
//           queryClient.invalidateQueries(["messageCards"]);
//           dispatch(addUnreadMessage(msg));
//         }
//       };

//       const handleUnreadMessages = (messages) => {
//         if (Array.isArray(messages) && messages.length > 0) {
//           const formatted = messages.map((msg) => ({
//             ...msg,
//             user: msg.sender === userId,
//           }));
//           dispatch(addUnreadMessagesBatch(formatted));
//         }
//       };

//       socket.on("connect", () => {
//         console.log("Socket connected! Emitting user info.");
//         socket.emit("add-user", userId);
//         socket.emit("get-unread-messages", userId);

//         // Set up listeners *after* connection
//         socket.on("private-message", handleIncomingMessage);
//         socket.on("unread-messages", handleUnreadMessages);
//       });

//       // It's also good practice to handle disconnects
//       socket.on("disconnect", () => {
//         console.log("Socket disconnected.");
//         // Clean up listeners on disconnect
//         socket.off("private-message", handleIncomingMessage);
//         socket.off("unread-messages", handleUnreadMessages);
//       });
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [isAuthenticated, userId, dispatch, queryClient, messageBox, recipientId]);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// }

// function useSocket() {
//   return useContext(SocketContext);
// }

// export { SocketProvider, useSocket };
//***************************************************/
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

  const { messageBox } = useSelector((state) => state.message);
  // const { _id: userId } = useSelector((state) => state.user.userDetails);
  const { userId: recipientId } = useSelector(
    (state) => state.message.recipient,
  );
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector(state => state.user.userDetails);
  const userId = userDetails?._id;

  // Refs for state values
  const userIdRef = useRef(userId);
  const messageBoxRef = useRef(messageBox);
  const recipientIdRef = useRef(recipientId);

  // Update refs when state changes
  useEffect(() => {
    recipientIdRef.current = recipientId;
    messageBoxRef.current = messageBox;
  }, [recipientId, messageBox]);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    // Message handler using refs for current state
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

    // Unread messages batch handler
    const handleUnreadMessages = (messages) => {
      if (Array.isArray(messages) && messages.length > 0) {
        const formatted = messages.map((msg) => ({
          ...msg,
          user: msg.sender === userIdRef.current,
        }));
        dispatch(addUnreadMessagesBatch(formatted));
      }
    };

    // Connection error handler
    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
      setTimeout(() => socket.connect(), 3000);
    };

    // Connect and set up listeners
    socket.connect();

    // Core event listeners
    socket.on("private-message", handleIncomingMessage);
    socket.on("unread-messages", handleUnreadMessages);
    socket.on("connect_error", handleConnectError);
    socket.on("back-connection", (msg) => console.log("Backend:", msg));

    // Connection established handler
    const handleConnect = () => {
      console.log("Socket connected! Emitting user info.");
      socket.emit("add-user", userId);
      socket.emit("get-unread-messages", userId);
    };
    socket.on("connect", handleConnect);

    // Ping/pong for connection health
    const pingInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit("ping", Date.now());
      }
    }, 15000);

    socket.on("pong", (timestamp) => {
      console.log(`Latency: ${Date.now() - timestamp}ms`);
    });

    // Cleanup function
    return () => {
      clearInterval(pingInterval);
      socket.off("private-message", handleIncomingMessage);
      socket.off("unread-messages", handleUnreadMessages);
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("back-connection");
      socket.off("pong");
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
