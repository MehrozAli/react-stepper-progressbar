import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

const Stepper = (props) => {
  const [steps, setSteps] = useState([]);
  const steps_props = props.steps;
  const currStep = props.currentStep;

  function updateStep(stepNo, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;

    while (stepCounter < newSteps.length) {
      // Current Step
      if (stepCounter === stepNo) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      }
      // Past Step
      else if (stepCounter < stepNo) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      }
      // Future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }
    return newSteps;
  }

  useEffect(() => {
    const stepsState = steps_props.map((step, idx) => {
      const stepObj = {
        description: step,
        completed: false,
        selected: idx === 0 ? true : false,
        highlighted: idx === 0 ? true : false,
      };
      return stepObj;
    });

    const updatedSteps = updateStep(currStep - 1, stepsState);

    setSteps(updatedSteps);
  }, [steps_props, currStep]);

  const stepsDisplay = steps.map((step, idx) => {
    return (
      <div key={idx} className="step-wrapper">
        <div className={`step-number ${step.selected ? "active" : "disabled"}`}>
          {step.completed ? <span>&#10003;</span> : idx + 1}
        </div>
        <div
          className={`stepper-description ${
            step.highlighted ? "step-description-active" : ""
          }`}>
          {step.description}
        </div>
        <div
          className={
            idx !== props.steps.length - 1
              ? `divider-line divider-line-${props.steps.length}`
              : ""
          }
        />
      </div>
    );
  });

  return (
    <div className={`stepper-wrapper-${props.direction}`}>{stepsDisplay}</div>
  );
};

export default Stepper;

Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
};
