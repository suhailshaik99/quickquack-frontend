function SectionTwo() {
  return (
    <div className="grid grid-cols-[1fr_1fr]">
      <div className="justify-self-center">
        <img
          src="/SECTION_TWO_IMG.webp"
          alt="section_two_image"
          loading="lazy"
          className="h-[18rem] w-[18rem] sm:h-[45rem] sm:w-[45rem]"
        />
      </div>
      <div className="content-center sm:px-4">
        <div className="flex flex-col gap-4 sm:gap-9 sm:p-[10rem]">
          <h1 className="text-3xl font-semibold sm:text-7xl">
            Connect with Friends Instantly<span>⚡</span>
          </h1>
          <p className="text-1xl font-semibold text-slate-500 sm:text-4xl pr-6 text-justify">
            <span>
              Follow friends, discover new people, and build your social circle
              effortlessly. QuickQuack
            </span>
            <span>
              keeps you connected with the ones who matter, wherever they are.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionTwo;
