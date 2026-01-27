import PropTypes from "prop-types";

Gantt.propTypes = {
  currentGanttChart: PropTypes.array,
  currentTime: PropTypes.number,
};

export default function Gantt({ currentGanttChart = [], currentTime = 0 }) {
  if (currentGanttChart.length === 0) return null;

  // Build a timeline: for each time unit up to currentTime, which process ran?
  // We derive this from the steps snapshot: the process with the lowest remaining_time
  // that is still > 0 (or just completed) at each tick is the one that ran.
  // Since we only have the current snapshot, we show arrived processes colored by state.

  return (
    <div className="flex self-stretch items-center my-4 gap-2 flex-col">
      <span className="text-md md:text-lg">Gantt Chart</span>
      <div className="flex flex-row overflow-x-auto max-w-full pb-1">
        {currentGanttChart.map((process, index) => {
          const isComplete = process.remaining_time === 0;
          const isRunning =
            !isComplete &&
            process.arrival_time <= currentTime &&
            process.remaining_time > 0 &&
            // highlight the one with least remaining time (currently executing)
            process.remaining_time ===
              Math.min(
                ...currentGanttChart
                  .filter((p) => p.arrival_time <= currentTime && p.remaining_time > 0)
                  .map((p) => p.remaining_time)
              );

          return (
            <div key={`${process.id}-${index}`} className="flex flex-col items-center">
              <div
                className={`h-8 w-10 md:h-12 md:w-12 text-sm md:text-base font-semibold flex items-center justify-center border-stone-300
                  ${isComplete ? "bg-green-200 text-green-800" : isRunning ? "bg-blue-200 text-blue-800" : "bg-stone-100 text-stone-500"}
                  ${index === 0 ? "border" : "border-t border-b border-r"}
                `}
              >
                P{process.id}
              </div>
              <span className="text-[10px] text-stone-400 mt-1">
                {process.arrival_time}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-blue-200 border border-stone-300 rounded-sm" />
          Running
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-green-200 border border-stone-300 rounded-sm" />
          Completed
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-stone-100 border border-stone-300 rounded-sm" />
          Waiting
        </span>
      </div>
    </div>
  );
}
