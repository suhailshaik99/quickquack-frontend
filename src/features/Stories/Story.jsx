function Story({ height = 7, width = 7 }) {
  return (
    <div
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className="overflow-hidden rounded-[50%] border"
    >
      <img src="TEST_ASSET_1.jpg" alt="story_image" className="h-full w-full" />
    </div>
  );
}

export default Story;
