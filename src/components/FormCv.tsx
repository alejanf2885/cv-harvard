import { useState } from "react";
import PersonalForm from "./form/PersonalForm";
import type { PersonalInfo } from "../types/PersonalInfo";

export default function FormCv() {
  const steps = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Educación" },
    { id: 3, name: "Experiencia" },
    { id: 4, name: "Habilidades" },
  ];

  const [activeStep, setActiveStep] = useState(1);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nombreCompleto: "",
    correo: "",
    tituloProfesional: "",
    telefono: "",
    ubicacion: "",
    sitioWeb: "",
    linkedin: "",
    github: "",
    resumenProfesional: "",
  });

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100">
      {/* Steps */}
      <div className="flex justify-center gap-6 mb-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`px-4 py-2 border-b-4 transition-all ${
              step.id === activeStep
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300"
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
