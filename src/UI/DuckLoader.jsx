function DuckLoader() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img
        src={"SPINNER_IMG.png"}
        alt="QuickQuack Loading"
        className="animate-bounce-slow h-[5rem] w-20"
      />
      <div className="mt-2 h-2 w-16 animate-pulse rounded-full bg-gray-300"></div>
    </div>
  );
}

export default DuckLoader;