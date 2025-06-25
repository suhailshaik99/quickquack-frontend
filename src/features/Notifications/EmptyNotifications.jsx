export default function EmptyNotifications() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[10rem] p-4 text-center">
      <div className="relative mb-6 w-full max-w-md sm:max-w-sm">
        {/* Main Notification Bell SVG */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <g transform="translate(0, 10)">
            {/* Bell Body */}
            <path
              d="M100 170 C 65 170, 75 120, 100 100 C 125 120, 135 170, 100 170 Z"
              fill="#FFC107"
              stroke="#FFA000"
              strokeWidth="3"
            />
            {/* Bell Top (handle) */}
            <path
              d="M90 95 C 85 85, 95 80, 100 80 C 105 80, 115 85, 110 95 L 100 95 Z"
              fill="#FFC107"
              stroke="#FFA000"
              strokeWidth="3"
            />
            {/* Bell Clapper */}
            <circle cx="100" cy="145" r="5" fill="#FFA000" />
            <line
              x1="100"
              y1="110"
              x2="100"
              y2="140"
              stroke="#FFA000"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Subtle "Ding" Rays/Pulses */}
            <line
              x1="100"
              y1="70"
              x2="100"
              y2="50"
              stroke="#FFA000"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line
              x1="120"
              y1="80"
              x2="135"
              y2="65"
              stroke="#FFA000"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <line
              x1="80"
              y1="80"
              x2="65"
              y2="65"
              stroke="#FFA000"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </svg>

        {/* Surrounding Avatar SVGs (absolute positioned) */}
        {/* Avatar 1 - Top Left */}
        <div className="absolute -left-4 -top-4 h-16 w-16 opacity-90 sm:h-20 sm:w-20">
          <svg
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#F0F8FF"
              stroke="#A9D4F2"
              strokeWidth="2"
            />
            <circle cx="30" cy="22" r="10" fill="#42A5F5" />
            <path
              d="M18 45 C 18 35, 42 35, 42 45 C 42 55, 18 55, 18 45 Z"
              fill="#42A5F5"
            />
          </svg>
        </div>

        {/* Avatar 2 - Top Right */}
        <div className="absolute -right-8 top-0 h-20 w-20 opacity-80 sm:h-24 sm:w-24">
          <svg
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#E6FAF0"
              stroke="#B2EBCD"
              strokeWidth="2"
            />
            <circle cx="30" cy="22" r="10" fill="#66BB6A" />
            <path
              d="M18 45 C 18 35, 42 35, 42 45 C 42 55, 18 55, 18 45 Z"
              fill="#66BB6A"
            />
          </svg>
        </div>

        {/* Avatar 3 - Bottom Left */}
        <div className="absolute -left-6 bottom-10 h-12 w-12 opacity-70 sm:h-16 sm:w-16">
          <svg
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#FFF3E0"
              stroke="#FFCC80"
              strokeWidth="2"
            />
            <circle cx="30" cy="22" r="10" fill="#FFB74D" />
            <path
              d="M18 45 C 18 35, 42 35, 42 45 C 42 55, 18 55, 18 45 Z"
              fill="#FFB74D"
            />
          </svg>
        </div>

        {/* Avatar 4 - Bottom Right */}
        <div className="absolute -right-4 bottom-0 h-16 w-16 opacity-85 sm:h-20 sm:w-20">
          <svg
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#FCE4EC"
              stroke="#F48FB1"
              strokeWidth="2"
            />
            <circle cx="30" cy="22" r="10" fill="#EC407A" />
            <path
              d="M18 45 C 18 35, 42 35, 42 45 C 42 55, 18 55, 18 45 Z"
              fill="#EC407A"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="mt-4 text-5xl font-bold text-yellow-600">
          No Buzz in the Pond... Yet!
        </h2>
        <p className="mt-2 max-w-full text-2xl font-medium text-gray-800 sm:text-2xl">
          Notifications from your connections will appear here. Get ready for
          some chirps!
        </p>
      </div>
    </div>
  );
}
