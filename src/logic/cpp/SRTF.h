#pragma once
#include "Base.h"
#include <algorithm>

// Shortest Remaining Time First (Preemptive SJF)
class SRTF : public Base {
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
            Process* current = nullptr;
            for (auto& p : processes) {
                if (p.arrival_time <= time && p.remaining_time > 0) {
                    if (!current || p.remaining_time < current->remaining_time)
                        current = &p;
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
