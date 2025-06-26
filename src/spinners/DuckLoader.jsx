function DuckLoader() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-sky-50">
      {/* Water ripple container */}
      <div className="relative">
        {/* Rippling circles (water waves) */}
        <span className="ripple absolute inset-0 rounded-full"></span>
        <span className="ripple absolute inset-0 rounded-full delay-1000"></span>
        <span className="ripple delay-2000 absolute inset-0 rounded-full"></span>
        {/* Duck image (floating on water) */}
        {/* Replace src with a high-quality duck SVG or image */}
        <img
          src="/SPINNER_IMG.webp"
          alt="A duck floating on water"
          className="floating-duck relative z-10 w-24 md:w-32"
        />
      </div>

      {/* Loading text with animated dots */}
      <p className="loading-dots ml-8 text-3xl font-bold text-sky-500">
        Loading<span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
}

export default DuckLoader;
