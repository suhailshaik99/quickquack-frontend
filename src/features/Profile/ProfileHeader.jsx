import { FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

function ProfileHeader() {

    const queryClient = useQueryClient();
    const { firstName, lastName, username, bio, profilePicture } = useSelector(
      (state) => state.user.userDetails,
    );
    const data = queryClient.getQueryData(["profileDetails"]);
    const { postsCount, followersCount, followingCount } = data;


  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-300">
        <img
          src={profilePicture || "DEFAULT_PROFILE.png"}
          alt="Profile"
          className="h-full w-full object-cover"
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
        <p className="pt-2 text-[1.3rem] font-normal">
          {bio || "Building something amazing!"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <button className="rounded-xl bg-sky-400 px-4 py-2 text-2xl font-medium text-white">
          Edit Profile
        </button>
        <button className="rounded-xl bg-sky-400 px-4 py-2 text-2xl font-medium text-white">
          View Archive
        </button>
        <FaCog className="mt-1 cursor-pointer text-xl" size={16} />
      </div>
    </div>
  );
}

export default ProfileHeader;
