// Library Imports
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Local Imports
import Story from "./Story";

function FeedStories() {
  const navigate = useNavigate();
  const {
    userDetails: { profilePicture },
  } = useSelector((state) => state.user);

  function handleProfileVisitClick() {
    navigate("/profile");
  }
  return (
    <div className="overflow-x-auto sm:px-[8rem]">
      <div onClick={handleProfileVisitClick} className="hover:cursor-pointer">
        <div className="flex w-max gap-3 px-4 py-2">
          <Story profilePicture={profilePicture} />
        </div>
      </div>
    </div>
  );
}

export default FeedStories;
