import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

function MobileFeedLogo() {
  return (
    <div className="p-4 flex items-center justify-between">
      <Link to={"/"}>
        <p className="logo bg-gradient-to-r from-pink-500 to-orange-500 px-10 rounded-xl text-[2.5rem] font-semibold tracking-wide text-slate-200">
          QuickQuack
        </p>
      </Link>
      <div className="flex gap-10 pr-5">
        <Link to={"/messages"}>
      <BiSolidMessageSquareDetail size={27}/>
      </Link>
      <Link to={"/notifications"}>
        <IoMdNotifications size={27}/>
      </Link>
      </div>
    </div>
  );
}

export default MobileFeedLogo;