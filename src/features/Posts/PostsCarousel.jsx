// Library Imports
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Icon Imports
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

// Local Imports
import {
  clearCarouselPostId,
  setCarousel,
  setCarouselPostId,
} from "./postSlice";
import useQueryFn from "../../hooks/useQuery";
import { getComments } from "../../services/FormSubmitAPI";
import Comment from "../Comments/Comment";

const PostsCarousel = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { carouselPostId } = useSelector((state) => state.post);

  const { data: comments = [], isPending } = useQueryFn(
    ["comments", carouselPostId],
    getComments,
  );

  const data = queryClient.getQueryData(["profileDetails"]);
  const { posts } = data || {};

  const currentIndex = posts?.findIndex((p) => p._id === carouselPostId);
  const currentPost = posts[currentIndex];

  const handleClose = () => {
    dispatch(setCarousel());
    dispatch(clearCarouselPostId());
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(setCarouselPostId(posts[currentIndex - 1]._id));
    }
  };

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      dispatch(setCarouselPostId(posts[currentIndex + 1]._id));
    }
  };

  if (!currentPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2 backdrop-blur-sm">
      <div className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:grid md:h-[80vh] md:grid-cols-2 md:flex-row">
        {/* Left: Post Image */}
        <div className="flex h-1/2 items-center justify-center bg-black p-2 md:h-full">
          <img
            src={currentPost.postUrl}
            alt="Post"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Right: Comments */}
        <div className="h-1/2 overflow-hidden bg-sky-200 md:h-full">
          <div className="h-full overflow-y-auto p-4">
            <h2 className="mb-2 text-center text-3xl font-semibold text-sky-700">
              Comments
            </h2>
            {isPending ? (
              <p className="text-gray-500">Loading comments...</p>
            ) : comments?.length > 0 ? (
              <ul className="divide-y-2 divide-sky-300">
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
        >
          <FiX size={20} />
        </button>

        {/* Prev Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className={clsx(
              "absolute left-2 top-1/2 z-10 block -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-200",
            )}
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < posts.length - 1 && (
          <button
            onClick={handleNext}
            className={clsx(
              "absolute right-2 top-1/2 z-10 block -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-200",
            )}
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsCarousel;
