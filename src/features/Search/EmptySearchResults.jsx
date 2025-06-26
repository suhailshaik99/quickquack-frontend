export default function EmptySearchResults() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-6 w-full max-w-xs sm:max-w-sm">
        {/* Main "No Results" SVG Illustration */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <g>
            {/* Magnifying Glass (prominently placed) */}
            <circle
              cx="100"
              cy="100"
              r="45"
              fill="#FFFFFF"
              stroke="#607D8B"
              strokeWidth="4"
            />{" "}
            {/* Lens */}
            <line
              x1="135"
              y1="135"
              x2="175"
              y2="175"
              stroke="#607D8B"
              strokeWidth="8"
              strokeLinecap="round"
            />{" "}
            {/* Handle */}
            <path
              d="M100 100 A 40 40 0 0 1 135 100"
              fill="none"
              stroke="#B0BEC5"
              strokeWidth="2"
              strokeDasharray="3,3"
            />{" "}
            {/* Subtle inner light effect for lens */}
            {/* Question Mark / Empty State Symbol inside the lens */}
            <text x="88" y="115" fontSize="40" fontWeight="bold" fill="#FF7043">
              ?
            </text>
            {/* Properly Aligned Duck */}
            <g transform="translate(30, 90)">
              {/* Duck Body - properly sized and positioned */}
              <path
                d="M20 30 Q 40 0 60 30 Q 80 60 60 70 Q 40 80 20 60 Z"
                fill="#FFFAE0"
                stroke="#D4C4A5"
                strokeWidth="2"
              />

              {/* Duck Head - properly positioned relative to body */}
              <circle
                cx="65"
                cy="20"
                r="15"
                fill="#FFFAE0"
                stroke="#D4C4A5"
                strokeWidth="2"
              />

              {/* Duck Eye */}
              <circle cx="70" cy="15" r="2" fill="#333333" />

              {/* Duck Beak - properly positioned at front of head */}
              <path d="M80 20 L90 25 L80 30 Z" fill="#FFA07A" />

              {/* Optional wing to make it more duck-like */}
              <path
                d="M30 40 Q 45 35 50 50 Q 45 60 30 55 Z"
                fill="#FFFAE0"
                stroke="#D4C4A5"
                strokeWidth="1.5"
              />
            </g>
            {/* Subtle "No Results" or "Dust" lines around the area */}
            <line
              x1="20"
              y1="50"
              x2="40"
              y2="60"
              stroke="#CFD8DC"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line
              x1="160"
              y1="40"
              x2="180"
              y2="50"
              stroke="#CFD8DC"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line
              x1="40"
              y1="160"
              x2="60"
              y2="170"
              stroke="#CFD8DC"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="mt-4 text-4xl font-bold text-orange-600">
          No Ducks in This Pond!
        </h2>
        <p className="mt-2 max-w-full text-3xl font-medium text-gray-800">
          We could not find anyone matching your search. Try a different
          username!
        </p>
      </div>
    </div>
  );
}
