// Local Imports
import PeopleBrief from "./PeopleBrief";
import useQueryFn from "../../hooks/useQuery";
import { getSuggestedFriends } from "../../services/FormSubmitAPI";

function SuggestedUsersBox() {
  const {
    data: suggestions,
    isPending,
    isError,
    error,
  } = useQueryFn("suggestedFriends", getSuggestedFriends);
  if (isPending) return <p>Loading suggestions...</p>;
  if (isError) return <p>Something went wrong</p>;
  return (
    <div className="m-auto flex w-[42rem] flex-col overflow-hidden rounded-2xl shadow-sm shadow-slate-400 sm:h-[36rem]">
      <h1 className="mb-3 bg-sky-500 p-2 text-center text-[1.8rem] font-medium tracking-wide text-yellow-50">
        Suggested people for you
      </h1>
      {isError ? error.message : ""}
      <div className="flex flex-col gap-4 overflow-auto px-5">
        {suggestions.length == 0 ? (
          <p className="text-center text-[1.4rem] font-medium">
            You are caught up, let other people to join the application.
          </p>
        ) : (
          ""
        )}
        {suggestions?.map((friend) => (
          <PeopleBrief
            key={friend._id}
            userId={friend._id}
            username={friend.username}
            profilePicture={friend.profilePicture}
            requested={friend.isRequested}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsersBox;
