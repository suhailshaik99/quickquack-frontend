// Local Imports
import { useEffect, useState } from "react";
import OnlineUserCard from "./OnlineUserCard";
import { useSocket } from "../../contexts/socketContext";
import { useSelector } from "react-redux";

function OnlineUsersBox() {
  const socket = useSocket();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { _id: userId } = useSelector((state) => state.user.userDetails);
  useEffect(
    function () {
      socket.emit("get-online-friends", userId);
      socket.on("online-friends-response", (friends) =>
        setOnlineFriends(friends),
      );

      return () => socket.off("online-friends-response");
    },
    [socket, userId],
  );

  return (
    <div className="m-auto flex w-[42rem] flex-col overflow-hidden rounded-2xl bg-sky-200 shadow-sm shadow-slate-400 sm:h-[31rem]">
      <h1 className="mb-3 bg-sky-500 p-2 text-center text-[1.8rem] font-medium tracking-wide text-yellow-50">
        Friends Online
      </h1>
      <div className="flex flex-col gap-4 overflow-auto px-5">
        {onlineFriends?.map((friend) => (
          <OnlineUserCard
            key={friend._id}
            userId={friend._id}
            username={friend.username}
            profilePicture={friend.profilePicture}
          />
        ))}
      </div>
    </div>
  );
}

export default OnlineUsersBox;
