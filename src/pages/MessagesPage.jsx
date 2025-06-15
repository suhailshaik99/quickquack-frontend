import useQueryFn from "../hooks/useQuery";
import MessageCard from "../features/Messages/MessageCard";
import { getMessageCards } from "../services/FormSubmitAPI";

function MessagesPage() {
  const { data: messages, isPending } = useQueryFn(
    ["messageCards"],
    getMessageCards,
  );

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-y-auto px-3 py-10">
      {isPending && <p>Loading message cards...</p>}
      <h1 className="px-5 pb-10 text-6xl font-bold">Messages</h1>
      {messages?.map((msg) => (
        <MessageCard key={msg.otherUserId} msg={msg} />
      ))}
    </div>
  );
}

export default MessagesPage;