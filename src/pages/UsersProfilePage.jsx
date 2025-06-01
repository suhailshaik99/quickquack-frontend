import { useParams } from "react-router-dom";
import UserProfileHeader from "../features/UserProfile/UserProfileHeader";
import UserProfileTabs from "../features/UserProfile/UserProfileTabs";
import UserProfilePosts from "../features/UserProfile/UserProfilePosts";

function UsersProfilePage() {
  const { username } = useParams();
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <UserProfileHeader username={username} />
      <UserProfileTabs />
      <UserProfilePosts username={username}/>
    </section>
  );
}

export default UsersProfilePage;
