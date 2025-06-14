// Library Imports
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { createContext, useContext, useEffect } from "react";

const SocketContext = createContext();
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
});

function SocketProvider({ children }) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const { _id: userId } = useSelector((state) => state.user.userDetails);
  useEffect(
    function () {
      // Making socket connection
      if(isAuthenticated && userId) {
        socket.connect();
      } 

      // Emitting and receiving socket connection status
      socket.on("back-connection", (message) => console.log(message));
      socket.emit(
        "front-connection",
        "socket connected successfully at frontend",
      );

      // Emitting event to add user to online users
      if(socket && userId) {
        socket.emit("add-user", userId);
      }

      // Cleanup function
      return () => socket.disconnect();
    },
    [userId, isAuthenticated],
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
