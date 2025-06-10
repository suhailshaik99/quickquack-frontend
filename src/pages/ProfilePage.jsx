// Local Imports
import useQueryFn from "../hooks/useQuery";
import ProfileTabs from "../features/Profile/ProfileTabs";
import ProfilePosts from "../features/Profile/ProfilePosts";
import ProfileHeader from "../features/Profile/ProfileHeader";
import { getProfileDetails } from "../services/FormSubmitAPI";

export default function ProfilePage() {
  const { isPending, isError } = useQueryFn(
    "profileDetails",
    getProfileDetails,
  );

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ProfileHeader />
      <ProfileTabs />
      <ProfilePosts />
    </div>
  );
}