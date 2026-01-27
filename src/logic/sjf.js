import base from "./parent.js";

// Shortest Job First - Non-Preemptive
// Once a process starts, it runs to completion before the next is picked.
class shortestJobFirst extends base {
  constructor() {
    super();
  }

  schedule() {
    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    let activeProcess = null; // currently running process (non-preemptive)

    while (processes.some((p) => p.remaining_time > 0)) {
      // If no active process (or it just finished), pick the shortest available
      if (!activeProcess || activeProcess.remaining_time === 0) {
        const available = processes.filter(
          (p) => p.arrival_time <= this.time && p.remaining_time > 0
        );

        if (available.length === 0) {
          this.time++;
          this.steps.push(processes.map((p) => ({ ...p })));
          continue;
        }

        // Pick shortest burst time; tie-break by arrival time
        available.sort((a, b) =>
          a.burst_time !== b.burst_time
            ? a.burst_time - b.burst_time
            : a.arrival_time - b.arrival_time
        );
        activeProcess = processes.find((p) => p.id === available[0].id);

        // Record start_time on first execution
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

export default shortestJobFirst;
