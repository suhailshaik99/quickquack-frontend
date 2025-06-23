import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";

import { openBox } from "../Posts/postSlice";
import { openRequestsBox } from "../ConnectionRequests/requestSlice";

function NavLinkItem({ children }) {
  return <li>{children}</li>;
}

function MobileFeedNav() {
  const dispatch = useDispatch();

  const connectionRequestsCount = useSelector(
    (state) => state.requests.connectionRequestsCount,
  );

  function handlePostClick() {
    dispatch(openBox());
    return;
  }

  function handleRequestsClick() {
    dispatch(openRequestsBox());
    return;
  }

  return (
    <nav className="w-full bg-sky-50 border-t shadow-md sm:hidden">
      <ul className="flex justify-between gap-3 p-4">
        <NavLink to={"/"}>
          <NavLinkItem>
            <AiFillHome size={27} />
          </NavLinkItem>
        </NavLink>
        <NavLink to={"/profile"}>
          <NavLinkItem>
            <FaCircleUser size={27} />
          </NavLinkItem>
        </NavLink>
        <NavLink onClick={handlePostClick}>
          <NavLinkItem>
            <AiFillPlusCircle size={27} />
          </NavLinkItem>
        </NavLink>
        <NavLink onClick={handleRequestsClick}>
          <NavLinkItem>
            <FaUserPlus size={27} />
            <div className="relative flex items-center gap-2">
              {connectionRequestsCount > 0 && (
                <span className="absolute -right-3 -top-10 inline-flex h-7 w-7 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-sky-500 text-[1.2rem] font-bold text-white">
                  {connectionRequestsCount}
                </span>
              )}
            </div>
          </NavLinkItem>
        </NavLink>
        <NavLink to={"/search"}>
          <NavLinkItem>
            <FaSearch size={27} />
          </NavLinkItem>
        </NavLink>
      </ul>
    </nav>
  );
}

export default MobileFeedNav;
