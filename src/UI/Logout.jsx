// Library Imports
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

// Local Imports
import { logoutUser } from "../services/FormSubmitAPI";
import { setLogoutBox, userLogout } from "../features/Authentication/userSlice";

function LogoutBox() {
  const dispatch = useDispatch();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess() {
      dispatch(userLogout());
      toast("You have been logged out!", {
        icon: "⚠️",
        style: {
          background: "#fef3c7",
          color: "#92400e",
        },
        id: "logout-toast",
      });
    },
    onError() {
      toast.error("Error logging out!!");
    },
  });

  function handleCancelClick() {
    dispatch(setLogoutBox());
  }

  function handleLogoutClick() {
    logout();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="flex h-60 w-[33rem] flex-col items-center justify-center gap-11 rounded-lg bg-sky-300 p-3 shadow-md shadow-slate-400">
        <p className="text-3xl font-medium">Are you sure you want to Logout?</p>
        <div className="flex justify-center gap-6">
          <button
            className="rounded-md bg-sky-400 px-6 py-4 text-2xl font-medium tracking-wide text-white outline-none hover:cursor-pointer focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            onClick={handleCancelClick}
            disabled={isPending}
          >
            cancel
          </button>
          <button
            className="rounded-md bg-red-400 px-6 py-4 text-2xl font-medium tracking-wide text-white outline-none hover:cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleLogoutClick}
            disabled={isPending}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutBox;
