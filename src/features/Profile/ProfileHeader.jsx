// Library Imports
import { useDispatch } from "react-redux";

// Icon Imports
import { MdEditSquare } from "react-icons/md";

// Local Imports
import {
  openFriendsBox,
  setProfileViewer,
  setViewFollowers,
  setViewFollowing,
  setViewProfileEditBox,
} from "./profileSlice";
import Story from "../Stories/Story";
import useQueryFn from "../../hooks/useQuery";
import { getProfileDetails } from "../../services/FormSubmitAPI";

function ProfileHeader() {
  const dispatch = useDispatch();

  const { data } = useQueryFn("profileDetails", getProfileDetails);
  const {
    bio,
    username,
    lastName,
    firstName,
    postsCount,
    followersCount,
    followingCount,
    profilePicture,
  } = data || {};

  function handleFollowersClick() {
    dispatch(setViewFollowers());
    dispatch(openFriendsBox());
  }

  function handleFollowingClick() {
    dispatch(setViewFollowing());
    dispatch(openFriendsBox());
  }

  function handleProfileEditClick() {
    dispatch(setViewProfileEditBox());
  }

  function handleProfileClick() {
    dispatch(setProfileViewer(profilePicture));
  }

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="absolute right-0 hidden hover:cursor-pointer sm:block">
        <MdEditSquare size={22} onClick={handleProfileEditClick} />
      </div>
      <div className="hover:cursor-pointer" onClick={handleProfileClick}>
        <Story profilePicture={profilePicture} height={13} width={13} />
      </div>

      <p className="mb-4 mt-4 text-[1.7rem] font-medium">
        {firstName || "Quick"} {lastName || "Quack"}
      </p>
      <p className="text-2xl font-medium text-gray-600">
        {`ID: ${username}` || "quickquack_user"}
      </p>

      <div className="mt-4 flex gap-8 text-2xl font-medium tracking-wide">
        <p>
          <strong>{postsCount || 0}</strong>{" "}
          <span className="font-medium text-slate-700">Posts</span>
        </p>
        <p onClick={handleFollowersClick} className="hover:cursor-pointer">
          <strong>{followersCount || 0}</strong>{" "}
          <span className="font-medium text-slate-700">followers</span>
        </p>
        <p onClick={handleFollowingClick} className="hover:cursor-pointer">
          <strong>{followingCount || 0}</strong>{" "}
          <span className="font-medium text-slate-700">following</span>
        </p>
      </div>

      <div className="mt-4 border-t-2 border-slate-300">
        <div className="whitespace-pre-line pt-2 text-left text-[1.4rem] font-medium">
          {bio || "Building something amazing!"}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
