import Post from "../features/Posts/Post";
import FeedStories from "../features/Stories/FeedStories";

function FeedPage() {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <FeedStories />
      <div className="flex flex-col items-center gap-2 divide-y">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default FeedPage;
