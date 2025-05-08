import Story from "./Story";

function FeedStories() {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-max gap-3 px-4 py-2">
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
}

export default FeedStories;
