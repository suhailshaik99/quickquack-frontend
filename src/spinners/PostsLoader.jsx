function PostsLoader() {
  return (
    <div>

    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-ping rounded-full bg-sky-400 opacity-70"></div>
        <div className="absolute inset-0 animate-pulse rounded-full bg-sky-500"></div>
        <div className="feather-dot absolute inset-0 left-4 top-5 h-4 w-4 animate-bounce rounded-full bg-yellow-400" />
      </div>
      <p className="animate-fadeIn mt-4 text-2xl font-bold tracking-wide text-sky-600">
        Loading Posts...
      </p>
    </div>
    </div>
  );
}

export default PostsLoader;
