function NoPendingRequests() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      {/* <img src="NO-PENDING-REQ.png" className="h-full w-full" /> */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-14 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="160"
          height="160"
          fill="none"
          className="mb-4"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="#FDE68A"
            stroke="#FBBF24"
            strokeWidth="4"
          />
          <circle cx="24" cy="26" r="4" fill="#1e3a8a" />
          <circle cx="40" cy="26" r="4" fill="#1e3a8a" />
          <path
            d="M22 40c2 4 10 6 20 0"
            stroke="#1e3a8a"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M28 18c-3-4-1-10 4-10s7 6 4 10" fill="#F59E0B" />
        </svg>
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold text-sky-500">
            No pending requests
          </h2>
          <p className="mt-2 max-w-full text-[1.5rem] font-bold text-slate-600">
            Looks like everyone’s already quacking along! 🐤
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoPendingRequests;
