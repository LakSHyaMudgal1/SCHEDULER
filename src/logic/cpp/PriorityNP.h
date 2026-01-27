#pragma once
#include "Base.h"
#include <algorithm>

// Priority Non-Preemptive (higher value = higher priority)
class PriorityNP : public Base {
public:
    void schedule() override {
        std::sort(processes.begin(), processes.end(),
            [](const Process& a, const Process& b) {
                return a.arrival_time < b.arrival_time;
            });

        auto anyRemaining = [&]() {
            for (const auto& p : processes)
                if (p.remaining_time > 0) return true;
            return false;
        };

        while (anyRemaining()) {
            // Check if any process is available
            bool anyAvailable = false;
            for (const auto& p : processes)
                if (p.arrival_time <= time && p.remaining_time > 0) { anyAvailable = true; break; }

            if (!anyAvailable) {
                time++;
                steps.push_back(processes);
                continue;
            }

            // Pick highest priority among available
            Process* current = nullptr;
            for (auto& p : processes) {
                if (p.arrival_time <= time && p.remaining_time > 0) {
                    if (!current || p.priority > current->priority)
                        current = &p;
                }
            }

            current->remaining_time--;
            time++;
            if (current->remaining_time == 0) {
                current->turnaround_time = time - current->arrival_time;
                current->waiting_time = current->turnaround_time - current->burst_time;
                current->completion_time = time;
            }
            steps.push_back(processes);
        }
    }
};
