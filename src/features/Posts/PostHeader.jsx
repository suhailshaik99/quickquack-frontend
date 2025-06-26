import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostHeader({ postedBy, postedAt }) {
  const navigate = useNavigate();
  const { username, profilePicture, _id: postedUserId } = postedBy;
  const { _id: userId } = useSelector((state) => state.user.userDetails);

  function handleProfileViewClick() {
    if (userId == postedUserId) {
      return navigate(`/profile`);
    }
    navigate(`/profile/${username}`);
  }

  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="h-[4rem] w-[4rem] overflow-hidden rounded-[50%] border-2">
        <img
          src={profilePicture || "/DEFAULT_PROFILE.webp"}
          alt="user_profile"
          className="h-full w-full object-cover"
        />
      </div>
      <p
        className="text-2xl font-semibold hover:cursor-pointer"
        onClick={handleProfileViewClick}
      >
        {username || "Username of user"}
      </p>
      <span>.</span>
      <p className="text-[1.2rem] font-bold text-slate-600">
        {postedAt || "19m"}
      </p>
    </div>
  );
}

export default PostHeader;
