#pragma once
#include <vector>
#include <iostream>
#include "Process.h"

class Base {
protected:
    std::vector<Process> processes;
    int time;
    std::vector<std::vector<Process>> steps;

public:
    Base() : time(0) {}

    void addProcess(const Process& p) {
        processes.push_back(p);
    }

    virtual void schedule() {}

    void printTable() {
        std::cout << "Process\tWaiting Time\tTurnaround Time\n";
        for (const auto& p : processes)
            std::cout << p.id << "\t" << p.waiting_time << "\t\t" << p.turnaround_time << "\n";
    }

    void printSteps() {
        for (size_t i = 0; i < steps.size(); i++) {
            std::cout << "Step " << i << ":\n";
            for (const auto& p : steps[i])
                std::cout << "  P" << p.id << " remaining=" << p.remaining_time << "\n";
        }
    }

    const std::vector<std::vector<Process>>& getSteps() const {
        return steps;
    }

    virtual ~Base() = default;
};
