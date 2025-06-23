function PostHeader({postedBy}) {
  const {username, profilePicture} = postedBy;
  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="h-[4rem] w-[4rem] overflow-hidden rounded-[50%] border-2">
        <img
          src={profilePicture || "DEFAULT_PROFILE.png"}
          alt="user_profile"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="text-2xl font-semibold">{username || "Username of user"}</p>
      <span>.</span>
      <p className="text-[1.3rem] font-bold">19m</p>
    </div>
  );
}

export default PostHeader;
