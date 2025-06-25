import { Link } from "react-router-dom";

// --- ENHANCED, ILLUSTRATIVE SVG ICONS ---
// These SVGs are completely redesigned to be clear, recognizable, and high-quality.

const LostDuckIllustration = () => (
  // Main centerpiece illustration: a cute, confused duck with a spyglass.
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Spyglass */}
      <path
        d="M106.3,163.2c-5.3-5.3-8.2-12.3-8.2-19.8c0-7.5,2.9-14.5,8.2-19.8l35.4-35.4c5.3-5.3,12.3-8.2,19.8-8.2 s14.5,2.9,19.8,8.2l21.2,21.2c5.3,5.3,8.2,12.3,8.2,19.8s-2.9,14.5-8.2,19.8l-35.4,35.4c-5.3,5.3-12.3,8.2-19.8,8.2 s-14.5-2.9-19.8-8.2L106.3,163.2z"
        fill="#758291"
      />
      <path
        d="M198.3,99.9l-11.8,11.8c-3.6,3.6-8.5,5.6-13.4,5.6s-9.8-2-13.4-5.6l-35.4-35.4c-3.6-3.6-5.6-8.5-5.6-13.4 s2-9.8,5.6-13.4l11.8-11.8c3.6-3.6,8.5-5.6,13.4-5.6s9.8,2,13.4,5.6l35.4,35.4c3.6,3.6,5.6,8.5,5.6,13.4s-2,9.8-5.6,13.4"
        fill="#a0aebc"
      />
      <circle cx="141.5" cy="123.5" r="34" fill="#d4eefc" />

      {/* Duck Body */}
      <path
        d="M150,260 C60,260 70,160 140,150 C155,148 170,155 180,170 C200,200 220,250 150,260 Z"
        fill="#FFFFFF"
      />
      {/* Duck Head */}
      <circle cx="185" cy="145" r="45" fill="#FFFFFF" />
      {/* Duck Beak */}
      <path
        d="M225,145 C240,135 250,145 245,155 C240,165 225,160 225,145 Z"
        fill="#FFD100"
      />
      {/* Duck Eye */}
      <circle cx="205" cy="135" r="5" fill="#2c3e50" />
    </g>
  </svg>
);

// --- NEW DECORATIVE ICONS ---

const DucklingIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.32 13.8c-1.13 1.3-3.2 2.4-5.41 2.4s-4.26-1.2-5.34-2.6C3.23 11.9 3.1 9.7 4.17 7.9c1.24-2 3.66-3.2 6.23-3.2s4.78 1.2 6.02 3.1c1.25 2 .97 4.5-1.1 5.7z" />
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const MessageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

const PostIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function PageNotFound({ type = "generic" }) {
  const messages = {
    generic: {
      headline: "Quack! This page has paddled away.",
      body: "Sorry, we couldn't find the page you were looking for. It might have been moved, deleted, or perhaps you've discovered a part of the pond that's still under construction.",
    },
    user: {
      headline: "Hmm, this duck isn't in our pond.",
      body: "The user profile you're trying to view doesn't exist. They may have flown to another pond or the profile link is incorrect.",
    },
  };

  const { headline, body } = messages[type] || messages.generic;

  const animationStyle = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-sky-200 p-4">
        {/* --- ENHANCED Decorative Floating Icons --- */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <DucklingIcon
            className="animate-float absolute left-[5%] top-[15%] h-24 w-24 text-yellow-400/80"
            style={{ animationDelay: "0s" }}
          />
          <ProfileIcon
            className="animate-float absolute right-[8%] top-[20%] h-28 w-28 text-sky-300"
            style={{ animationDelay: "1s" }}
          />
          <MessageIcon
            className="animate-float absolute bottom-[10%] left-[10%] h-32 w-32 text-sky-300/90"
            style={{ animationDelay: "2.5s" }}
          />
          <PostIcon
            className="animate-float absolute bottom-[45%] left-[15%] h-20 w-20 text-white/70"
            style={{ animationDelay: "1.5s" }}
          />
          <HeartIcon
            className="animate-float absolute bottom-[20%] right-[15%] h-24 w-24 text-white/80"
            style={{ animationDelay: "3.5s" }}
          />
          <DucklingIcon
            className="animate-float absolute right-[5%] top-[65%] h-20 w-20 text-yellow-400/70"
            style={{ animationDelay: "2s" }}
          />
          <ProfileIcon
            className="animate-float absolute left-[20%] top-[75%] h-16 w-16 text-sky-300/60"
            style={{ animationDelay: "4s" }}
          />
          <MessageIcon
            className="animate-float absolute right-[20%] top-[5%] h-20 w-20 text-white/60"
            style={{ animationDelay: "5s" }}
          />
          <HeartIcon
            className="animate-float absolute left-[2%] top-[40%] h-16 w-16 text-white/70"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="container z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <LostDuckIllustration />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:text-left">
            <p className="text-5xl font-semibold uppercase tracking-widest text-sky-500">
              404 Error
            </p>

            <h1 className="mt-6 text-6xl font-bold tracking-tight text-gray-800 sm:text-7xl">
              {headline}
            </h1>
            <p className="mt-8 text-[1.4rem] leading-9 text-gray-700">{body}</p>

            <div className="mt-12 flex w-full max-w-sm flex-col items-center gap-5 lg:max-w-none lg:items-start">
              <Link
                to="/"
                className="w-full rounded-lg bg-sky-500 px-8 py-4 text-center text-xl font-semibold text-white shadow-lg transition hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                Go Back to Feed
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
