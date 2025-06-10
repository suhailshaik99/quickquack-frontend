// Local Imports
import FeedLogo from "./FeedLogo";
import FeedNavigation from "./FeedNavigation";

function FeedAside() {
  return (
    <aside className="sm:flex hidden min-w-[26rem] flex-col gap-[5rem]">
      <FeedLogo />
      <FeedNavigation />
    </aside>
  );
}

export default FeedAside;
