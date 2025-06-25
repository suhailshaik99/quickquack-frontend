export default function EmptyMessages() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="relative w-full max-w-xs sm:max-w-sm mb-6">
        {/* Main "Message Duck" SVG */}
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Duck Body */}
            <path
              d="M100 170 C 40 170, 50 100, 95 95 C 105 94, 115 100, 125 110 C 140 130, 150 160, 100 170 Z"
              fill="#FFFFFF"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            {/* Duck Head */}
            <circle cx="130" cy="90" r="28" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
            {/* Duck Eye */}
            <circle cx="140" cy="85" r="3" fill="#2c3e50" />
            {/* Duck Beak */}
            <path
              d="M150,90 C160,85 165,90 163,98 C161,106, 150,100, 150,90 Z"
              fill="#FFD100"
            />

            {/* Speech Bubble / Message Icon */}
            <g transform="translate(10, -20)">
                <rect x="50" y="50" width="80" height="50" rx="10" ry="10" fill="#67E9F1" stroke="#38BDF8" strokeWidth="2" />
                <path d="M70 100 L60 115 L80 100 Z" fill="#67E9F1" stroke="#38BDF8" strokeWidth="2" />
                {/* Lines inside bubble */}
                <line x1="65" y1="65" x2="115" y2="65" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                <line x1="65" y1="75" x2="105" y2="75" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Decorative elements - small floating messages */}
            <g transform="translate(140, 40) rotate(15)">
                <rect x="0" y="0" width="20" height="10" rx="3" ry="3" fill="#BFDBFE" opacity="0.7" />
                <line x1="5" y1="3" x2="15" y2="3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </g>
             <g transform="translate(20, 110) rotate(-10)">
                <rect x="0" y="0" width="25" height="12" rx="4" ry="4" fill="#BFDBFE" opacity="0.6" />
                <line x1="7" y1="4" x2="18" y2="4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </g>

          </g>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="mt-4 text-4xl font-bold text-teal-600">
          Quiet in the Pond...
        </h2>
        <p className="mt-2 max-w-full text-3xl font-medium text-gray-800">
          Start messaging someone to see your conversations here!
        </p>
      </div>
    </div>
  );
}
