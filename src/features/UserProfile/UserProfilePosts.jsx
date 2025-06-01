// Library Imports
import useQueryFn from "../../services/useQuery";

// Local Imports
import { getUserProfileDetails } from "../../services/FormSubmitAPI";

const gridStyles = "grid grid-cols-3 gap-2";

function UserProfilePosts({ username }) {
  const { data, isLoading } = useQueryFn(
    ["userProfileDetails", username],
    getUserProfileDetails,
  );
  if (isLoading) return <p> Loading posts... </p>;
  const { posts, postsCount } = data;
  return (
    <div className={`mt-8 ${postsCount > 0 ? gridStyles : "grid grid-cols-1"}`}>
      {postsCount == 0 ? (
        <p>No Posts yet by the user</p>
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

export default UserProfilePosts;
