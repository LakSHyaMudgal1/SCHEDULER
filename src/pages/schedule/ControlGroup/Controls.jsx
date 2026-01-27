import { useEffect, useState } from "react";
import useScheduler from "hooks/useScheduler";

import Dropdown_Label from "components/UI/Dropdown/Dropdown_Label";
import Input_Label from "components/UI/Input/Input_Label";
import Slider from "components/UI/Slider";
import Button from "components/UI/Button";
import ProfileLinks from "../ProfileLinks";

import HoveringBoard from "layout/HoveringBoard";

import checkValidInput from "utils/checkValidInput";

import { handleControl, handleReset } from "./ControlFunctions";
import { options, sortGantBy } from "./ControlDropdowns";

export default function Controls() {
  const { steps, setSteps, setCurrentGanttChart, setCurrentStepIndex } =
    useScheduler();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState("id");
  const [animationEnded, setAnimationEnded] = useState(true);
  const [speed, setSpeed] = useState(0);

  const [inputs, setInputs] = useState({
    "Arrival Time": "",
    "Burst Time": "",
    Priority: "",
  });

  const isValid = checkValidInput({
    arrivalTime: inputs["Arrival Time"],
    burstTime: inputs["Burst Time"],
    priority: inputs.Priority,
    selectedAlgorithm,
    options,
  });

  function handleSelect(selected) {
    setSelectedAlgorithm(selected);
    // Reset priority when switching algorithms
    setInputs((prev) => ({
      "Arrival Time": prev["Arrival Time"],
      "Burst Time": prev["Burst Time"],
      Priority: "",
    }));
  }

  // Animation loop
  useEffect(() => {
    if (steps.length === 0 || animationEnded || speed === 0) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => {
        const nextIndex = prevIndex + Math.sign(speed);

        if (nextIndex >= steps.length || nextIndex < 0) {
          clearInterval(interval);
          setAnimationEnded(true);
          return prevIndex;
        }

        setCurrentGanttChart(
          [...steps[nextIndex]]
            .filter((p) => p.arrival_time <= nextIndex)
            .sort((a, b) => (a[selectedSortBy] ?? 0) - (b[selectedSortBy] ?? 0))
        );

        return nextIndex;
      });
    }, 1000 / Math.abs(speed));

    return () => clearInterval(interval);
  }, [steps, speed, selectedSortBy, animationEnded, setCurrentGanttChart, setCurrentStepIndex]);

  function getButtonLabel() {
    if (animationEnded) return "Start";
    if (speed === 0) return "Resume";
    return "Pause";
  }

  return (
    <HoveringBoard className="lg:w-1/4 sm:min-h-64 flex-1 md:flex-grow-0 md:flex-shrink-0 md:basis-auto md:h-full p-4 flex flex-col gap-4 overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col flex-1 gap-4">
        <span className="text-lg font-bold">Process Input</span>

        <Dropdown_Label
          placeholder="Select an Algorithm"
          onSelect={handleSelect}
          options={options.filter((o) => o.working)}
          label="Select Algorithm"
          disabled={!animationEnded}
        />

        {selectedAlgorithm ? (
          options
            .find((o) => o.value === selectedAlgorithm)
            ?.requirements.map((req) => (
              <Input_Label
                key={req}
                label={req}
                placeholder="e.g. 0 1 3 5"
                value={inputs[req]}
                onChange={(e) =>
                  setInputs({ ...inputs, [req]: e.target.value })
                }
              />
            ))
        ) : (
          <span className="text-sm text-stone-500">
            Select an algorithm to input process data.
          </span>
        )}

        <Button
          disabled={!isValid && animationEnded}
          className="mt-4"
          variant="primary"
          onClick={() =>
            handleControl({
              setSpeed,
              setAnimationEnded,
              setCurrentStepIndex,
              setSteps,
              setCurrentGanttChart,
              inputs,
              selectedAlgorithm,
              selectedSortBy,
              speed,
              animationEnded,
            })
          }
        >
          {getButtonLabel()}
        </Button>

        {!animationEnded && (
          <Button
            variant="secondary"
            onClick={() =>
              handleReset({
                setSpeed,
                setAnimationEnded,
                setCurrentStepIndex,
                setSteps,
                setCurrentGanttChart,
                setInputs,
                setSelectedAlgorithm,
              })
            }
          >
            Reset
          </Button>
        )}

        {steps.length > 0 && (
          <>
            <div className="flex flex-col self-stretch">
              <Slider
                label="Speed Control"
                value={speed}
                setValue={setSpeed}
                className="self-stretch"
              />
            </div>
            <Dropdown_Label
              label="Sort Table By"
              onSelect={setSelectedSortBy}
              options={sortGantBy}
            />
          </>
        )}
      </div>

      <ProfileLinks />
    </HoveringBoard>
  );
}
