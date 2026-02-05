export interface Experience {
  cargo: string;
  empresa: string;
  ubicacion?: string;
  fechaInicio: string; // Formato MM-AAAA
  fechaFin?: string;   // Formato MM-AAAA o "Presente"
  descripcion?: string;
}