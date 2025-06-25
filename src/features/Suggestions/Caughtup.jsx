function Caughtup() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-sky-50">
      {/* Professional Social Duck Illustration */}
      <svg
        className="mb-6 h-60 w-60 text-sky-400/50"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central Duck - Clear silhouette */}
        <path d="M100 140Q70 140 50 120 30 100 50 80 70 60 100 60 130 60 150 80 170 100 150 120 130 140 100 140Z" />
        <circle cx="130" cy="90" r="3" fill="currentColor" />
        <path d="M80 100Q90 105 100 105 110 105 120 100" />

        {/* Profile Avatars - Clear circular shapes */}
        <circle cx="40" cy="50" r="10" />
        <circle cx="160" cy="50" r="10" />
        <circle cx="50" cy="170" r="10" />
        <circle cx="150" cy="170" r="10" />

        {/* Message Bubbles - Recognizable chat icons */}
        <path d="M30 70Q45 55 65 55 75 55 75 65 75 75 65 75 45 75 30 85Z" />
        <path d="M170 70Q155 55 135 55 125 55 125 65 125 75 135 75 155 75 170 85Z" />

        {/* Social Icons - Clear outlines */}
        <circle cx="40" cy="140" r="6" />
        <path d="M160 140L164 144 170 140" />

        {/* Connection Lines - Subtle dotted style */}
        <path d="M100 120Q85 110 70 100" strokeDasharray="3,3" />
        <path d="M100 120Q115 110 130 100" strokeDasharray="3,3" />
        <path d="M100 135Q80 150 60 160" strokeDasharray="3,3" />
        <path d="M100 135Q120 150 140 160" strokeDasharray="3,3" />
      </svg>

      {/* Text Content */}
      <div className="flex max-w-full flex-col gap-6 space-y-2 text-center">
        <h3 className="text-3xl font-semibold text-sky-700">
          You are All Caught Up!
        </h3>
        <p className="text-[1.3rem] text-sky-500">
          You have seen all available profiles. New users will appear here as
          they join <span className="font-bold">QuickQuack</span>.
        </p>
      </div>
    </div>
  );
}

export default Caughtup;
