// Local Imports
import PeopleBrief from "../../UI/PeopleBrief";
import useQueryFn from "../../services/useQuery";
import { getSuggestedFriends } from "../../services/FormSubmitAPI";

function SuggestedUsersBox() {
  const {
    data: suggestions,
    isPending,
    isError,
    error,
  } = useQueryFn("suggestedFriends", getSuggestedFriends);
  if (isPending) return <p>Loading suggestions...</p>;

  return (
    <section className="m-auto flex h-[36rem] w-[38rem] flex-col overflow-hidden rounded-2xl shadow-md shadow-slate-400">
      <h1 className="mb-3 bg-sky-500 p-2 text-center text-[1.8rem] font-medium tracking-wide text-yellow-50">
        Suggested people for you
      </h1>
      {isError ? error.message : ""}
      <div className="flex flex-col gap-4 overflow-auto px-5">
        {suggestions?.map((friend) => (
          <PeopleBrief
            key={friend._id}
            userId={friend._id}
            username={friend.username}
            profilePicture={friend.profilePicture}
          />
        ))}
      </div>
    </section>
  );
}

export default SuggestedUsersBox;
