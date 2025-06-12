// Library Imports
import { io } from "socket.io-client";
import { createContext, useContext, useEffect } from "react";

const SocketContext = createContext();
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
});

function SocketProvider({ children }) {
  useEffect(function () {
    socket.connect();
    socket.on("connection", (message) => console.log(message));
    return () => socket.disconnect();
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };