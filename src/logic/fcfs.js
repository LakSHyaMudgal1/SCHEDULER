import base from "./parent.js";

class firstComeFirstServe extends base {
  constructor() {
    super();
  }

  schedule() {
    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    let currentProcessIndex = 0;

    while (processes.some((p) => p.remaining_time > 0)) {
      const currentProcess = processes.find((p, index) => {
        if (
          index >= currentProcessIndex &&
          p.arrival_time <= this.time &&
          p.remaining_time > 0
        ) {
          currentProcessIndex = index;
          return true;
        }
        return false;
      });

      if (!currentProcess) {
        this.time++;
      } else {
        if (currentProcess.start_time === undefined) {
          currentProcess.start_time = this.time;
        }
        currentProcess.remaining_time--;
        this.time++;

        if (currentProcess.remaining_time === 0) {
          currentProcess.completion_time = this.time;
          currentProcess.turnaround_time = this.time - currentProcess.arrival_time;
          currentProcess.waiting_time =
            currentProcess.turnaround_time - currentProcess.burst_time;
        }
      }
      this.steps.push(this.processes.map((p) => ({ ...p })));
    }
  }
}

export default firstComeFirstServe;
