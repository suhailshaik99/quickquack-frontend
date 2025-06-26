function PostImage({ postUrl }) {
  return (
    <div className="mb-4 aspect-square h-[55rem] w-full flex-grow overflow-hidden rounded-xl border-2 border-slate-200">
      <img
        src={postUrl}
        alt="user_post"
        loading="lazy"
        className="h-full w-full rounded-lg object-contain"
      />
    </div>
  );
}

export default PostImage;
