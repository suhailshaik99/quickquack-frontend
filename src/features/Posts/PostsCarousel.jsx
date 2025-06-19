// Library Imports
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

// Local Imports
import {
  clearCarouselPostId,
  setCarousel,
  setCarouselPostId,
  clearCarouselPosts,
} from "./postSlice";
import Comment from "../Comments/Comment";
import useQueryFn from "../../hooks/useQuery";
import CommentBox from "../Comments/CommentBox";
import { getComments } from "../../services/FormSubmitAPI";

const PostsCarousel = () => {
  const dispatch = useDispatch();

  const { carouselPostId, carouselPosts: posts } = useSelector(
    (state) => state.post,
  );

  const currentIndex = posts?.findIndex((p) => p._id === carouselPostId);
  const currentPost = posts?.[currentIndex];

  const { data: comments = [], isPending } = useQueryFn(
    ["comments", carouselPostId],
    getComments,
  );

  const handleClose = () => {
    dispatch(setCarousel());
    dispatch(clearCarouselPostId());
    dispatch(clearCarouselPosts());
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 backdrop-blur-sm">
      <div className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:grid md:h-[80vh] md:grid-cols-2">
        {/* Left: Post Image */}
        <div className="flex h-1/2 items-center justify-center bg-sky-200 p-2 md:h-full">
          <img
            src={currentPost.postUrl}
            alt="Post"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Right: Comments Section with CommentBox */}
        <div className="relative flex h-1/2 flex-col bg-white md:h-full md:overflow-hidden">
          {/* Scrollable comments list */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-sky-300 p-4">
            <h2 className="mb-2 text-center text-3xl font-semibold">
              Comments
            </h2>
            {isPending ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">Loading comments...</p>
              </div>
            ) : comments?.length > 0 ? (
              <ul className="divide-y-2 divide-sky-400">
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </ul>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-2xl text-gray-500">
                  No comments yet.
                </p>
              </div>
            )}
          </div>

          {/* Fixed comment input box */}
          <div className="flex-shrink-0 border-t border-gray-300 bg-white">
            <CommentBox
              postId={carouselPostId}
              handleOpenCommentBox={() => {}}
              bgApply={true}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 z-20 rounded-full bg-white/80 p-1 shadow-md hover:bg-gray-200"
        >
          <FiX size={20} />
        </button>

        {/* Prev Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md hover:bg-gray-200"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < posts.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md hover:bg-gray-200"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsCarousel;
