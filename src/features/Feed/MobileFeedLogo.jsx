// Library Imports
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

// Local Imports
import { setViewProfileOptionsBox } from "../Profile/profileSlice";

function MobileFeedLogo() {
  const dispatch = useDispatch();
  const unreadNotificationsCount = useSelector(
    (state) => state.notifications.unreadNotificationsCount,
  );
  const unreadChats = useSelector((state) => state.message.unreadMessages);
  const unreadChatsCount = Object.entries(unreadChats).length;

  function handleProfileOptionsClick() {
    dispatch(setViewProfileOptionsBox());
  }

  return (
    <div className="flex items-center justify-between p-4">
      <Link to={"/"}>
        <p className="logo rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 px-10 text-[2.5rem] font-semibold tracking-wide text-slate-200">
          QuickQuack
        </p>
      </Link>
      <div className="flex items-center gap-10 pr-5">
        <Link to={"/messages"} className="relative">
          <BiSolidMessageSquareDetail size={27} />
          {unreadChatsCount > 0 && (
            <span className="absolute -right-3 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white">
              {unreadChatsCount}
            </span>
          )}
        </Link>
        <Link to={"/notifications"}>
          <div>
            <IoMdNotifications size={27} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute right-28 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
        </Link>
        <GiHamburgerMenu
          size={25}
          className="hover:cursor-pointer"
          onClick={handleProfileOptionsClick}
        />
      </div>
    </div>
  );
}

export default MobileFeedLogo;
