import type { PersonalInfo } from "../../types/PersonalInfo";

interface PersonalFormProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}

export default function PersonalForm({
  personalInfo,
  setPersonalInfo,
}: PersonalFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass =
    "w-full p-3 border dark:text-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const fields = [
    {
      name: "nombreCompleto",
      label: "Nombre completo",
      placeholder: "Ej: Alejandro Navarro",
      type: "text",
    },
    {
      name: "correo",
      label: "Correo electrónico",
      placeholder: "Ej: alejandro@email.com",
      type: "email",
    },
    {
      name: "tituloProfesional",
      label: "Título profesional",
      placeholder: "Ej: Ingeniero de Software",
      type: "text",
    },
    {
      name: "telefono",
      label: "Teléfono",
      placeholder: "Ej: +34 612 345 678",
      type: "tel",
    },
    {
      name: "ubicacion",
      label: "Ubicación",
      placeholder: "Ej: Madrid, España",
      type: "text",
    },
    {
      name: "sitioWeb",
      label: "Sitio web",
      placeholder: "Ej: www.alejandronavarro.com",
      type: "text",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      placeholder: "Ej: linkedin.com/in/alejandro",
      type: "text",
    },
    {
      name: "github",
      label: "GitHub",
      placeholder: "Ej: github.com/alejandro",
      type: "text",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium dark:text-white text-gray-700">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={personalInfo[field.name as keyof PersonalInfo] as string}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col">
        <label className="mb-1 font-medium dark:text-white text-gray-700">
          Resumen profesional
        </label>
        <textarea
          name="resumenProfesional"
          value={personalInfo.resumenProfesional}
          onChange={handleChange}
          placeholder="Ej: Ingeniero de software con 5 años de experiencia en desarrollo web y backend."
          className={`${inputClass} h-32 resize-none w-full`}
        />
      </div>
    </div>
  );
}
