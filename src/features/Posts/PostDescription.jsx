function PostDescription() {
  return (
    <div className="py-2">
      <span className="text-[1.2rem] font-semibold">15 Likes</span>
      <div className="flex flex-col">
        <span className="text-[1.5rem] font-semibold">Username</span>
        <p className="text-[1.3rem]">Description of the post goes here.</p>
      </div>
    </div>
  );
}

export default PostDescription;
