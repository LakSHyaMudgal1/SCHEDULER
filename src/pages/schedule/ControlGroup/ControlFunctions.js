import priorityPreemptive from "logic/priority_p";
import priorityNonPreemptive from "logic/priority_np";
import shortestRemainingTimeFirst from "logic/srtf";
import shortestJobFirst from "logic/sjf";
import Process from "logic/Process";
import FCFS from "logic/fcfs";

function handleReset({
  setSpeed,
  setAnimationEnded,
  setCurrentStepIndex,
  setSteps,
  setCurrentGanttChart,
  setInputs,
  setSelectedAlgorithm,
}) {
  setSpeed(0);
  setAnimationEnded(true);
  setCurrentStepIndex(0);
  setSteps([]);
  setCurrentGanttChart([]);
  setInputs({
    "Arrival Time": "",
    "Burst Time": "",
    Priority: "",
  });
  setSelectedAlgorithm(null);
}

function buildProcesses(inputs) {
  const arrival_array = inputs["Arrival Time"].trim().split(/\s+/);
  const burst_array = inputs["Burst Time"].trim().split(/\s+/);
  const priority_array = inputs.Priority.trim().split(/\s+/);

  return arrival_array.map((arrival, index) =>
    new Process(
      index + 1,
      parseInt(arrival),
      parseInt(burst_array[index]),
      parseInt(priority_array[index] ?? 0)
    )
  );
}

function runAlgorithm(selectedAlgorithm, processes) {
  let scheduler;

  if (selectedAlgorithm === "firstComeFirstServe") {
    scheduler = new FCFS();
  } else if (selectedAlgorithm === "SJF") {
    scheduler = new shortestJobFirst();
  } else if (selectedAlgorithm === "shortestRemainingTimeFirst") {
    scheduler = new shortestRemainingTimeFirst();
  } else if (selectedAlgorithm === "Priority Preemptive") {
    scheduler = new priorityPreemptive();
  } else if (selectedAlgorithm === "Priority Non-Preemptive") {
    scheduler = new priorityNonPreemptive();
  } else {
    return null;
  }

  processes.forEach((p) => scheduler.addProcess(p));
  scheduler.schedule();
  return scheduler.getSteps();
}

function handleControl({
  setSpeed,
  setAnimationEnded,
  setCurrentStepIndex,
  setSteps,
  setCurrentGanttChart,
  inputs,
  selectedAlgorithm,
  selectedSortBy,
  speed,
  animationEnded,
}) {
  // Pause if running
  if (!animationEnded && speed !== 0) {
    setSpeed(0);
    return;
  }

  // Resume if paused mid-animation
  if (!animationEnded && speed === 0) {
    setSpeed(1);
    return;
  }

  // Start fresh
  if (animationEnded) {
    setSteps([]);
    setCurrentGanttChart([]);
    setCurrentStepIndex(0);

    const processes = buildProcesses(inputs);
    const steps = runAlgorithm(selectedAlgorithm, processes);

    if (!steps || steps.length === 0) return;

    setSteps(steps);
    setCurrentGanttChart(
      [...steps[0]].sort((a, b) => (a[selectedSortBy] ?? 0) - (b[selectedSortBy] ?? 0))
    );
    setAnimationEnded(false);
    setSpeed(1);
  }
}

export { handleReset, handleControl };
