// Library Imports
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Local Imports
import useComment from "../../hooks/useComment";
import { useSocket } from "../../contexts/socketContext";

function CommentBox({
  postId,
  postedBy: postUploadedBy,
  handleOpenCommentBox,
  bgApply = false,
}) {
  const socket = useSocket();
  const { _id: userId } = useSelector((state) => state.user.userDetails);
  const { postedBy } = useSelector((state) => state?.post?.carouselPosts[0] || {});
  const { mutate: mutateComment, isPending } = useComment();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    socket.emit("trigger-comment-notifications", {
      userId,
      postedBy: postUploadedBy || postedBy,
      postId,
      actionAt: moment().tz("Asia/Kolkata").format("h:mm A"),
      fullTime: moment().tz("Asia/Kolkata").format("DD/MM/YYYY h:mm:ss A z"),
    });
    mutateComment({ postId, data });
    handleOpenCommentBox();
    reset();
  }

  return (
    <div className={`h-auto py-2 ${bgApply ? "bg-sky-300" : ""}`}>
      <p className="mb-1 pl-2 text-[1.5rem] font-semibold">Post Comment</p>
      <div>
        <form
          className="flex gap-2 pl-1 pr-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            autoComplete="off"
            className="h-16 flex-grow rounded-[1.2rem] border-2 border-sky-400 bg-inherit bg-sky-50 pl-3 text-2xl focus:outline-none focus:ring-[0.2rem] focus:ring-sky-500"
            placeholder={
              errors?.comment?.message
                ? "!!Comment cannot be empty"
                : "your comment..."
            }
            {...register("comment", {
              required: "Comment cannot be empty.",
            })}
          />
          <button
            type="submit"
            className="rounded-xl bg-sky-400 px-4 text-[1.5rem] font-semibold text-slate-700 focus:outline-none focus:ring-[0.2rem] focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-sky-600"
            disabled={isPending}
          >
            comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
