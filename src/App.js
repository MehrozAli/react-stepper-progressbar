import { useState } from "react";
import "./app.css";
import Stepper from "./Stepper";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepsArr = [
    "Create an Account",
    "Add Personal Data",
    "Add Payment",
    "Submit Application",
  ];

  const direction = "horizontal";
  const handleClick = (type) => {
    let newStep = currentStep;
    type === "Next" ? newStep++ : newStep--;
    setCurrentStep(newStep);
  };

  return (
    <>
      <div className={`stepper-container-${direction}`}>
        <Stepper
          steps={stepsArr}
          direction={direction}
          currentStep={currentStep}
        />
      </div>

      <div className="buttons-container">
        <button onClick={() => handleClick()}>Previous</button>
        <button onClick={() => handleClick("Next")}>Next</button>
      </div>
    </>
  );
}

export default App;
