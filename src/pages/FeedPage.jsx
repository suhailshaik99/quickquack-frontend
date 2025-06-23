// Library Imports
import useQueryFn from "../hooks/useQuery";

// Local Imports
import Post from "../features/Posts/Post";
import { getPosts } from "../services/FormSubmitAPI";
import FeedStories from "../features/Stories/FeedStories";

function FeedPage() {
  const { data: posts, isPending } = useQueryFn("posts", getPosts);
  return (
    <div className="">
      <div className="mt-4 flex flex-col gap-5">
        <FeedStories />
        <div className="flex flex-col items-center gap-2 divide-y">
          {isPending && "Loading posts.."}
          {posts?.length == 0 ? (
            <p className="mt-auto">No Posts yet</p>
          ) : (
            posts?.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
