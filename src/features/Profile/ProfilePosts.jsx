// Library Imports
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Local Imports
import EmptyPostPlaceholder from "./ProfileEmptyPosts";
import { setCarousel, setCarouselPostId } from "../Posts/postSlice";

const gridStyles = "grid grid-cols-3 gap-2";

function ProfilePosts() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["profileDetails"]);
  const { posts, postsCount } = data;

  function handleOpenCarousel(index) {
    const postId = posts[index]._id;
    dispatch(setCarouselPostId(postId));
    dispatch(setCarousel());
  }

  return (
    <div className={`mt-8 ${postsCount > 0 ? gridStyles : "grid grid-cols-1"}`}>
      {postsCount == 0 ? (
        <EmptyPostPlaceholder />
      ) : (
        posts?.map((post, i) => (
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

export default ProfilePosts;
