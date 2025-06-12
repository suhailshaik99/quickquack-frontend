// Library Imports
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Imports
import useAuth from "../hooks/useAuth";
import FeedAside from "../features/Feed/FeedAside";
import CreatePost from "../features/Posts/CreatePost";
import MobileFeedNav from "../features/Feed/MobileFeedNav";
import CommentsList from "../features/Comments/CommentsList";
import MobileFeedHeader from "../features/Feed/MobileFeedHeader";
import RequestsBox from "../features/ConnectionRequests/RequestsBox";
import SuggestedUsersBox from "../features/Suggestions/SuggestedUsersBox";
import FriendsBox from "../features/Profile/FriendsBox";
import MessageBox from "../features/Messages/MessageBox";

function AppLayout() {
  const { messageBox } = useSelector((state) => state.message);
  const { openFriendsBox } = useSelector((state) => state.profile);
  const { openRequestsBox } = useSelector((state) => state.requests);
  const { openPostBox, openCommentsList } = useSelector((state) => state.post);
  useAuth();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Overlay Modals */}
      {messageBox && <MessageBox />}
      {openPostBox && <CreatePost />}
      {openFriendsBox && <FriendsBox />}
      {openRequestsBox && <RequestsBox />}
      {openCommentsList && <CommentsList />}

      {/* Main Grid Layout */}
      <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] divide-x bg-sky-50 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_5fr_3fr]">
        <FeedAside />
        <MobileFeedHeader />
        <main className="flex h-full flex-shrink-0 justify-center overflow-y-auto">
          <div className="flex h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>
        <section className="hidden place-items-center px-3 lg:grid">
          <SuggestedUsersBox />
        </section>
        <MobileFeedNav />
      </div>
    </div>
  );
}

export default AppLayout;
