import { Link } from "react-router-dom";

function FeedLogo() {
  return (
    <div className="p-4">
      <Link to={"/"}>
        <p className="logo rounded-[2rem] bg-gradient-to-r from-pink-500 to-orange-500 px-4 text-center text-[2rem] font-bold text-slate-200 sm:text-[4rem]">
          QuickQuack
        </p>
      </Link>
    </div>
  );
}

export default FeedLogo;
