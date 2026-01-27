function checkValidInput({
  arrivalTime,
  burstTime,
  priority,
  selectedAlgorithm,
  options,
}) {
  if (!arrivalTime || !burstTime || !selectedAlgorithm) return false;

  const isPositiveInt = (val) => /^\d+$/.test(val.trim()) && parseInt(val) >= 0;
  const isPositiveBurst = (val) => /^\d+$/.test(val.trim()) && parseInt(val) > 0;

  const arrival_array = arrivalTime.trim().split(/\s+/);
  const burst_array = burstTime.trim().split(/\s+/);
  const priority_array = priority.trim().split(/\s+/);

  // All arrival times must be non-negative integers
  if (!arrival_array.every(isPositiveInt)) return false;
  // All burst times must be positive integers (> 0)
  if (!burst_array.every(isPositiveBurst)) return false;
  // Arrays must be same length
  if (arrival_array.length !== burst_array.length) return false;

  const algo = options.find((o) => o.value === selectedAlgorithm);
  if (!algo) return false;

  if (algo.requirements.includes("Priority")) {
    if (priority_array.length !== arrival_array.length) return false;
    if (!priority_array.every(isPositiveInt)) return false;
    // Priorities must be unique
    const prioritySet = new Set(priority_array);
    if (prioritySet.size !== priority_array.length) return false;
  }

  return true;
}

export default checkValidInput;
