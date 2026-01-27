const options = [
  {
    value: "firstComeFirstServe",
    label: "First Come First Serve",
    requirements: ["Arrival Time", "Burst Time"],
    id: "fcfs",
    working: true,
  },
  {
    value: "SJF",
    label: "Shortest Job First",
    requirements: ["Arrival Time", "Burst Time"],
    id: "shortest_job_first",
    working: true,
  },
  {
    value: "shortestRemainingTimeFirst",
    label: "Shortest Remaining Time First",
    requirements: ["Arrival Time", "Burst Time"],
    id: "shortestRemainingTimeFirst",
    working: true,
  },
  {
    value: "Priority Preemptive",
    label: "Priority Preemptive",
    requirements: ["Arrival Time", "Burst Time", "Priority"],
    id: "priority_preemptive",
    working: true,
  },
  {
    value: "Priority Non-Preemptive",
    label: "Priority Non-Preemptive",
    requirements: ["Arrival Time", "Burst Time", "Priority"],
    id: "priority_non_preemptive",
    working: true,
  },
];

const sortGantBy = [
  {
    value: "id",
    label: "Default (ID)",
  },
  {
    value: "arrival_time",
    label: "Arrival Time",
  },
  {
    value: "burst_time",
    label: "Burst Time",
  },
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "completion_time",
    label: "Completion Time",
  },
  {
    value: "turnaround_time",
    label: "Turnaround Time",
  },
];

export { options, sortGantBy };
