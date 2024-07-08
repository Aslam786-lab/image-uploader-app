

interface ProgressBarProps {
    progress: number
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-4 flex justify-between items-center">
      <div className="w-[90%] h-[6px] border border-[#E5E7EB] rounded-full">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: "#4338CA",
          }}
        />
      </div>
      <span className="text-xs">{progress}%</span>
    </div>
  );
}

export default ProgressBar;
