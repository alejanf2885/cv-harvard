import { useState } from "react";

export default function FormCv() {
  const steps = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Educación" },
    { id: 3, name: "Experiencia" },
    { id: 4, name: "Habilidades" },
  ];

  const [activeStep, setActiveStep] = useState(1);


  const toggleStep = (stepId: number) => {
    setActiveStep(stepId);
  }


  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 transition-all ">
      <div className="flex justify-center gap-4 my  dark:bg-gray-800  rounded-lg ">
        {steps.map((step) => (
          <button
            onClick={() => toggleStep(step.id)}
            key={step.id}
            className={`
              px-4 py-2
              
              font-medium
              transition-all duration-300
              ${step.id === activeStep
                ? " border-b-4 cursor-pointer transition-all  border-blue-500 text-blue-600 dark:text-blue-400"
                : "cursor-pointer  transition-all  dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            {step.name}
          </button>
        ))}
      </div>
    </div>
  );
}
