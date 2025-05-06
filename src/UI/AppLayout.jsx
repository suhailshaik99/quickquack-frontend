import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;