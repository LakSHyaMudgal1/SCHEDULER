#pragma once

struct Process {
    int id;
    int arrival_time;
    int burst_time;
    int remaining_time;
    int priority;
    int quantum;
    bool active;
    int completion_time;
    int turnaround_time;
    int waiting_time;
    int response_time;

    Process(int id, int arrival_time, int burst_time, int priority = 0, int quantum = 0)
        : id(id), arrival_time(arrival_time), burst_time(burst_time),
          remaining_time(burst_time), priority(priority), quantum(quantum),
          active(false), completion_time(0), turnaround_time(0),
          waiting_time(0), response_time(0) {}
};
