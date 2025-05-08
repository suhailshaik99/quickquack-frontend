import { Outlet } from "react-router-dom";
import FeedAside from "../features/Feed/FeedAside";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-1 divide-x overflow-hidden bg-sky-50 sm:grid-cols-[1fr_4fr_2fr]">
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
