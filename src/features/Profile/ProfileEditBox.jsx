// Library Imports
import { useDispatch } from "react-redux";

// Icon Imports
import { ImCross } from "react-icons/im";

// Local Imports
import ProfileEditForm from "./ProfileEditForm";
import { setViewProfileEditBox } from "./profileSlice";

function ProfileEditBox() {
  const dispatch = useDispatch();

  function handleCloseClick() {
    dispatch(setViewProfileEditBox());
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 px-2 backdrop-blur-sm">
      <div className="m-auto flex min-h-[45rem] max-w-[45rem] flex-col gap-3 overflow-hidden rounded-3xl border-2 bg-sky-200 shadow-md">
        <div className="flex items-center bg-sky-400 px-4 py-1 shadow-md">
          <div className="flex-grow text-center">
            <h1 className="text-[1.8rem] font-medium text-black">
              Edit Profile
            </h1>
          </div>
          <div>
            <ImCross
              size={15}
              onClick={handleCloseClick}
              className="text-slate-600 hover:cursor-pointer"
            />
          </div>
        </div>
        <ProfileEditForm />
      </div>
    </div>
  );
}

export default ProfileEditBox;
