export default function EmptySearch() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="relative w-full max-w-xs sm:max-w-sm">
        {/* Decorative elements positioned relative to the main SVG */}
        <div className="absolute -left-4 top-[20%] h-14 w-14 text-yellow-400/60 opacity-80 sm:-left-8 sm:h-16 sm:w-16">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.32 13.8c-1.13 1.3-3.2 2.4-5.41 2.4s-4.26-1.2-5.34-2.6C3.23 11.9 3.1 9.7 4.17 7.9c1.24-2 3.66-3.2 6.23-3.2s4.78 1.2 6.02 3.1c1.25 2 .97 4.5-1.1 5.7z" />
          </svg>
        </div>
        <div className="absolute -right-6 top-[45%] h-16 w-16 text-sky-300/70 sm:-right-10 sm:h-20 sm:w-20">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* Main "Explorer Duck" SVG */}
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M100 180 C 40 180, 50 110, 95 105 C 105 104, 115 110, 125 120 C 140 140, 150 170, 100 180 Z"
              fill="#FFFFFF"
            />
            <circle cx="130" cy="100" r="30" fill="#FFFFFF" />
            <circle cx="140" cy="95" r="3.5" fill="#2c3e50" />
            <path
              d="M155,100 C165,95 170,100 168,108 C166,116, 155,110, 155,100 Z"
              fill="#FFD100"
            />
            <path
              d="M140,85 l-40,-15 l10,-25 l40,15 l-10,25 Z"
              fill="#4A5568"
            />
            <path
              d="M150,80 l-40,-15 l10,-25 l40,15 l-10,25 Z"
              fill="#2D3748"
            />
            <circle cx="110" cy="48" r="12" fill="#A0AEC0" />
            <circle cx="120" cy="45" r="12" fill="#A0AEC0" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="mt-4 text-4xl font-bold text-sky-600">
          Explore the Pond
        </h2>
        <p className="mt-2 max-w-full text-3xl font-medium text-gray-800">
          Use the search bar above to find other users. Lets get quacking!
        </p>
      </div>
    </div>
  );
}
