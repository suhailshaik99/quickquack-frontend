export default function EmptyFeed() {
  return (
    <div className="mt-3 flex h-auto w-[38rem] flex-col items-center justify-center px-2 pt-4 sm:w-[48rem]">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        {/* SVG Illustration */}
        <div className="relative mb-6 w-full max-w-md">
          <svg
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full"
          >
            <g>
              {/* Duck Body */}
              <path
                d="M110 180 C 50 180, 60 110, 105 105 C 115 104, 125 110, 135 120 C 150 140, 160 170, 110 180 Z"
                fill="#FFF"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              {/* Duck Head */}
              <circle
                cx="140"
                cy="100"
                r="28"
                fill="#FFF"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              {/* Duck Eye */}
              <circle cx="150" cy="95" r="3" fill="#2c3e50" />
              {/* Duck Beak */}
              <path
                d="M160,100 C170,95 175,100 173,108 C171,116, 160,110, 160,100 Z"
                fill="#FFD100"
              />

              {/* Surrounding Icons - Avatar top left */}
              <g transform="translate(10, 30)">
                <circle cx="0" cy="0" r="12" fill="#BFDBFE" />
                <circle cx="0" cy="-5" r="4" fill="#fff" />
                <path d="M -6 4 a6 3 0 0 0 12 0" fill="#fff" />
              </g>

              {/* Surrounding Icons - Avatar bottom right */}
              <g transform="translate(190, 180)">
                <circle cx="0" cy="0" r="12" fill="#BFDBFE" />
                <circle cx="0" cy="-5" r="4" fill="#fff" />
                <path d="M -6 4 a6 3 0 0 0 12 0" fill="#fff" />
              </g>

              {/* Surrounding Icons - Post top right */}
              <g transform="translate(170, 30)">
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="18"
                  rx="3"
                  ry="3"
                  fill="#93C5FD"
                />
                <path
                  d="M0,18 L8,10 L12,14 L18,8 L24,14"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                />
              </g>

              {/* Surrounding Icons - Post bottom left */}
              <g transform="translate(20, 160)">
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="18"
                  rx="3"
                  ry="3"
                  fill="#93C5FD"
                />
                <path
                  d="M0,18 L8,10 L12,14 L18,8 L24,14"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-2">
          <h2 className="mt-4 text-4xl font-bold text-yellow-600">
            Nothing in the Pond Yet
          </h2>
          <p className="mt-2 text-2xl font-medium text-gray-700">
            Follow others to see their posts appear here!
          </p>
        </div>
      </div>
    </div>
  );
}
