import useQueryFn from "../../hooks/useQuery";
import NotificationCard from "./NotificationCard";
import DualRingLoader from "../../spinners/DualRingLoader";
import { getNotifications } from "../../services/FormSubmitAPI";

function NotificationsBox() {
  const { data: notifications, isPending } = useQueryFn(
    ["notifications"],
    getNotifications,
  );
  return (
    <div className="m-auto mt-2 flex h-full w-full flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-2xl bg-sky-100 p-3 shadow-md shadow-slate-400 sm:max-w-[64rem]">
      {isPending && (
        <div className="flex h-full items-center justify-center">
          <DualRingLoader />
        </div>
      )}
      {notifications?.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
    </div>
  );
}

export default NotificationsBox;
