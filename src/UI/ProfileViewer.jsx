import { useDispatch, useSelector } from "react-redux";
import { setProfileViewer } from "../features/Profile/profileSlice";

function ProfileViewer() {
  const dispatch = useDispatch();
  const { profilePictureURL } = useSelector((state) => state.profile);

  function handleClose() {
    dispatch(setProfileViewer());
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      {/* Close Button - clear and visible */}
      <button
        onClick={handleClose}
        className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-sky-200 text-5xl font-bold text-black shadow-md transition-transform hover:scale-110"
        aria-label="Close viewer"
      >
        &times;
      </button>

      {/* Profile Image Box */}
      <div className="h-[36rem] w-[36rem] overflow-hidden rounded-full bg-sky-200 shadow-lg sm:h-[50rem] sm:w-[50rem]">
        <img
          src={profilePictureURL || "/DEFAULT_PROFILE.webp"}
          alt="Profile"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export default ProfileViewer;
