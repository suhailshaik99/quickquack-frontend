import { useRef, useState } from "react";
import UserCards from "./UserCards";
import { searchUsers } from "../../services/FormSubmitAPI";
import useMutationFunc from "../../hooks/useMutation";

function SearchBar() {
  let searchString;
  const searchRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [mutate, isPending, , data] = useMutationFunc(searchUsers);

  const handleInputChange = () => {
    searchString = searchRef.current?.value || "";
  };

  const handleSearchClick = async () => {
    if (!searchString) return;
    mutate(searchString, {
      onSuccess(data) {
        setSearchResults(data);
      },
    });
  };

  const updateUserCard = (userId, patch) => {
    setSearchResults((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, ...patch } : u)),
    );
  };

  return (
    <div className="flex h-[calc(100%-7rem)] grow flex-col gap-4 pt-2">
      <div className="flex items-center gap-3">
        <input
          id="search"
          type="search"
          autoComplete="off"
          ref={searchRef}
          onChange={handleInputChange}
          maxLength={25}
          className="h-16 w-full rounded-2xl px-4 text-[1.6rem] text-gray-700 outline-none placeholder:text-2xl focus:ring-2 focus:ring-sky-400"
          placeholder="Search 'username'"
        />
        <button
          onClick={handleSearchClick}
          className="rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 p-[0.9rem] px-8 text-2xl font-medium text-white outline-none focus:ring-[0.3rem] focus:ring-sky-500 focus:ring-offset-1"
        >
          Search
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border-2 border-gray-200 bg-sky-100 p-2 shadow-md sm:p-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-2 sm:place-items-center sm:px-4 md:grid-cols-3 md:place-items-center md:gap-4 md:gap-y-16">
          {isPending && <p>loading...</p>}
          {data?.length == 0 ? <p>No users found</p> : ""}
          {searchResults?.map((user) => (
            <UserCards
              key={user._id}
              user={user}
              updateUserCard={updateUserCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
