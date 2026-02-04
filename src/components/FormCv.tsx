import { useState } from "react";
import PersonalForm from "./form/PersonalForm";

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
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 transition-all">
      {/* Steps */}
      <div className="flex justify-center gap-4 my-4">
        {steps.map((step) => (
          <button
            onClick={() => toggleStep(step.id)}
            key={step.id}
            className={`
              px-4 py-2
              font-medium
              border-b-4
              transition-colors duration-300
              ${
                step.id === activeStep
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-400"
              }
              cursor-pointer
            `}
          >
            {step.name}
          </button>
        ))}
      </div>

      {/* Contenido del step */}
      <div className="mt-6">
        {activeStep === 1 && <PersonalForm />}
      </div>
    </div>
  );
}
