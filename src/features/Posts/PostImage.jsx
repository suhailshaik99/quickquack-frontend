function PostImage() {
  return (
    <div className="mb-4 aspect-square h-[55rem] w-full flex-grow overflow-hidden">
      <img
        src="TEST_ASSET_2.jpg"
        alt="user_post"
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
}

export default PostImage;
