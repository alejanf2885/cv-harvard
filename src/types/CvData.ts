export interface Experience {
  id: string;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
  ubicacion: string;
  empresa: string;
  logros: string[];
}

export interface Education {
  id: string;
  institucion: string;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
  ubicacion: string;
}

export interface Skill {
  id: string;
  nombre: string;
}

export interface Certification {
  id: string;
  nombre: string;
  fecha?: string;
}

export interface CvData {
  personalInfo: {
    nombreCompleto: string;
    correo: string;
    tituloProfesional?: string;
    telefono?: string;
    ubicacion?: string;
    sitioWeb?: string;
    linkedin?: string;
    github?: string;
    resumenProfesional?: string;
  };
  experiencias: Experience[];
  educaciones: Education[];
  habilidadesTecnicas: Skill[];
  idiomas: Skill[];
  certificaciones: Certification[];
}
