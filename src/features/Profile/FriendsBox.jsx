// Library Imports
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  closeFriendsBox,
  setViewFollowers,
  setViewFollowing,
} from "./profileSlice";

// Local Imports
import FriendsCard from "./FriendsCard";
import useQueryFn from "../../hooks/useQuery";
import { getFriends } from "../../services/FormSubmitAPI";
import DualRingLoader from "../../spinners/DualRingLoader";

function FriendsBox() {
  const dispatch = useDispatch();
  const { viewFollowers, viewFollowing } = useSelector(
    (state) => state.profile,
  );

  const { data: friends, isPending } = useQueryFn(["friends"], getFriends);

  function handleClose() {
    if (viewFollowers) {
      dispatch(setViewFollowers());
      dispatch(closeFriendsBox());
      return;
    } else if (viewFollowing) {
      dispatch(setViewFollowing());
      dispatch(closeFriendsBox());
      return;
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="flex h-[50rem] w-[38rem] flex-col rounded-3xl bg-sky-200 shadow-md shadow-slate-400 backdrop:blur-md sm:w-[45rem]">
          <div className="border-b-2 border-slate-300 px-5">
            <ImCross
              size={14}
              className="absolute mt-4 text-slate-600 hover:cursor-pointer"
              onClick={handleClose}
            />
            <h1 className="py-2 text-center text-[1.8rem] font-semibold text-slate-700">
              {viewFollowers ? "Followers" : "Following"}
            </h1>
          </div>
          <div className="h-full space-y-4 overflow-auto px-6 py-4 pb-4">
            {isPending && (
              <div className="flex h-full items-center justify-center">
                <DualRingLoader />
              </div>
            )}
            {viewFollowers &&
              friends?.followers?.map((friend) => (
                <FriendsCard
                  key={friend._id}
                  userId={friend._id}
                  username={friend.username}
                  profilePicture={friend.profilePicture}
                />
              ))}
            {viewFollowing &&
              friends?.following?.map((friend) => (
                <FriendsCard
                  key={friend._id}
                  userId={friend._id}
                  username={friend.username}
                  profilePicture={friend.profilePicture}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsBox;
