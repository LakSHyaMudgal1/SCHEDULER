# OS Scheduler

A visual CPU scheduling simulator built with React. Select an algorithm, enter process data, and watch the scheduler animate step-by-step through the Gantt chart and process table.

## Algorithms

| Algorithm | Type |
|---|---|
| First Come First Serve (FCFS) | Non-Preemptive |
| Shortest Job First (SJF) | Non-Preemptive |
| Shortest Remaining Time First (SRTF) | Preemptive |
| Priority Scheduling | Preemptive |
| Priority Scheduling | Non-Preemptive |

## Features

- Step-by-step animation with speed control (forward and backward)
- Gantt chart with live process state highlighting (running / waiting / completed)
- Process table with start time, completion time, waiting time, and turnaround time
- Sortable table columns
- Input validation (positive integers, matching array lengths, unique priorities)
- C++ implementations of all algorithms in `src/logic/cpp/`

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
git clone <your-repo-url>
cd OS_Scheduler-main
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

## How to Use

1. Select a scheduling algorithm from the dropdown.
2. Enter space-separated values for Arrival Time and Burst Time (and Priority if required).
   - Example: `0 1 3 5` for 4 processes
3. Click **Start** to begin the animation.
4. Use the **Speed Control** slider to slow down, pause, or reverse.
5. Click **Pause / Resume** to control playback, **Reset** to start over.

## Project Structure

```
src/
  logic/          # Scheduling algorithm implementations (JS + C++)
  pages/          # Route pages and schedule sub-components
  components/     # Reusable UI components
  Context/        # React context + provider for scheduler state
  hooks/          # useScheduler custom hook
  utils/          # Input validation
```

## C++ Version

```bash
cd src/logic/cpp
g++ -std=c++17 -o scheduler main.cpp
./scheduler
```

## License

MIT
