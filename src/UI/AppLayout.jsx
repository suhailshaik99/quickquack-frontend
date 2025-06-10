// Library Imports
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Imports
import FeedAside from "../features/Feed/FeedAside";
import CreatePost from "../features/Posts/CreatePost";
import useAuth from "../features/Authentication/useAuth";
import CommentsList from "../features/Comments/CommentsList";
import RequestsBox from "../features/ConnectionRequests/RequestsBox";
import SuggestedUsersBox from "../features/Suggestions/SuggestedUsersBox";

function AppLayout() {
  const { openPostBox, openCommentsList } = useSelector((state) => state.post);
  const { openRequestsBox } = useSelector((state) => state.requests);
  useAuth();

  return (
    <div className="relative grid h-screen grid-cols-1 divide-x overflow-hidden bg-sky-50 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_5fr_3fr]">
      {openPostBox && <CreatePost />}
      {openRequestsBox && <RequestsBox />}
      {openCommentsList && <CommentsList />}
      <FeedAside />
      <main className="flex h-full flex-shrink-0 justify-center overflow-y-auto">
        <div className="flex h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <section className="hidden place-items-center px-3 lg:grid">
        <SuggestedUsersBox />
      </section>
    </div>
  );
}

export default AppLayout;
