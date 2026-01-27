import base from "./parent.js";

// Priority Non-Preemptive (higher number = higher priority)
// Once a process starts, it runs to completion.
class priorityNonPreemptive extends base {
  constructor() {
    super();
  }

  schedule() {
    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    let activeProcess = null;

    while (processes.some((p) => p.remaining_time > 0)) {
      // Pick new process only when CPU is free
      if (!activeProcess || activeProcess.remaining_time === 0) {
        const available = processes.filter(
          (p) => p.arrival_time <= this.time && p.remaining_time > 0
        );

        if (available.length === 0) {
          this.time++;
          this.steps.push(processes.map((p) => ({ ...p })));
          continue;
        }

        // Highest priority wins; tie-break by arrival time
        available.sort((a, b) =>
          a.priority !== b.priority
            ? b.priority - a.priority
            : a.arrival_time - b.arrival_time
        );
        activeProcess = processes.find((p) => p.id === available[0].id);

        if (activeProcess.start_time === undefined) {
          activeProcess.start_time = this.time;
        }
      }

      activeProcess.remaining_time--;
      this.time++;

      if (activeProcess.remaining_time === 0) {
        activeProcess.completion_time = this.time;
        activeProcess.turnaround_time = this.time - activeProcess.arrival_time;
        activeProcess.waiting_time =
          activeProcess.turnaround_time - activeProcess.burst_time;
        activeProcess = null;
      }

      this.steps.push(processes.map((p) => ({ ...p })));
    }
  }
}

export default priorityNonPreemptive;
