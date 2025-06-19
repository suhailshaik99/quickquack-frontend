// Library Imports
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Imports
import useAuth from "../hooks/useAuth";
import ProfileViewer from "./ProfileViewer";
import FeedAside from "../features/Feed/FeedAside";
import CreatePost from "../features/Posts/CreatePost";
import FriendsBox from "../features/Profile/FriendsBox";
import MessageBox from "../features/Messages/MessageBox";
import MobileFeedNav from "../features/Feed/MobileFeedNav";
import PostsCarousel from "../features/Posts/PostsCarousel";
import CommentsList from "../features/Comments/CommentsList";
import ProfileEditBox from "../features/Profile/ProfileEditBox";
import MobileFeedHeader from "../features/Feed/MobileFeedHeader";
import RequestsBox from "../features/ConnectionRequests/RequestsBox";
import ProfileOptionsBox from "../features/Profile/ProfileOptionsBox";
import SuggestedUsersBox from "../features/Suggestions/SuggestedUsersBox";

function AppLayout() {
  const { openCarousel } = useSelector((state) => state.post);
  const { messageBox } = useSelector((state) => state.message);
  const { openRequestsBox } = useSelector((state) => state.requests);
  const { openPostBox, openCommentsList } = useSelector((state) => state.post);
  const {
    openFriendsBox,
    viewProfileEditBox,
    profileOptionsBox,
    profileViewer,
  } = useSelector((state) => state.profile);
  useAuth();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Overlay Modals */}
      {messageBox && <MessageBox />}
      {openPostBox && <CreatePost />}
      {openFriendsBox && <FriendsBox />}
      {openCarousel && <PostsCarousel />}
      {openRequestsBox && <RequestsBox />}
      {profileViewer && <ProfileViewer />}
      {openCommentsList && <CommentsList />}
      {viewProfileEditBox && <ProfileEditBox />}
      {profileOptionsBox && <ProfileOptionsBox />}

      {/* Main Grid Layout */}
      <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] divide-x bg-sky-50 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_5fr_3fr]">
        <FeedAside />
        <MobileFeedHeader />
        <main className="flex h-full flex-shrink-0 justify-center overflow-y-auto">
          <div className="flex h-full w-full justify-center overflow-y-auto">
            <Outlet />
          </div>
        </main>
        <section className="bottom-2 hidden place-items-center gap-2 p-3 lg:grid">
          <SuggestedUsersBox />
          {/* <OnlineUsersBox /> */}
        </section>
        <MobileFeedNav />
      </div>
    </div>
  );
}

export default AppLayout;
