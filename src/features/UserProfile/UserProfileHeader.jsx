// Library Imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local Imports
import Story from "../Stories/Story";
import useQueryFn from "../../hooks/useQuery";
import { setProfileViewer } from "../Profile/profileSlice";
import { getUserProfileDetails } from "../../services/FormSubmitAPI";

function UserProfileHeader({ username }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: userProfileDetails,
    isLoading,
    isError,
    error,
  } = useQueryFn(["userProfileDetails", username], getUserProfileDetails, {
    retry: false,
  });
  const {
    bio,
    firstName,
    lastName,
    profilePicture,
    followersCount,
    followingCount,
    postsCount,
  } = userProfileDetails || {};

  function handleProfileClick() {
    dispatch(setProfileViewer(profilePicture));
  }

  useEffect(() => {
    if (
      isError &&
      error?.message?.toLowerCase().includes("user doesn't exist")
    ) {
      navigate("/*", { replace: true });
    }
  }, [isError, error, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="hover:cursor-pointer" onClick={handleProfileClick}>
        <Story
          profilePicture={profilePicture || "/DEFAULT_PROFILE.png"}
          height={13}
          width={13}
        />
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
        <p>
          <strong>{followersCount || 0}</strong>{" "}
          <span className="font-medium text-slate-700">followers</span>
        </p>
        <p>
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

export default UserProfileHeader;
