// Library Imports
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Imports
import LogoutBox from "./Logout";
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
  const { viewLogoutBox } = useSelector((state) => state.user);
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
      {viewLogoutBox && <LogoutBox />}
      {openFriendsBox && <FriendsBox />}
      {openCarousel && <PostsCarousel />}
      {openRequestsBox && <RequestsBox />}
      {profileViewer && <ProfileViewer />}
      {openCommentsList && <CommentsList />}
      {viewProfileEditBox && <ProfileEditBox />}
      {profileOptionsBox && <ProfileOptionsBox />}

      {/* Main Grid Layout */}
      <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] divide-x bg-sky-50 sm:grid-cols-[auto_1fr] sm:grid-rows-1 md:grid-cols-[auto_1fr] md:grid-rows-1 lg:grid-cols-[auto_1fr_auto]">
        <FeedAside />
        <MobileFeedHeader />
        <main className="flex h-full flex-shrink-0 justify-center overflow-y-auto">
          <Outlet />
        </main>
        <section className="hidden place-items-center px-2 lg:grid">
          <SuggestedUsersBox />
        </section>
        <MobileFeedNav />
      </div>
    </div>
  );
}

export default AppLayout;
