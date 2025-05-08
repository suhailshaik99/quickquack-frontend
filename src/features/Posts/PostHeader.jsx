function PostHeader() {
  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="h-[5rem] w-[5rem] overflow-hidden rounded-[50%] border-2 border-slate-500">
        <img
          src="TEST_ASSET_1.jpg"
          alt="user_profile"
          className="h-full w-full"
        />
      </div>
      <p className="text-2xl font-semibold">Username of user</p>
      <span>.</span>
      <p className="text-[1.3rem] font-bold">19m</p>
    </div>
  );
}

export default PostHeader;
