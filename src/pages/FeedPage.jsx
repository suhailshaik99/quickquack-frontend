// Local Imports
import Post from "../features/Posts/Post";
import useQueryFn from "../hooks/useQuery";
import PostsLoader from "../spinners/PostsLoader";
import EmptyFeed from "../features/Posts/EmptyFeed";
import { getPosts } from "../services/FormSubmitAPI";
import FeedStories from "../features/Stories/FeedStories";

function FeedPage() {
  const { data: posts, isPending } = useQueryFn("posts", getPosts);
  return (
    <div className="w-full">
      <div className="mt-4 flex w-full flex-col gap-5">
        <FeedStories />
        <div className="flex flex-col items-center gap-2 divide-y">
          <div className="flex flex-col items-center gap-2 divide-y">
            {isPending ? (
              <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
                <PostsLoader />
              </div>
            ) : posts?.length === 0 ? (
              <EmptyFeed />
            ) : (
              posts?.map((post) => <Post key={post._id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
