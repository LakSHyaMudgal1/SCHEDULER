#include <iostream>
#include "FCFS.h"
#include "SRTF.h"
#include "PriorityNP.h"
#include "PriorityP.h"

void addSampleProcesses(Base& scheduler) {
    scheduler.addProcess(Process(1, 0, 5, 1));
    scheduler.addProcess(Process(2, 1, 4, 5));
    scheduler.addProcess(Process(3, 2, 2, 2));
    scheduler.addProcess(Process(4, 3, 1, 4));
    scheduler.addProcess(Process(5, 4, 2, 3));
}

int main() {
    std::cout << "=== FCFS ===\n";
    FCFS fcfs;
    addSampleProcesses(fcfs);
    fcfs.schedule();
    fcfs.printTable();

    std::cout << "\n=== SRTF ===\n";
    SRTF srtf;
    addSampleProcesses(srtf);
    srtf.schedule();
    srtf.printTable();

    std::cout << "\n=== Priority Non-Preemptive ===\n";
    PriorityNP pnp;
    addSampleProcesses(pnp);
    pnp.schedule();
    pnp.printTable();

    std::cout << "\n=== Priority Preemptive ===\n";
    PriorityP pp;
    addSampleProcesses(pp);
    pp.schedule();
    pp.printTable();

    return 0;
}
