// Library Imports
import { useDispatch } from "react-redux";

// Icon Imports
import { ImCross } from "react-icons/im";
import { MdEditSquare } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";

// Local Imports
import {
  setViewProfileEditBox,
  setViewProfileOptionsBox,
} from "./profileSlice";

function ProfileOptionsBox() {
  const dispatch = useDispatch();

  function handleCloseClick() {
    dispatch(setViewProfileOptionsBox());
  }

  function handleEditProfileClick() {
    dispatch(setViewProfileEditBox());
    dispatch(setViewProfileOptionsBox());
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 px-2">
      <div className="flex w-[18rem] flex-col gap-3 rounded-2xl bg-sky-100 px-5 py-3 shadow-md">
        <div className="self-end">
          <ImCross
            size={13}
            onClick={handleCloseClick}
            className="text-slate-600 hover:cursor-pointer"
          />
        </div>
        <div
          className="flex items-center gap-2 rounded-xl p-4 transition-all duration-300 hover:cursor-pointer hover:bg-sky-300"
          onClick={handleEditProfileClick}
        >
          <MdEditSquare size={16} />
          <span className="text-[1.6rem] font-medium">Edit Profile</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl p-4 transition-all duration-300 hover:cursor-pointer hover:bg-sky-300">
          <RiLogoutBoxRFill size={18} />
          <span className="text-[1.6rem] font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileOptionsBox;
