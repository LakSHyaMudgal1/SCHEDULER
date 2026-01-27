import base from "./parent.js";

// Shortest Remaining Time First - Preemptive SJF
class shortestRemainingTimeFirst extends base {
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

      // Pick shortest remaining time; tie-break by arrival time
      available.sort((a, b) =>
        a.remaining_time !== b.remaining_time
          ? a.remaining_time - b.remaining_time
          : a.arrival_time - b.arrival_time
      );
      const current = processes.find((p) => p.id === available[0].id);

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

export default shortestRemainingTimeFirst;
