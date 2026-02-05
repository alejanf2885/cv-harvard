import { useState } from "react";
import PersonalForm from "./form/PersonalForm";
import type { PersonalInfo } from "../types/PersonalInfo";
import type { Experience } from "../types/Experiencie";
import type Education from "../types/Education";
import type Skill from "../types/Skill";
import type Certification from "../types/Certification";

interface FormCvProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  setExperiencias: React.Dispatch<React.SetStateAction<Experience[]>>;
  setEducaciones: React.Dispatch<React.SetStateAction<Education[]>>;
  setHabilidadesTecnicas: React.Dispatch<React.SetStateAction<Skill[]>>;
  setIdiomas: React.Dispatch<React.SetStateAction<Skill[]>>;
  setCertificaciones: React.Dispatch<React.SetStateAction<Certification[]>>;
}

export default function FormCv({
  personalInfo,
  setPersonalInfo,
  setExperiencias,
  setEducaciones,
  setHabilidadesTecnicas,
  setIdiomas,
  setCertificaciones,
}: FormCvProps) {
  const steps = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Educación" },
    { id: 3, name: "Experiencia" },
    { id: 4, name: "Habilidades" },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100">
      {/* Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`w-full px-4 py-2 border-b-4 rounded transition-all flex items-center justify-center ${step.id === activeStep
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
          >
            {step.name}
          </button>

        ))}
      </div>

      {/* Contenido */}
      {activeStep === 1 && (
        <PersonalForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />

      )}
    </div>
  );
}
