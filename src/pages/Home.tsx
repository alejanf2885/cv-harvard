import { useState } from "react";
import FormCv from "../components/FormCv";
import Header from "../components/Header";
import CvPreview from "../components/CvPreview";
import type { PersonalInfo } from "../types/PersonalInfo";
import type { Experience, Education, Skill, Certification } from "../types/CvData";

export default function Home() {
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

  const [experiencias, setExperiencias] = useState<Experience[]>([]);
  const [educaciones, setEducaciones] = useState<Education[]>([]);
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState<Skill[]>([]);
  const [idiomas, setIdiomas] = useState<Skill[]>([]);
  const [certificaciones, setCertificaciones] = useState<Certification[]>([]);



  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 p-6 flex-1">
        {/* Formulario */}
        <div className=" border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md">
          <FormCv
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            setExperiencias={setExperiencias}
            setEducaciones={setEducaciones}
            setHabilidadesTecnicas={setHabilidadesTecnicas}
            setIdiomas={setIdiomas}
            setCertificaciones={setCertificaciones}
          />
        </div>

        {/* Vista previa */}
        <div className=" border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md">
          <CvPreview 
            personalInfo={personalInfo}
            experiencias={experiencias}
            educaciones={educaciones}
            habilidadesTecnicas={habilidadesTecnicas}
            idiomas={idiomas}
            certificaciones={certificaciones}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="grid place-items-center p-4 border-t border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © 2026 Mi Aplicación. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
