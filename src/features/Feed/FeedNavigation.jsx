// Library Imports
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

// Local Imports
import { openBox } from "../Posts/postSlice";
import { openRequestsBox } from "../ConnectionRequests/requestSlice";
import { setLogoutBox } from "../Authentication/userSlice";

function NavlinkItem({ children }) {
  return (
    <li className="flex items-center gap-5 p-3 transition-all duration-300 hover:rounded-2xl hover:bg-slate-200">
      {children}
    </li>
  );
}

function FeedNavigation() {
  // Redux Hooks
  const dispatch = useDispatch();
  const unreadMessages = useSelector((state) => state.message.unreadMessages);
  const unreadMessagesCount = Object.entries(unreadMessages)?.length;
  const connectionRequestsCount = useSelector(
    (state) => state.requests.connectionRequestsCount,
  );
  const unreadNotificationsCount = useSelector(
    (state) => state.notifications.unreadNotificationsCount,
  );

  function handlePostClick() {
    dispatch(openBox());
    return;
  }

  function handleRequestsClick() {
    dispatch(openRequestsBox());
    return;
  }

  function handleLogoutClick() {
    dispatch(setLogoutBox());
    return;
  }

  return (
    <ul className="flex flex-col gap-4 p-4 text-[1.8rem] font-medium text-slate-900">
      <NavLink to="/">
        <NavlinkItem>
          <AiFillHome />
          <span className="">Home</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to={`/profile`}>
        <NavlinkItem>
          <FaCircleUser />
          <span>Profile</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/search">
        <NavlinkItem>
          <FaSearch />
          <span>Search</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/messages">
        <NavlinkItem>
          <BiSolidMessageSquareDetail />
          <div className="relative flex items-center gap-2">
            <span>Messages</span>
            {unreadMessagesCount > 0 && (
              <span
                className="absolute -right-3 top-1 inline-flex h-7 w-7 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white" // Adjusted positioning
              >
                {unreadMessagesCount}
              </span>
            )}
          </div>
        </NavlinkItem>
      </NavLink>
      <NavLink onClick={handleRequestsClick}>
        <NavlinkItem>
          <FaUserPlus />
          <div className="relative flex items-center gap-2">
            <span>Requests</span>
            {connectionRequestsCount > 0 && (
              <span className="absolute -right-3 top-1 inline-flex h-7 w-7 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white">
                {connectionRequestsCount}
              </span>
            )}
          </div>
        </NavlinkItem>
      </NavLink>
      <NavLink onClick={handlePostClick}>
        <NavlinkItem>
          <AiFillPlusCircle />
          <span>Create Post</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/notifications">
        <NavlinkItem>
          <IoMdNotifications />
          {/* <span>Notifications</span> */}
          <div className="relative flex items-center gap-2">
            <span>Notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -right-3 top-1 inline-flex h-7 w-7 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
        </NavlinkItem>
      </NavLink>
      <NavLink onClick={handleLogoutClick}>
        <NavlinkItem>
          <FaSignOutAlt />
          <span>Log Out</span>
        </NavlinkItem>
      </NavLink>
    </ul>
  );
}

export default FeedNavigation;
