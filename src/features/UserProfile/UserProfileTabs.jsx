import { useState } from "react";
import { MdOutlineGridOn } from "react-icons/md";
import { FaRegBookmark, FaUserTag } from "react-icons/fa";

const iconStyles = "flex items-center gap-3 border-b-2 pb-2 text-[1.5rem]";

function UserProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="mt-12 border-t border-gray-300">
      <div className="flex justify-center gap-14 pt-4 text-sm font-semibold text-gray-500 sm:gap-[8rem]">
        <button
          onClick={() => setActiveTab("posts")}
          className={`${iconStyles} ${
            activeTab === "posts"
              ? "border-black text-black"
              : "border-transparent"
          }`}
        >
          <MdOutlineGridOn className="text-lg" size={19} /> <span>POSTS</span>
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`${iconStyles} ${
            activeTab === "saved"
              ? "border-black text-black"
              : "border-transparent"
          }`}
        >
          <FaRegBookmark className="text-lg" size={19} /> <span>SAVED</span>
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={`${iconStyles} ${
            activeTab === "tagged"
              ? "border-black text-black"
              : "border-transparent"
          }`}
        >
          <FaUserTag className="text-lg" size={19} /> <span>TAGGED</span>
        </button>
      </div>
    </div>
  );
}

export default UserProfileTabs;
