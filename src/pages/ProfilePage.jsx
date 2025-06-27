// Local Imports
import useQueryFn from "../hooks/useQuery";
import DualRingLoader from "../spinners/DualRingLoader";
import ProfileTabs from "../features/Profile/ProfileTabs";
import ProfilePosts from "../features/Profile/ProfilePosts";
import ProfileHeader from "../features/Profile/ProfileHeader";
import { getProfileDetails } from "../services/FormSubmitAPI";

export default function ProfilePage() {
  const { isPending } = useQueryFn(
    "profileDetails",
    getProfileDetails,
  );

  if(isPending) {
    return <div className="flex h-full items-center justify-center">
          <DualRingLoader />
        </div>
  }


  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ProfileHeader />
      <ProfileTabs />
      <ProfilePosts />
    </div>
  );
}
