
export class PersonalInfo {
  nombreCompleto: string;
  correo: string;
  tituloProfesional?: string;
  telefono?: string;
  ubicacion?: string;
  sitioWeb?: string;
  linkedin?: string;
  github?: string;
  resumenProfesional?: string;

  constructor(
    nombreCompleto: string,
    correo: string,
    tituloProfesional?: string,
    telefono?: string,
    ubicacion?: string,
    sitioWeb?: string,
    linkedin?: string,
    github?: string,
    resumenProfesional?: string
  ) {
    this.nombreCompleto = nombreCompleto;
    this.correo = correo;
    this.tituloProfesional = tituloProfesional;
    this.telefono = telefono;
    this.ubicacion = ubicacion;
    this.sitioWeb = sitioWeb;
    this.linkedin = linkedin;
    this.github = github;
    this.resumenProfesional = resumenProfesional;
  }
}
