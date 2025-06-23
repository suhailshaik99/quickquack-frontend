// Library imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Local Imports
import { useSocket } from "../contexts/socketContext";
import NotificationsBox from "../features/Notifications/NotificationsBox";

function NotificationsPage() {
  const socket = useSocket();
  const { _id: userId } = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    return () => {
      if (socket && userId) {
        socket.emit("bulk-mark-read-notifications", userId);
      }
    };
  }, [socket, userId]);

  return (
    <section className="flex h-full w-full flex-col gap-2 p-3">
      <header className="px-2 pt-2 text-center text-5xl font-bold sm:text-6xl">
        <h1>Notifications</h1>
      </header>
      <NotificationsBox />
    </section>
  );
}

export default NotificationsPage;
