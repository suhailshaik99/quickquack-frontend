function Story({ height = 7, width = 7, profilePicture }) {
  return (
    <div
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className="overflow-hidden rounded-[50%] border"
    >
      <img
        src={`${profilePicture ? profilePicture : "/DEFAULT_PROFILE.webp"}`}
        alt="story_image"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default Story;
