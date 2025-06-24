// Library Imports
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import Comment from "./Comment";
import useQueryFn from "../../hooks/useQuery";
import DualRingLoader from "../../spinners/DualRingLoader";
import { getComments } from "../../services/FormSubmitAPI";
import { clearPostId, closeCommentsListBox } from "../Posts/postSlice";

function CommentsList() {
  const dispatch = useDispatch();
  const { postId } = useSelector((state) => state.post);
  const { data: comments, isPending } = useQueryFn(
    ["comments", postId],
    getComments,
  );

  function handleCloseCommentListBox() {
    dispatch(clearPostId());
    dispatch(closeCommentsListBox());
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 px-3 backdrop-blur-sm">
      <div className="relative h-[50rem] w-[50rem] rounded-xl bg-sky-100 p-3 sm:h-[60rem]">
        <div className="flex items-center justify-center">
          <button
            className="absolute right-4 top-1 text-5xl font-bold text-gray-700 hover:text-red-500"
            onClick={handleCloseCommentListBox}
          >
            ×
          </button>
          <h1 className="mb-4 border-b border-sky-300 pb-2 text-center text-2xl font-semibold sm:text-3xl">
            Comments
          </h1>
        </div>
        <div className="h-[52rem] space-y-3 divide-y divide-slate-300 overflow-y-auto pr-3">
          {isPending ? (
            <div className="flex h-full items-center justify-center">
              <DualRingLoader />
            </div>
          ) : (
            <>
              {comments?.length == 0 ? (
                <p className="bold flex justify-center text-2xl">
                  No comments on this post.
                </p>
              ) : (
                ""
              )}
              {comments?.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentsList;
