// Library Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icon Imports
import { RxCross2 } from "react-icons/rx";
import { HiEllipsisHorizontal } from "react-icons/hi2";
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
import useMutationFunc from "../../hooks/useMutation";
import { deletePost, getComments } from "../../services/FormSubmitAPI";
import { useQueryClient } from "@tanstack/react-query";
import DualRingLoader from "../../spinners/DualRingLoader";

const PostsCarousel = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [postOptions, setPostOptions] = useState(false);

  const { _id: userId } = useSelector((state) => state.user.userDetails);
  const { carouselPostId, carouselPosts: posts } = useSelector(
    (state) => state.post,
  );

  const currentIndex = posts?.findIndex((p) => p._id === carouselPostId);
  const currentPost = posts?.[currentIndex];

  const { data: comments = [], isPending: loadingComments } = useQueryFn(
    ["comments", carouselPostId],
    getComments,
  );
  const [mutate] = useMutationFunc(
    deletePost,
    "Post Deleted Successfully",
    "Error Deleting Post",
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

  const handlePostOptions = () => {
    setPostOptions((prev) => !prev);
  };

  const handlePostDelete = () => {
    const data = {
      userId,
      postId: currentPost._id,
    };
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["profilePosts"]);
        queryClient.invalidateQueries(["ProfileDetails"]);
        dispatch(setCarousel());
      },
      onError: (error) => {
        console.error("Failed to delete post:", error);
      },
    });
  };

  if (!currentPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 backdrop-blur-sm">
      <div className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:grid md:h-[80vh] md:grid-cols-2">
        {/* Left: Post Image */}
        <div className="relative flex h-1/2 items-center justify-center bg-sky-200 p-2 md:h-full">
          {userId === currentPost.postedBy && (
            <>
              {!postOptions && (
                <div
                  className="absolute right-2 top-14 rounded-full p-1 outline-none hover:cursor-pointer focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 md:top-2"
                  tabIndex={0}
                  onClick={handlePostOptions}
                >
                  <HiEllipsisHorizontal size={28} />
                </div>
              )}
              {postOptions && (
                <div className="absolute right-2 top-14 z-10 flex h-[auto] w-[auto] flex-col gap-4 rounded-md bg-sky-400 p-3 shadow-lg hover:cursor-pointer md:top-2">
                  <div className="flex h-auto justify-end rounded-full">
                    <div
                      className="rounded-full bg-sky-200 p-1"
                      onClick={handlePostOptions}
                    >
                      <RxCross2 size={18} />
                    </div>
                  </div>
                  <ul className="text-center text-2xl font-medium text-gray-700">
                    <li
                      className="rounded-xl px-6 py-3 transition-all duration-300 hover:bg-sky-200"
                      onClick={handlePostDelete}
                    >
                      Delete Post
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
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
            {loadingComments ? (
              <div className="flex h-full items-center justify-center">
                <DualRingLoader />
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
