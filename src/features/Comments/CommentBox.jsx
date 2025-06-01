// Library Imports
import { useForm } from "react-hook-form";

// Local Imports
import useComment from "./useComment";

function CommentBox({ postId, handleOpenCommentBox }) {
  const { mutate: mutateComment, isPending } = useComment();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    mutateComment({ postId, data });
    handleOpenCommentBox();
  }

  return (
    <div className="py-2 h-auto">
      <p className="mb-1 pl-2 text-[1.5rem] font-semibold">Post Comment</p>
      <div className="">
        <form
          className="flex gap-2 pl-1 pr-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="h-16 flex-grow rounded-[1.2rem] border-2 border-sky-400 bg-inherit pl-3 text-2xl focus:outline-none focus:ring-[0.2rem] focus:ring-sky-500"
            placeholder={
              errors?.comment?.message
                ? "!!Comment cannot be empty"
                : "your comment..."
            }
            {...register("comment", {
              required: "comment cannot be empty..",
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
