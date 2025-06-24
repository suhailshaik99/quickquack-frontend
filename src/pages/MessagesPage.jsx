// Local Imports
import useQueryFn from "../hooks/useQuery";
import DualRingLoader from "../spinners/DualRingLoader";
import MessageCard from "../features/Messages/MessageCard";
import { getMessageCards } from "../services/FormSubmitAPI";

function MessagesPage() {
  const { data: messages, isPending } = useQueryFn(
    ["messageCards"],
    getMessageCards,
  );

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-y-auto px-5 sm:px-3 sm:pb-2 sm:pt-10">
      {isPending && (
        <div className="flex h-full items-center justify-center">
          <DualRingLoader />
        </div>
      )}
      <h1 className="pb-5 text-6xl font-bold sm:px-5">Messages</h1>
      <div className="flex flex-col gap-4 overflow-y-auto sm:gap-5">
        {messages?.map((msg) => {
          return <MessageCard key={msg.otherUserId} msg={msg} />;
        })}
      </div>
    </div>
  );
}

export default MessagesPage;
