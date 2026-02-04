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

  return (
    <div className="space-y-4">
      <input
        name="nombreCompleto"
        value={personalInfo.nombreCompleto}
        onChange={handleChange}
        type="text"
        placeholder="Nombre completo"
        className="w-full p-2 border rounded"
      />

      <input
        name="correo"
        value={personalInfo.correo}
        onChange={handleChange}
        type="email"
        placeholder="Correo electrónico"
        className="w-full p-2 border rounded"
      />

      <input
        name="tituloProfesional"
        value={personalInfo.tituloProfesional}
        onChange={handleChange}
        type="text"
        placeholder="Título profesional"
        className="w-full p-2 border rounded"
      />

      <input
        name="telefono"
        value={personalInfo.telefono}
        onChange={handleChange}
        type="tel"
        placeholder="Teléfono"
        className="w-full p-2 border rounded"
      />

      <input
        name="ubicacion"
        value={personalInfo.ubicacion}
        onChange={handleChange}
        type="text"
        placeholder="Ubicación"
        className="w-full p-2 border rounded"
      />

      <input
        name="sitioWeb"
        value={personalInfo.sitioWeb}
        onChange={handleChange}
        type="text"
        placeholder="Sitio web"
        className="w-full p-2 border rounded"
      />

      <input
        name="linkedin"
        value={personalInfo.linkedin}
        onChange={handleChange}
        type="text"
        placeholder="LinkedIn"
        className="w-full p-2 border rounded"
      />

      <input
        name="github"
        value={personalInfo.github}
        onChange={handleChange}
        type="text"
        placeholder="GitHub"
        className="w-full p-2 border rounded"
      />

      <textarea
        name="resumenProfesional"
        value={personalInfo.resumenProfesional}
        onChange={handleChange}
        placeholder="Resumen profesional"
        className="w-full p-2 border rounded h-32"
      />
    </div>
  );
}
