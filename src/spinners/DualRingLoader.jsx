export default function DualRingLoader({ text = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-300 border-t-yellow-400" />
      <p className="animate-fadeInDots mt-3 text-xl font-bold tracking-wide text-sky-600">
        {text && "Loading"}
        <span className="dot text-xl">.</span>
        <span className="dot text-xl">.</span>
        <span className="dot text-xl">.</span>
      </p>
    </div>
  );
}
