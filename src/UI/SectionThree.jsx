function SectionThree() {
  return (
    <div className="grid grid-cols-[1fr_1fr] bg-sky-100">
      <div className="content-center sm:px-4">
        <div className="flex flex-col gap-4 pl-[2rem] sm:gap-9 sm:p-[10rem]">
          <h1 className="text-3xl font-semibold sm:text-7xl">
            Discover Inspiring Content <span>💡</span>
          </h1>
          <p className="text-1xl font-semibold text-slate-500 sm:text-4xl">
            <span>
              Explore a world of creativity! From trending photos to viral
              videos, QuickQuack brings you the content you love — tailored to
              your interests.
            </span>
          </p>
        </div>
      </div>
      <div className="justify-self-center">
        <img
          src="SECTION_THREE_IMG.png"
          alt="section_two_image"
          className="h-[18rem] w-[18rem] sm:h-[45rem] sm:w-[45rem]"
        />
      </div>
    </div>
  );
}

export default SectionThree;
