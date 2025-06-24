// Library Imports
import { useDispatch } from "react-redux";
import useQueryFn from "../../hooks/useQuery";

// Local Imports
import {
  setCarousel,
  setCarouselPostId,
  setCarouselPosts,
} from "../Posts/postSlice";
import { getUserProfileDetails } from "../../services/FormSubmitAPI";
import DualRingLoader from "../../spinners/DualRingLoader";

const gridStyles = "grid grid-cols-3 gap-2";

function UserProfilePosts({ username }) {
  const dispatch = useDispatch();
  const { data, isPending } = useQueryFn(
    ["userProfileDetails", username],
    getUserProfileDetails,
  );

  const { posts = [], postsCount = 0 } = data || {};

  function handleOpenCarousel(index) {
    const postId = posts[index]._id;
    dispatch(setCarouselPosts(posts));
    dispatch(setCarouselPostId(postId));
    dispatch(setCarousel());
  }

  return (
    <div className={`mt-8 ${postsCount > 0 ? gridStyles : "grid grid-cols-1"}`}>
      {isPending && (
        <div className="flex h-full items-center justify-center">
          <DualRingLoader />
        </div>
      )}
      {postsCount === 0 ? (
        <p>No Posts yet by the user</p>
      ) : (
        posts.map((post, i) => (
          <div key={post._id} className="aspect-square rounded-xl bg-gray-200">
            <img
              src={post.postUrl}
              alt={`Post`}
              className="h-full w-full object-contain hover:cursor-pointer"
              onClick={() => handleOpenCarousel(i)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfilePosts;
