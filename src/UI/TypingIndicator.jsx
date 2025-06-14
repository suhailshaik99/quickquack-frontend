export default function TypingIndicator() {
  return (
    <div className="ml-3 flex items-end space-x-1 p-2">
      <div className="flex space-x-1 rounded-full bg-gray-200 px-3 py-2 dark:bg-gray-300">
        <span
          className="h-4 w-4 rounded-full bg-gray-500"
          style={{
            animation: "whatsappTyping 1.5s infinite ease-in-out",
            animationDelay: "0s",
          }}
        ></span>
        <span
          className="h-4 w-4 rounded-full bg-gray-500"
          style={{
            animation: "whatsappTyping 1.5s infinite ease-in-out",
            animationDelay: "0.2s",
          }}
        ></span>
        <span
          className="h-4 w-4 rounded-full bg-gray-500"
          style={{
            animation: "whatsappTyping 1.5s infinite ease-in-out",
            animationDelay: "0.4s",
          }}
        ></span>
      </div>
    </div>
  );
}
