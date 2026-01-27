import base from "./parent.js";

// Priority Preemptive (higher number = higher priority)
// At each tick, the available process with the highest priority runs.
class priorityPreemptive extends base {
  constructor() {
    super();
  }

  schedule() {
    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    while (processes.some((p) => p.remaining_time > 0)) {
      const available = processes.filter(
        (p) => p.arrival_time <= this.time && p.remaining_time > 0
      );

      if (available.length === 0) {
        this.time++;
        this.steps.push(processes.map((p) => ({ ...p })));
        continue;
      }

      // Pick highest priority; tie-break by arrival time
      available.sort((a, b) =>
        a.priority !== b.priority
          ? b.priority - a.priority
          : a.arrival_time - b.arrival_time
      );
      const current = processes.find((p) => p.id === available[0].id);

      // Record start_time on first execution
      if (current.start_time === undefined) {
        current.start_time = this.time;
      }

      current.remaining_time--;
      this.time++;

      if (current.remaining_time === 0) {
        current.completion_time = this.time;
        current.turnaround_time = this.time - current.arrival_time;
        current.waiting_time = current.turnaround_time - current.burst_time;
      }

      this.steps.push(processes.map((p) => ({ ...p })));
    }
  }
}

export default priorityPreemptive;
