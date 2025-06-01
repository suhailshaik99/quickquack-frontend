import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { openBox } from "../Posts/postSlice";

export default function EmptyPostPlaceholder() {
  const dispatch = useDispatch();
  function handleSharePost() {
    dispatch(openBox());
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-black">
        <FaCamera className="text-2xl" size={26} />
      </div>
      <h2 className="mb-2 text-3xl font-bold">Share photos</h2>
      <p className="mb-4 text-[1.5rem] text-gray-600">
        When you share photos, they will appear on your profile.
      </p>
      <Link
        to=""
        className="text-[1.5rem] font-semibold text-blue-500 hover:underline"
        onClick={handleSharePost}
      >
        Share your first photo
      </Link>
    </div>
  );
}
