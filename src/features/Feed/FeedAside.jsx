import FeedNavigation from "./FeedNavigation";
import FeedLogo from "./FeedLogo";

function FeedAside() {
  return (
    <aside className="sm:flex hidden min-w-[26rem] flex-col gap-[5rem]">
      <FeedLogo />
      <FeedNavigation />
    </aside>
  );
}

export default FeedAside;
