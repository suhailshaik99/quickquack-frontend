export default function EmptyProfilePosts() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="relative w-full max-w-xs sm:max-w-sm">
        {/* Main "Blank Canvas" SVG Illustration */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <g>
            {/* Blank Scroll/Paper representing no posts */}
            <rect
              x="70"
              y="45"
              width="100"
              height="110"
              rx="8"
              ry="8"
              fill="#FDFCF6"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            {/* Subtle lines on paper to indicate it's for writing */}
            <line
              x1="85"
              y1="65"
              x2="155"
              y2="65"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="80"
              x2="155"
              y2="80"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="95"
              x2="155"
              y2="95"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="110"
              x2="155"
              y2="110"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="125"
              x2="155"
              y2="125"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="140"
              x2="155"
              y2="140"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Quill Pen (foreground, leaning on scroll, indicating readiness to create) */}
            <g transform="translate(145, 60) rotate(15)">
              <rect
                x="0"
                y="0"
                width="4"
                height="40"
                fill="#6B4F35"
                rx="1"
                ry="1"
              />{" "}
              {/* Handle */}
              <path d="M2 0 L-1 8 L5 8 Z" fill="#6B4F35" /> {/* Nib */}
              <path
                d="M2 0 C0 0 -5 10 -2 8 Z"
                fill="#D2B48C"
                transform="translate(0, -15)"
              />{" "}
              {/* Feather */}
            </g>

            {/* Duck (positioned to the left of the scroll, looking towards it, thoughtful pose) */}
            <g transform="translate(20, 50)">
              {/* Body */}
              <path
                d="M60 90 C 35 90, 40 50, 60 45 C 85 50, 90 90, 60 90 Z"
                fill="#FFFFFF"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              {/* Head */}
              <circle
                cx="80"
                cy="40"
                r="18"
                fill="#FFFFFF"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              {/* Eye (looking towards the scroll) */}
              <circle cx="86" cy="38" r="2.5" fill="#2c3e50" />
              {/* Beak */}
              <path
                d="M90,40 C95,35 97,40 96,45 C95,50, 90,45, 90,40 Z"
                fill="#FFD100"
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="mt-4 text-4xl font-bold text-sky-500">
          Awaiting a Masterpiece!
        </h2>
        <p className="mt-2 max-w-full text-2xl font-medium text-gray-800">
          This user has not shared any posts yet. Perhaps they are busy crafting
          something extraordinary!
        </p>
      </div>
    </div>
  );
}
