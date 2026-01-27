#pragma once
#include "Base.h"
#include <algorithm>

// First Come First Serve (Non-Preemptive)
class FCFS : public Base {
public:
    void schedule() override {
        std::sort(processes.begin(), processes.end(),
            [](const Process& a, const Process& b) {
                return a.arrival_time < b.arrival_time;
            });

        int currentIndex = 0;

        auto anyRemaining = [&]() {
            for (const auto& p : processes)
                if (p.remaining_time > 0) return true;
            return false;
        };

        while (anyRemaining()) {
            Process* current = nullptr;
            for (int i = currentIndex; i < (int)processes.size(); i++) {
                if (processes[i].arrival_time <= time && processes[i].remaining_time > 0) {
                    currentIndex = i;
                    current = &processes[i];
                    break;
                }
            }

            if (!current) {
                time++;
            } else {
                current->remaining_time--;
                time++;
                if (current->remaining_time == 0) {
                    current->turnaround_time = time - current->arrival_time;
                    current->waiting_time = current->turnaround_time - current->burst_time;
                    current->completion_time = time;
                }
            }
            steps.push_back(processes);
        }
    }
};
