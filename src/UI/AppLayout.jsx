// Library Imports
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Imports
import FeedAside from "../features/Feed/FeedAside";
import CreatePost from "../features/Posts/CreatePost";
import useAuth from "../features/Authentication/useAuth";

function AppLayout() {
  const { openPostBox } = useSelector((state) => state.post);
  useAuth();

  return (
    <div className="relative grid h-screen grid-cols-1 divide-x overflow-hidden bg-sky-50 sm:grid-cols-[1fr_4fr_2fr]">
      {openPostBox && <CreatePost />}
      <FeedAside />
      <main className="h-full overflow-y-auto px-4">
        <div className="h-full overflow-y-auto px-4">
          <Outlet />
        </div>
      </main>
      <section className="hidden border-2">Hello World</section>
    </div>
  );
}

export default AppLayout;
