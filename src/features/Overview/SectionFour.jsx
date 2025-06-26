function SectionFour() {
  return (
    <div className="grid grid-cols-[1fr_1fr]">
      <div className="justify-self-center">
        <img
          src="/SECTION_FOUR_IMG.webp"
          loading="lazy"
          alt="section_two_image"
          className="h-[18rem] w-[18rem] sm:h-[45rem] sm:w-[45rem]"
        />
      </div>
      <div className="content-center sm:px-4">
        <div className="flex flex-col gap-4 sm:gap-9 sm:p-[10rem]">
          <h1 className="text-3xl font-semibold sm:text-7xl">
            Real-time Notifications <span>🔔</span>
          </h1>
          <p className="text-1xl font-semibold text-slate-500 sm:text-4xl pr-6 text-justify">
            <span>
              Stay updated instantly! Get notified when someone likes, comments,
              or follows you — never miss a moment of engagement on QuickQuack.
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

export default SectionFour;
