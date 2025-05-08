function CommentBox() {
  return (
    <div className="h-auto overflow-auto py-2">
      <p className="text-[1.5rem] font-semibold">Post Comment</p>
      <div className="flex gap-2">
        <input
          type="text"
          className="h-16 flex-grow rounded-[1.5rem] border-2 border-sky-400 bg-inherit pl-3 text-2xl focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-sky-400 px-4 text-[1.5rem] font-semibold text-slate-700"
        >
          comment
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
