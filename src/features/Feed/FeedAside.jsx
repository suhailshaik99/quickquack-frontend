// Local Imports
import FeedLogo from "./FeedLogo";
import FeedNavigation from "./FeedNavigation";

function FeedAside() {
  return (
    <aside className="hidden min-w-[26rem] flex-shrink flex-col gap-[5rem] sm:flex">
      <FeedLogo />
      <FeedNavigation />
    </aside>
  );
}

export default FeedAside;
