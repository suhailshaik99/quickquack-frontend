import { useDispatch } from "react-redux";
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

    function handlePostClick() {
      dispatch(openBox());
      return;
    };
    
    function handleRequestsClick() {
      dispatch(openRequestsBox());
      return;
    }

  return (
    <nav className="sm:hidden">
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
