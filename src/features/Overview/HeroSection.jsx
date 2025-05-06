function HeroSection() {
  return (
    <div className="grid grid-cols-[1fr_1fr] bg-gradient-to-b from-sky-100 to-sky-50 pt-4 sm:gap-4 sm:px-[4rem]">
      <div className="mb-5 flex flex-col gap-2 px-[2rem] sm:gap-[4rem] sm:px-[7rem] sm:py-20">
        <h2 className="flex flex-col text-2xl font-semibold sm:text-8xl">
          <span>Power smarter</span>
          <span>conversations with</span>
          <span>QuickQuack</span>
        </h2>
        <p className="gap:1 text-1xl flex flex-col font-semibold text-gray-500 sm:gap-4 sm:text-5xl">
          <span>Modern messaging software</span>
          <span>that your sales and customer engagement</span>
          <span>teams will love.</span>
        </p>
      </div>
      <div>
        <img src="HERO_IMAGE.png" alt="hero_image" className="" />
      </div>
    </div>
  );
}

export default HeroSection;
