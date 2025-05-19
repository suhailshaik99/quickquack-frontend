import { useSelector } from "react-redux";
import Story from "./Story";

function FeedStories() {
  const {
    userDetails: { profilePicture },
  } = useSelector((state) => state.user);
  return (
    <div className="overflow-x-auto">
      <div className="flex w-max gap-3 px-4 py-2">
        <Story profilePicture={profilePicture}/>
      </div>
    </div>
  );
}

export default FeedStories;
