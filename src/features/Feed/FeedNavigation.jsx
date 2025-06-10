// Library Imports
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

// Local Imports
import { openBox } from "../Posts/postSlice";
import { openRequestsBox } from "../ConnectionRequests/requestSlice";

function NavlinkItem({ children }) {
  return (
    <li className="flex items-center gap-5 p-3 transition-all duration-300 hover:rounded-2xl hover:bg-slate-200">
      {children}
    </li>
  );
}

function handlePostClick(dispatch) {
  dispatch(openBox());
  return;
};

function handleRequestsClick(dispatch) {
  dispatch(openRequestsBox());
  return;
}

function FeedNavigation() {
  const dispatch = useDispatch();

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
          <span>Messages</span>
        </NavlinkItem>
      </NavLink>
      <NavLink onClick={() => handleRequestsClick(dispatch)}>
        <NavlinkItem>
          <FaUserPlus />
          <span>Requests</span>
        </NavlinkItem>
      </NavLink>
      <NavLink onClick={() => handlePostClick(dispatch)}>
        <NavlinkItem>
          <AiFillPlusCircle />
          <span>Create Post</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/notifications">
        <NavlinkItem>
          <IoMdNotifications />
          <span>Notifications</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/settings">
        <NavlinkItem>
          <IoSettings />
          <span>Settings</span>
        </NavlinkItem>
      </NavLink>
      <NavLink to="/logout">
        <NavlinkItem>
          <FaSignOutAlt />
          <span>Log Out</span>
        </NavlinkItem>
      </NavLink>
    </ul>
  );
}

export default FeedNavigation;
