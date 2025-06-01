import { useQueryClient } from "@tanstack/react-query";
import EmptyPostPlaceholder from "./ProfileEmptyPosts";

const gridStyles = "grid grid-cols-3 gap-2";

function ProfilePosts() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profileDetails"]);
  const { posts, postsCount } = data;
  return (
    <div className={`mt-8 ${postsCount > 0 ? gridStyles : "grid grid-cols-1"}`}>
      {postsCount == 0 ? (
        <EmptyPostPlaceholder />
      ) : (
        posts?.map((post) => (
          <div key={post._id} className="aspect-square rounded-xl bg-gray-200">
            <img
              src={post.postUrl}
              alt={`Post`}
              className="h-full w-full object-contain"
            />
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePosts;
